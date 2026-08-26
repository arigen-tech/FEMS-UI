import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import FilePreviewModal from '../Components/FilePreviewModal';
import { EyeIcon, ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { API_HOST, BRANCH_ADMIN, DEPARTMENT_ADMIN } from "../API/apiConfig";

const ReferralTransferView = ({ documentDetailId, onBack, currentRole }) => {
    const [referral, setReferral] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);

    const [blobUrl, setBlobUrl] = useState("");
    const [contentType, setContentType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openingFile, setOpeningFile] = useState(null);

    const showPopup = (message, type = 'info') => {
        setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
    };

    useEffect(() => {
        fetchReferralAndReport();
    }, [documentDetailId]);

    const fetchReferralAndReport = async () => {
        try {
            setLoading(true);
            const endpoint = currentRole === BRANCH_ADMIN
                ? `${API_HOST}/api/report-review/referrals/outgoing`
                : `${API_HOST}/api/report-review/referrals/incoming`;

            const referralRes = await apiClient.get(endpoint);
            const match = (referralRes.data || []).find(r => r.documentDetailId === documentDetailId);
            setReferral(match || null);

            if (match?.reportEntryId) {
                const reportRes = await apiClient.get(`${API_HOST}/api/report-review/report/${match.reportEntryId}`);
                setReportData(reportRes.data);
            }
        } catch (error) {
            console.error("Error fetching referral/report detail:", error);
            showPopup("Failed to load referral details.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async () => {
        try {
            setAccepting(true);
            const fd = new FormData();
            fd.append("documentDetailId", documentDetailId);

            const response = await apiClient.post(`${API_HOST}/api/report-review/referrals/accept`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === 200) {
                showPopup("Referral accepted successfully.", "success");
                setTimeout(() => onBack(), 1000);
            } else {
                showPopup(response?.data?.message || "Failed to accept referral.", "error");
            }
        } catch (error) {
            console.error("Error accepting referral:", error);
            showPopup("Failed to accept referral: " + (error?.response?.data?.message || error.message), "error");
        } finally {
            setAccepting(false);
        }
    };

    const encodeFilePath = (filePath) => {
        if (!filePath) return '';
        const normalizedPath = filePath.replace(/\\/g, '/');
        return normalizedPath.split('/').map(encodeURIComponent).join('/');
    };

    const openFile = async (file) => {
        try {
            setOpeningFile(true);

            let filePath = file.filePath || file.path;
            if (!filePath && reportData?.scientificReportPath) {
                filePath = reportData.scientificReportPath;
            }
            if (!filePath) {
                showPopup("No file path available", "warning");
                return;
            }

            const encodedPath = encodeFilePath(filePath);
            const fileUrl = `${API_HOST}/api/documents/download/${encodedPath}?action=view`;

            const response = await apiClient.get(fileUrl, { responseType: "blob" });

            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const url = URL.createObjectURL(blob);

            setBlobUrl(url);
            setContentType(response.headers["content-type"]);
            setSelectedFile(file);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching file:", error);
            showPopup("Failed to fetch or preview the file.", "error");
        } finally {
            setOpeningFile(false);
        }
    };

    const handleDownload = async (file) => {
        try {
            let filePath = file.filePath || file.path;
            let fileName = file.fileName || filePath?.split(/[\\/]/).pop();

            if (!filePath && reportData?.scientificReportPath) {
                filePath = reportData.scientificReportPath;
                fileName = reportData.scientificReportPath.split(/[\\/]/).pop();
            }
            if (!filePath) {
                showPopup("No file path available", "warning");
                return;
            }

            const encodedPath = encodeFilePath(filePath);
            const fileUrl = `${API_HOST}/api/documents/download/${encodedPath}?action=download`;

            const response = await apiClient.get(fileUrl, { responseType: "blob" });

            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || 'download.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
            showPopup("Failed to download file.", "error");
        }
    };

    if (loading) return <LoadingComponent />;
    if (!referral) return null;

    return (
        <>
            {popupMessage && (
                <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
            )}

            <div className="card">
                {/* Case & Referral Information */}
                <div className="cardLight mb-20">
                    <div className='btnBackTop'>
                        <button type="button" className="btnBack" onClick={onBack}></button>
                        <h2><AutoTranslate>Case & Evidence Information</AutoTranslate></h2>
                    </div>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Case Number</AutoTranslate></label>
                            <input type="text" value={referral.caseNo || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence ID</AutoTranslate></label>
                            <input type="text" value={referral.evidenceId || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence Type</AutoTranslate></label>
                            <input type="text" value={referral.evidenceType || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>From Laboratory</AutoTranslate></label>
                            <input type="text" value={referral.fromLaboratoryName || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>To Laboratory</AutoTranslate></label>
                            <input type="text" value={referral.toLaboratoryName || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Referred On</AutoTranslate></label>
                            <input
                                type="text"
                                value={referral.referredOn ? new Date(referral.referredOn).toLocaleDateString() : ''}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Status</AutoTranslate></label>
                            <input type="text" value={referral.referralStatus || ''} readOnly />
                        </div>
                        <div className="form-group col-span-2">
                            <label><AutoTranslate>Reason for Referral / Transfer</AutoTranslate></label>
                            <textarea rows="2" value={referral.referralReason || ''} readOnly></textarea>
                        </div>
                    </div>
                </div>

                {reportData && (
                    <>
                        {/* Scientific Examination Section */}
                        <div className="cardLight mb-20">
                            <h2 className="mb-4"><AutoTranslate>Scientific Examination</AutoTranslate></h2>

                            <div className="grid grid-col-4 mb-4">
                                <div className="form-group">
                                    <label><AutoTranslate>Examination Start Date</AutoTranslate></label>
                                    <input type="text" value={reportData.examinationStartDate ? new Date(reportData.examinationStartDate).toLocaleDateString() : '--'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Examination End Date</AutoTranslate></label>
                                    <input type="text" value={reportData.examinationEndDate ? new Date(reportData.examinationEndDate).toLocaleDateString() : '--'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Examination Method</AutoTranslate></label>
                                    <input type="text" value={reportData.examinationMethodName || '--'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Observations/Findings</AutoTranslate></label>
                                    <textarea rows="2" value={reportData.observations || ''} readOnly></textarea>
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Scientific Opinion</AutoTranslate></label>
                                    <textarea rows="2" value={reportData.scientificOpinion || ''} readOnly></textarea>
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Examination Remarks</AutoTranslate></label>
                                    <textarea rows="2" value={reportData.examinationRemarks || ''} readOnly></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Attached Files Section */}
                        <div className="cardLight mb-20">
                            <h2 className="flex align-center gap-2 mb-4"><AutoTranslate>Attached Files</AutoTranslate></h2>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                                    <span><AutoTranslate>File Name</AutoTranslate></span>
                                    <span className="text-center"><AutoTranslate>Status</AutoTranslate></span>
                                    <span className="text-center"><AutoTranslate>Actions</AutoTranslate></span>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {reportData.scientificReportPath && (
                                        <div className="grid grid-cols-3 items-center px-4 py-3 hover:bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <DocumentIcon className="h-5 w-5 text-gray-400" />
                                                <span className="text-sm text-gray-800 break-words">
                                                    {reportData.scientificReportPath.split(/[\\/]/).pop()}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <AutoTranslate>Scientific Report</AutoTranslate>
                                                </span>
                                            </div>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium"
                                                    onClick={() => openFile({ path: reportData.scientificReportPath, fileName: reportData.scientificReportPath.split(/[\\/]/).pop() })}
                                                    disabled={openingFile}
                                                >
                                                    {openingFile ? <span className="animate-spin">⏳</span> : <EyeIcon className="h-3 w-3" />}
                                                    <AutoTranslate>View</AutoTranslate>
                                                </button>
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium"
                                                    onClick={() => handleDownload({ path: reportData.scientificReportPath, fileName: reportData.scientificReportPath.split(/[\\/]/).pop() })}
                                                >
                                                    <ArrowDownTrayIcon className="h-3 w-3" />
                                                    <AutoTranslate>Download</AutoTranslate>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {(reportData.attachments || []).map((file) => (
                                        <div key={file.id} className="grid grid-cols-3 items-center px-4 py-3 hover:bg-gray-50">
                                            <div className="flex items-center gap-2">
                                                <DocumentIcon className="h-5 w-5 text-gray-400" />
                                                <span className="text-sm text-gray-800 break-words">{file.fileName}</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <AutoTranslate>Attached</AutoTranslate>
                                                </span>
                                            </div>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium"
                                                    onClick={() => openFile(file)}
                                                >
                                                    <EyeIcon className="h-3 w-3" />
                                                    <AutoTranslate>View</AutoTranslate>
                                                </button>
                                                <button
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium"
                                                    onClick={() => handleDownload(file)}
                                                >
                                                    <ArrowDownTrayIcon className="h-3 w-3" />
                                                    <AutoTranslate>Download</AutoTranslate>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Report Section */}
                        <div className="cardLight mb-20">
                            <h2 className="flex align-center gap-2 mb-4"><AutoTranslate>Report</AutoTranslate></h2>

                            <div className="grid grid-col-4 mb-4">
                                <div className="form-group">
                                    <label><AutoTranslate>Report Date</AutoTranslate></label>
                                    <input type="text" value={reportData.reportDate ? new Date(reportData.reportDate).toLocaleDateString() : '--'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label><AutoTranslate>Report Title</AutoTranslate></label>
                                    <input type="text" value={reportData.reportTitle || '--'} readOnly />
                                </div>
                                <div className="form-group col-span-2">
                                    <label><AutoTranslate>Report Summary</AutoTranslate></label>
                                    <textarea rows="2" value={reportData.reportSummary || ''} readOnly></textarea>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Action Buttons */}
                <div className="btn-group">
                    {currentRole === DEPARTMENT_ADMIN && referral.referralStatus === "REFERRED" && (
                        <button type="button" className="btn-primary" onClick={handleAccept} disabled={accepting}>
                            {accepting ? <AutoTranslate>Accepting...</AutoTranslate> : <AutoTranslate>Accept</AutoTranslate>}
                        </button>
                    )}
                    <button type="button" className="btn btn-back" onClick={onBack}>
                        <AutoTranslate>Back</AutoTranslate>
                    </button>
                </div>
            </div>

            {/* File Preview Modal */}
            <FilePreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDownload={(file, action = "download") => handleDownload(file, action)}
                fileType={contentType}
                fileUrl={blobUrl}
                fileName={selectedFile?.fileName || selectedFile?.path?.split(/[\\/]/).pop()}
                fileData={selectedFile}
            />
        </>
    )
}

export default ReferralTransferView;