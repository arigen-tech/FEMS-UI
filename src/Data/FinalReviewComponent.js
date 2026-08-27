import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import FilePreviewModal from '../Components/FilePreviewModal';
import { MdOutlineClose } from "react-icons/md";
import { EyeIcon, ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { API_HOST, EMPLOYEE_API } from "../API/apiConfig";

const FinalReviewComponent = ({ reportEntryId, documentDetailId, onBack }) => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null);
    const [referTransfer, setReferTransfer] = useState(false);
    const [saving, setSaving] = useState(false);
    const [blobUrl, setBlobUrl] = useState("");
    const [contentType, setContentType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openingFile, setOpeningFile] = useState(null);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);

    // Referral form state
    const [referralForm, setReferralForm] = useState({
        toLaboratory: "",
        reason: "",
        supportingDocument: null
    });

    // Branch dropdown data
    const [branches, setBranches] = useState([]);
    const [branchesLoading, setBranchesLoading] = useState(false);

    // Logged-in user's own branch (From Laboratory, autofilled)
    const [currentUserBranch, setCurrentUserBranch] = useState({ id: "", name: "" });

    const showPopup = (message, type = 'info') => {
        setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
    };

    useEffect(() => {
        fetchReport();
        fetchBranches();
        fetchCurrentUserBranch();
    }, [reportEntryId]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`${API_HOST}/api/report-review/report/${reportEntryId}`);
            setReportData(response.data);

            if (response.data) {
                setReferralForm(prev => ({
                    ...prev,
                    toLaboratory: response.data.referredToLab || "",
                    reason: response.data.referralReason || ""
                }));
            }
        } catch (error) {
            console.error("Error fetching report:", error);
            showPopup("Failed to load report details.", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            setBranchesLoading(true);
            const response = await apiClient.get(`${API_HOST}/branchmaster/findActiveRole`);
            setBranches(response.data || []);
        } catch (error) {
            console.error("Error fetching branches:", error);
            setBranches([]);
        } finally {
            setBranchesLoading(false);
        }
    };

    const fetchCurrentUserBranch = async () => {
        try {
            const userId = localStorage.getItem("id");
            const response = await apiClient.get(`${EMPLOYEE_API}/findById/${userId}`);
            const userData = response.data;

            const branch = userData.branch
                ? { id: userData.branch.id, name: userData.branch.name }
                : { id: "", name: "" };

            setCurrentUserBranch(branch);
        } catch (error) {
            console.error("Error fetching current user's branch:", error);
            setCurrentUserBranch({ id: "", name: "" });
        }
    };

    const handleReferralChange = (field, value) => {
        setReferralForm(prev => ({ ...prev, [field]: value }));
    };

    // Open file for viewing - use query parameter approach
    const openFile = async (file) => {
        try {
            setOpeningFile(true);

            let filePath = file.filePath || file.path;

            if (!filePath && reportData.scientificReportPath) {
                filePath = reportData.scientificReportPath;
            }

            if (!filePath) {
                showPopup("No file path available", "warning");
                return;
            }

            // Use query parameter approach
            const fileUrl = `${API_HOST}/api/documents/download-by-path?path=${encodeURIComponent(filePath)}&action=view`;

            console.log("Opening file URL:", fileUrl);

            const response = await apiClient.get(fileUrl, {
                responseType: "blob",
            });

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

    // Download file - use query parameter approach
    const handleDownload = async (file) => {
        try {
            let filePath = file.filePath || file.path;
            let fileName = file.fileName || filePath?.split(/[\\/]/).pop();

            if (!filePath && reportData.scientificReportPath) {
                filePath = reportData.scientificReportPath;
                fileName = reportData.scientificReportPath.split(/[\\/]/).pop();
            }

            if (!filePath) {
                showPopup("No file path available", "warning");
                return;
            }

            // Use query parameter approach
            const fileUrl = `${API_HOST}/api/documents/download-by-path?path=${encodeURIComponent(filePath)}&action=download`;

            console.log("Downloading file URL:", fileUrl);

            const response = await apiClient.get(fileUrl, {
                responseType: "blob",
            });

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

    const handleSave = async () => {
        try {
            setSaving(true);
            const fd = new FormData();
            fd.append("reportEntryId", reportEntryId);
            fd.append("documentDetailId", documentDetailId || "");
            fd.append("action", "SAVE");
            fd.append("comments", referralForm.reason || "");

            const response = await apiClient.post(`${API_HOST}/api/report-review/review`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === 200) {
                showPopup("Report saved successfully.", "success");
            } else {
                showPopup(response?.data?.message || "Failed to save report.", "error");
            }
        } catch (error) {
            console.error("Error saving report:", error);
            showPopup("Failed to save report: " + (error?.response?.data?.message || error.message), "error");
        } finally {
            setSaving(false);
        }
    };

    const handleApprove = async () => {
        try {
            setSaving(true);
            const fd = new FormData();
            fd.append("reportEntryId", reportEntryId);
            fd.append("documentDetailId", documentDetailId || "");
            fd.append("action", "APPROVE");
            fd.append("comments", referralForm.reason || "");

            const response = await apiClient.post(`${API_HOST}/api/report-review/review`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === 200) {
                showPopup("Report approved successfully.", "success");
                setTimeout(() => onBack(), 1000);
            } else {
                showPopup(response?.data?.message || "Failed to approve report.", "error");
            }
        } catch (error) {
            console.error("Error approving report:", error);
            showPopup("Failed to approve report: " + (error?.response?.data?.message || error.message), "error");
        } finally {
            setSaving(false);
        }
    };

    const handleReturn = async () => {
        try {
            setSaving(true);
            const fd = new FormData();
            fd.append("reportEntryId", reportEntryId);
            fd.append("documentDetailId", documentDetailId || "");
            fd.append("action", "REJECT");
            fd.append("comments", referralForm.reason || "");

            const response = await apiClient.post(`${API_HOST}/api/report-review/review`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === 200) {
                showPopup("Report returned for revision.", "success");
                setTimeout(() => onBack(), 1000);
            } else {
                showPopup(response?.data?.message || "Failed to return report.", "error");
            }
        } catch (error) {
            console.error("Error returning report:", error);
            showPopup("Failed to return report: " + (error?.response?.data?.message || error.message), "error");
        } finally {
            setSaving(false);
        }
    };

    const handleReferSubmit = async () => {
        try {
            if (!referralForm.toLaboratory) {
                showPopup("Please select a laboratory.", "warning");
                return;
            }
            if (!referralForm.reason) {
                showPopup("Please enter a reason for referral.", "warning");
                return;
            }

            setSaving(true);
            const fd = new FormData();
            fd.append("reportEntryId", reportEntryId);
            fd.append("documentDetailId", documentDetailId || "");
            fd.append("toLaboratory", referralForm.toLaboratory);
            fd.append("fromLaboratory", currentUserBranch.id || "");
            fd.append("reason", referralForm.reason);
            if (referralForm.supportingDocument) {
                fd.append("supportingDocument", referralForm.supportingDocument);
            }

            const response = await apiClient.post(`${API_HOST}/api/report-review/refer`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === 200) {
                showPopup("Report referred/transferred successfully.", "success");
                setReferTransfer(false);
                setTimeout(() => onBack(), 1000);
            } else {
                showPopup(response?.data?.message || "Failed to refer report.", "error");
            }
        } catch (error) {
            console.error("Error referring report:", error);
            showPopup("Failed to refer report: " + (error?.response?.data?.message || error.message), "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingComponent />;
    if (!reportData) return null;

    return (
        <>
            {popupMessage && (
                <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
            )}

            <div className="card">
                {/* Scientific Examination Section */}
                <div className="cardLight mb-20">
                    <div className='btnBackTop'>
                        <button type="button" className="btnBack" onClick={onBack}></button>
                        <h2><AutoTranslate>Scientific Examination</AutoTranslate></h2>
                    </div>

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

                {/* Remarks Section */}
                <div className="cardLight mb-20">
                    <div className="grid grid-col-2 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Remarks</AutoTranslate></label>
                            <textarea
                                rows="2"
                                value={referralForm.reason}
                                onChange={(e) => handleReferralChange('reason', e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="btn-group">
                    <button type="button" className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? <AutoTranslate>Saving...</AutoTranslate> : <AutoTranslate>Save</AutoTranslate>}
                    </button>
                    <button type="button" className="btn-primary" onClick={handleReturn} disabled={saving}>
                        {saving ? <AutoTranslate>Processing...</AutoTranslate> : <AutoTranslate>Return</AutoTranslate>}
                    </button>
                    <button type="button" className="btn-primary" onClick={() => setShowApproveConfirm(true)} disabled={saving}>            {saving ? <AutoTranslate>Processing...</AutoTranslate> : <AutoTranslate>Approve</AutoTranslate>}
                    </button>
                    <button type="button" className="btn-primary" onClick={() => setReferTransfer(true)}>
                        <AutoTranslate>Refer / Transfer</AutoTranslate>
                    </button>
                    <button type="button" className="btn btn-back" onClick={onBack}>
                        <AutoTranslate>Back</AutoTranslate>
                    </button>
                </div>
            </div>

            {/* Refer / Transfer Modal */}
            {referTransfer && (
                <div className="overlayModal">
                    <div className="document-modal">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2><AutoTranslate>Refer / Transfer</AutoTranslate></h2>
                            </div>
                            <div className="headerRight">
                                <button className="closeBtn" onClick={() => setReferTransfer(false)} title="Close">
                                    <MdOutlineClose />
                                </button>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="bodyScroller print:overflow-visible print:max-h-none">
                                <div className="mb-4">
                                    <div className="grid grid-col-4 mb-4">
                                        <div className="form-group">
                                            <label><AutoTranslate>From Laboratory</AutoTranslate></label>
                                            <input type="text" value={currentUserBranch.name || ''} readOnly />
                                        </div>

                                        <div className="form-group">
                                            <label><AutoTranslate>To Laboratory</AutoTranslate></label>
                                            <select
                                                value={referralForm.toLaboratory}
                                                onChange={(e) => handleReferralChange('toLaboratory', e.target.value)}
                                                className="border border-gray-300 rounded-lg p-2 w-full"
                                                disabled={branchesLoading}
                                            >
                                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                                {branches
                                                    .filter((branch) => String(branch.id) !== String(currentUserBranch.id))
                                                    .map((branch) => (
                                                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label><AutoTranslate>Supporting Documents</AutoTranslate></label>
                                            <input
                                                type="file"
                                                onChange={(e) => setReferralForm(prev => ({
                                                    ...prev,
                                                    supportingDocument: e.target.files?.[0] || null
                                                }))}
                                                className="border border-gray-300 rounded-lg p-2 w-full"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label><AutoTranslate>Reason for Referral / Transfer</AutoTranslate><span>*</span></label>
                                            <textarea
                                                rows="2"
                                                required
                                                value={referralForm.reason}
                                                onChange={(e) => handleReferralChange('reason', e.target.value)}
                                                className="border border-gray-300 rounded-lg p-2 w-full"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button onClick={() => setReferTransfer(false)} className="btn-cancel">
                                        <AutoTranslate>Cancel</AutoTranslate>
                                    </button>
                                    <button className="btn-primary" onClick={handleReferSubmit} disabled={saving}>
                                        {saving ? <AutoTranslate>Submitting...</AutoTranslate> : <AutoTranslate>Submit</AutoTranslate>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            {showApproveConfirm && (
                <div className="overlayModal">
                    <div className="document-modal modal-sm">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2><AutoTranslate>Confirm Approval</AutoTranslate></h2>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="bodyScroller print:overflow-visible print:max-h-none">
                                <p>
                                    <AutoTranslate>Are you sure you want to approve this report? This action cannot be undone.</AutoTranslate>
                                </p>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button onClick={() => setShowApproveConfirm(false)} className="btn-cancel">
                                        <AutoTranslate>Cancel</AutoTranslate>
                                    </button>
                                    <button
                                        className="btn-primary"
                                        disabled={saving}
                                        onClick={() => {
                                            setShowApproveConfirm(false);
                                            handleApprove();
                                        }}
                                    >
                                        {saving ? <AutoTranslate>Processing...</AutoTranslate> : <AutoTranslate>Confirm</AutoTranslate>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FinalReviewComponent;