import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import { MdRemoveRedEye, MdOutlineClose } from "react-icons/md";
import {
    PencilIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ArrowDownTrayIcon,
    QrCodeIcon,
    ArrowPathIcon,
    DocumentIcon,
    XMarkIcon,
    PrinterIcon,
    TrashIcon,
    CheckIcon,
    ShareIcon,
    ClockIcon,
    UserGroupIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import qrCodeImg from "../Assets/qr-code.png";


const PreExamine = ({ setShowPreExamine }) => {
    const [incomplete, setIncomplete] = useState("");
    const [sealStatus, setSealStatus] = useState("");
    const [percelCondition, setPercelCondition] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };



    return (
        <>
            <div className="card">
                {/* Case & Evidence Details section */}
                <div className="cardLight mb-20">
                    <div className='btnBackTop'>
                        <button type="button" class="btnBack" onClick={() => setShowPreExamine(false)}></button>
                        <h2><AutoTranslate>Case & Evidence Details</AutoTranslate></h2>
                    </div>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Case ID</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="CASE-2026-000145" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Case Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="FSL/2026/00145 " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Case Title</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Bhubaneswar ATM Fraud Investigation" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>FIR Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="145/2026" readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>FIR Date </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="06-08-2026" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Police Station</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Saheed Nagar PS" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>District</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Khordha " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>State </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Odisha " readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Incident Date </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="05-08-2026" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Incident Location</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Saheed Nagar, Bhubaneswar" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Priority </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="High" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Case Status </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Accepted" readOnly />
                        </div>

                    </div>
                </div>
                {/* Case & Evidence Details section end */}


                {/* Forwarding Authority section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Forwarding Authority</AutoTranslate></h2>
                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Forwarding Authority Type</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Police " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Authority Name</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Inspector, Saheed Nagar PS" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Designation </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Inspector " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Organisation</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Odisha Police" readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>District </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Khordha " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Address </AutoTranslate></label>
                            <textarea readOnly>Saheed Nagar Police Station, Bhubaneswar </textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Contact Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="XXXXXXXX" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Email </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="xxxxxxxxxx" readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Forwarding Letter No. </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="FWD/145/2026 " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Forwarding Date</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="06-08-2026" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Mode of Submission </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="Courier " readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Forwarding Letter</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="PDF attachment " readOnly />
                        </div>

                    </div>
                </div>
                {/* Forwarding Authority section end */}

                {/* Evidence / Parcel List section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Evidence / Parcel List</AutoTranslate></h2>
                    <div className="table-wrapper mb-8">
                        <table className="">
                            <thead>
                                <tr>
                                    <th><AutoTranslate>Select</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                    <th><AutoTranslate>Exhibit No.</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence Category</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                                    <th><AutoTranslate>Description</AutoTranslate></th>
                                    <th><AutoTranslate>Assignment</AutoTranslate></th>
                                    <th><AutoTranslate>View</AutoTranslate></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} /></td>
                                    <td>EVD-001</td>
                                    <td>P-1</td>
                                    <td>Digital Evidence</td>
                                    <td>CCTV Footage</td>
                                    <td>CCTV Camera 03</td>
                                    <td>Cyber</td>
                                    <td>
                                        <div class="btn-center">
                                            <button class="viewBtn" title="View Details" onClick={() => openModal()}>
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>EVD-002</td>
                                    <td>P-2</td>
                                    <td>Biological</td>
                                    <td>Blood Sample</td>
                                    <td>Sealed sample</td>
                                    <td>DNA</td>
                                    <td>
                                        <div class="btn-center">
                                            <button class="viewBtn" title="View Details">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>EVD-003 </td>
                                    <td>P-3</td>
                                    <td>Digital Evidence </td>
                                    <td>Mobile Extraction </td>
                                    <td>Mobile image </td>
                                    <td>Cyber</td>
                                    <td>
                                        <div class="btn-center">
                                            <button class="viewBtn" title="View Details">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>EVD-004</td>
                                    <td>P-4</td>
                                    <td>Physical Evidence</td>
                                    <td>Firearm</td>
                                    <td>Country-made pistol</td>
                                    <td>Ballistics</td>
                                    <td>
                                        <div class="btn-center">
                                            <button class="viewBtn" title="View Details">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </div>

                </div>
                {/* Evidence / Parcel List section end */}

                {/* Case & Evidence Details section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Pre-Examination Details</AutoTranslate></h2>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Purpose </AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate>Examination</AutoTranslate></option>
                                <option value=""><AutoTranslate>Re-examination</AutoTranslate></option>
                                <option value=""><AutoTranslate>Further Examination</AutoTranslate></option>
                                <option value=""><AutoTranslate>Further Examination</AutoTranslate></option>
                                <option value=""><AutoTranslate>Opinion</AutoTranslate></option>
                                <option value=""><AutoTranslate>Comparison</AutoTranslate></option>
                                <option value=""><AutoTranslate>Identification</AutoTranslate></option>
                                <option value=""><AutoTranslate>Verification</AutoTranslate></option>
                                <option value=""><AutoTranslate>Other</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Nature of Examination </AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate>Type of forensic examination requested</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>No. of Parcels</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>No. of Exhibits</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Nature of Case </AutoTranslate></label>
                            <textarea id="" rows="2" placeholder="Short description of case" required></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Nature of Crime </AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate>Crime classification </AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Priority </AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate>Normal</AutoTranslate></option>
                                <option value=""><AutoTranslate>Urgent</AutoTranslate></option>
                                <option value=""><AutoTranslate>Critical</AutoTranslate></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Documents Verification Status</AutoTranslate></label>
                            <select value={incomplete} onChange={(e) => setIncomplete(e.target.value)}>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="complete"><AutoTranslate>Complete</AutoTranslate></option>
                                <option value="incomplete"><AutoTranslate>Incomplete</AutoTranslate></option>
                                <option value="notApplicable"><AutoTranslate>Not Applicable</AutoTranslate></option>
                            </select>
                        </div>

                        {incomplete === "incomplete" && (
                            <div className="form-group">
                                <label><AutoTranslate>Document Deficiency Remarks</AutoTranslate></label>
                                <textarea id="" rows="2" required></textarea>
                            </div>
                        )}

                        <div className="form-group">
                            <label><AutoTranslate>Seal Status</AutoTranslate></label>
                            <select value={sealStatus} onChange={(e) => setSealStatus(e.target.value)}>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="properlySealed"><AutoTranslate>Properly Sealed</AutoTranslate></option>
                                <option value="sealMismatch"><AutoTranslate>Seal Mismatch</AutoTranslate></option>
                                <option value="sealDamaged"><AutoTranslate>Seal Damaged</AutoTranslate></option>
                                <option value="sealTampered"><AutoTranslate>Seal Tampered</AutoTranslate></option>
                                <option value="notApplicable"><AutoTranslate>Not Applicable</AutoTranslate></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Parcel Condition</AutoTranslate></label>
                            <select value={percelCondition} onChange={(e) => setPercelCondition(e.target.value)}>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="good"><AutoTranslate>Good</AutoTranslate></option>
                                <option value="damaged"><AutoTranslate>Damaged</AutoTranslate></option>
                                <option value="wet"><AutoTranslate>Wet</AutoTranslate></option>
                                <option value="torn"><AutoTranslate>Torn</AutoTranslate></option>
                                <option value="other"><AutoTranslate>Other</AutoTranslate></option>
                            </select>
                        </div>

                        {["sealMismatch", "sealDamaged", "sealTampered"].includes(sealStatus) && (
                            <div className="form-group">
                                <label><AutoTranslate>Verification Remarks</AutoTranslate></label>
                                <textarea id="" rows="2" required></textarea>
                            </div>
                        )}


                        {percelCondition === "other" && (
                            <div className="form-group">
                                <label><AutoTranslate>Specify Other Condition </AutoTranslate></label>
                                <input type="text" placeholder="" name="" required="" />
                            </div>
                        )}

                    </div>
                </div>
                {/* Case & Evidence Details section end */}

                <div class="btn-group">
                    <button type="button" class="btn-primary">Save</button>
                    <button type="button" class="btn btn-outline">Reset</button>
                    <button type="button" class="btn btn-back" onClick={() => setShowPreExamine(false)}>Back</button>
                </div>

            </div>

            {/* Evidence Allocation Modal */}
            {isChecked && (
                <div className="overlayModal">
                    <div className="document-modal modal-sm">

                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2><AutoTranslate>Evidence Allocation</AutoTranslate></h2>
                            </div>
                            <div className="headerRight">
                                {/* Close Button */}
                                <button className="closeBtn" onClick={() => { setIsChecked(false) }} title="Close">
                                    <MdOutlineClose />
                                </button>
                            </div>

                        </div>

                        {/* Modal body Content */}
                        <div className="modal-body">
                            <div className="bodyScroller print:overflow-visible print:max-h-none">
                                <div className="mb-4">
                                    <div className="grid grid-col-1 mb-4">
                                        <div className="form-group">
                                            <label><AutoTranslate>Division</AutoTranslate></label>
                                            <select>
                                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                                <option value=""><AutoTranslate></AutoTranslate></option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label><AutoTranslate>Assigned To</AutoTranslate></label>
                                            <select>
                                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                                <option value=""><AutoTranslate></AutoTranslate></option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label><AutoTranslate>Assign Remark </AutoTranslate></label>
                                            <textarea id="" rows="2" required></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button onClick={() => setIsChecked(false)} className="btn-cancel">
                                        <AutoTranslate>Cancel</AutoTranslate>
                                    </button>
                                    <button className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center`}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {/* Document Details Modal */}
            {isOpen && (
                <div className="overlayModal">
                    <div className="document-modal">
                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-title">
                                <div className="bg-indigo-600 text-white rounded-lg p-1">
                                    <span className="text-lg font-bold">D</span>
                                    <span className="text-lg font-bold">MS</span>
                                </div>
                                <h2>
                                    <AutoTranslate>Evidence Details</AutoTranslate>
                                </h2>
                            </div>
                            {/* Auto-selection Notification Banner */}

                            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3" >
                                    <div className="flex items-center">
                                        <CheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                                        <span className="text-blue-700 font-medium">
                                            <AutoTranslate>approved Case(s) auto-selected for sharing</AutoTranslate>
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-600 mt-1">
                                        <AutoTranslate>All approved files are selected because this document was selected in the table.</AutoTranslate>
                                    </p>
                                </div> */}

                            <div className="headerRight">
                                <button
                                    // onClick={() => handlePrintReport()}
                                    className="printBtn"
                                    title="Print">
                                    <PrinterIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="closeBtn"
                                    title="Close"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal body Content */}
                        <div className="modal-body">
                            <div className="bodyScroller print:overflow-visible print:max-h-none">

                                <div className="top-section">
                                    <div className="info-card">
                                        <div className="info-grid">
                                            {[
                                                { label: "Laboratories", value: "Value here..." },
                                                { label: "Division", value: "Value here..." },
                                                { label: "Case No.", value: "1345" },
                                                { label: "Case Title", value: "CaseTitle" },
                                                { label: "Case Description", value: "Description here...." },
                                                { label: "Evidence Category", value: "category here..." },
                                                { label: "Upload By", value: "DEEVAN SINGH" },
                                            ].map((item, idx) => (
                                                <p key={idx} className="text-md text-gray-700">
                                                    <AutoTranslate>{item.label}</AutoTranslate> <AutoTranslate>{item.value || "N/A"}</AutoTranslate>
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="qr-card">
                                        <h2 className="mb-4">
                                            <AutoTranslate>QR Code</AutoTranslate>
                                        </h2>

                                        <>
                                            <div className="imgWp">
                                                <img src={qrCodeImg} alt="QR Code" />
                                            </div>
                                            <button
                                                // onClick={downloadQRCode}
                                                className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                            >
                                                <ArrowDownTrayIcon className="h-4 w-4" />
                                                <AutoTranslate>Download QR</AutoTranslate>
                                            </button>
                                        </>
                                        {/* <div className="text-center text-gray-500 py-8">
                                                <QrCodeIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                                                <p><AutoTranslate>No QR code available</AutoTranslate></p>
                                            </div> */}

                                    </div>
                                </div>

                                {/* Attached Files Section */}
                                <div className="mt-8">
                                    <div className="attachedWp relative">
                                        <h2 className="mb-0">
                                            <AutoTranslate>Attached Files</AutoTranslate>
                                            <span className="text-sm font-normal text-gray-600">
                                                selected for trash)
                                            </span>
                                        </h2>
                                        <div className="flex items-center gap-4">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder="Search files..."
                                                    className="searchIcon"
                                                />
                                            </div>

                                            {/* Share Button */}
                                            <button
                                                // onClick={() => handleShareDocument()}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                                                title="Share document"
                                            >
                                                <ShareIcon className="h-4 w-4" />
                                                <AutoTranslate>Share</AutoTranslate>
                                            </button>

                                            {/* View Shares Button */}

                                            {/* <button
                                                    // onClick={() => handleViewShares()}
                                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                                                    title="View shared access"
                                                >
                                                    <UserGroupIcon className="h-4 w-4" />
                                                    <AutoTranslate>View Shares</AutoTranslate>
                                                </button> */}



                                            {/* <button
                                                    // onClick={handleBulkFileDelete}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                    <span><AutoTranslate>Move to Trash</AutoTranslate></span>
                                                </button> */}

                                        </div>
                                    </div>


                                    <div className="table-wrapper mb-8">
                                        <table className="">
                                            <thead>
                                                <tr>
                                                    <th><input type="checkbox" /></th>
                                                    <th><AutoTranslate>File Name</AutoTranslate></th>
                                                    <th><AutoTranslate>Year</AutoTranslate></th>
                                                    <th><AutoTranslate>Version</AutoTranslate></th>
                                                    <th><AutoTranslate>Status</AutoTranslate></th>
                                                    <th><AutoTranslate>Action By</AutoTranslate></th>
                                                    <th><AutoTranslate>Action Date</AutoTranslate></th>
                                                    <th><AutoTranslate>Reason</AutoTranslate></th>
                                                    <th><AutoTranslate>View</AutoTranslate></th>
                                                    <th><AutoTranslate>Action</AutoTranslate></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td style={{ width: "210px", overflowWrap: "anywhere" }}>1. eee_Receipt_2026_1.0.0_20260714_145422925_1.pdf</td>
                                                    <td>2026</td>
                                                    <td>1.0.0</td>
                                                    <td><span className='approved'>APPROVED</span></td>
                                                    <td>raj.deewan@gmail.com</td>
                                                    <td>14/07/2026</td>
                                                    <td>--</td>
                                                    <td>
                                                        <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap
                                                            bg-indigo-600 hover:bg-indigo-700 text-white"><EyeIcon className="h-3 w-3" /><span class="">View</span></button></td>
                                                    <td>
                                                        <button class="p-1.5 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200" title="Move to Trash"><TrashIcon className="h-4 w-4 text-red-600" /></button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td style={{ width: "210px", overflowWrap: "anywhere" }}>1. eee_Receipt_2026_1.0.0_20260714_145422925_1.pdf</td>
                                                    <td>2026</td>
                                                    <td>1.0.0</td>
                                                    <td><span className='approved'>APPROVED</span></td>
                                                    <td>raj.deewan@gmail.com</td>
                                                    <td>14/07/2026</td>
                                                    <td>--</td>
                                                    <td>
                                                        <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap
                                                            bg-indigo-600 hover:bg-indigo-700 text-white"><EyeIcon className="h-3 w-3" /><span class="">View</span></button></td>
                                                    <td>
                                                        <button class="p-1.5 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200" title="Move to Trash"><TrashIcon className="h-4 w-4 text-red-600" /></button>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>


                                    <div className='tableInner'>
                                        <table>
                                            <thead>

                                            </thead>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PreExamine