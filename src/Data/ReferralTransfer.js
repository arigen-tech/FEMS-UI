import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import ReferralTransferComponent from './ReferralTransferComponent';
import ReferralTransferView from './ReferralTransferView';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST, BRANCH_ADMIN, DEPARTMENT_ADMIN } from "../API/apiConfig";

const ReferralTransfer = () => {
    const [transferView, setTransferView] = useState(false);
    const [referrals, setReferrals] = useState([]);
    const [selectedDocumentDetailId, setSelectedDocumentDetailId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null);

    const currentRole = localStorage.getItem("role") || "";

    const showPopup = (message, type = 'info') => {
        setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
    };

    useEffect(() => {
        fetchReferrals();
    }, [currentRole]);

    const fetchReferrals = async () => {
        try {
            setLoading(true);
            const endpoint = currentRole === BRANCH_ADMIN
                ? `${API_HOST}/api/report-review/referrals/outgoing`
                : `${API_HOST}/api/report-review/referrals/incoming`;

            const response = await apiClient.get(endpoint);
            setReferrals(response.data || []);
        } catch (error) {
            console.error("Error fetching referrals:", error);
            showPopup("Failed to load referrals.", "error");
            setReferrals([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (documentDetailId) => {
        setSelectedDocumentDetailId(documentDetailId);
        setTransferView(true);
    };

    const handleBack = () => {
        setSelectedDocumentDetailId(null);
        setTransferView(false);
        fetchReferrals();
    };

    if (loading) return <LoadingComponent />;

    return (
        <div className="">
            {popupMessage && (
                <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
            )}
            <div className="title">
                <h1><AutoTranslate>Referral / Transfer</AutoTranslate></h1>
            </div>

            {!transferView && (
                <ReferralTransferComponent
                    referrals={referrals}
                    onView={handleView}
                    currentRole={currentRole}
                />
            )}
            {transferView && (
                <ReferralTransferView
                    documentDetailId={selectedDocumentDetailId}
                    onBack={handleBack}
                    currentRole={currentRole}
                />
            )}
        </div>
    )
}

export default ReferralTransfer;