import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import { MdRemoveRedEye, MdOutlineClose } from "react-icons/md";

const FinalReviewComponent = ({ onBack }) => {
    const [referTransfer, setReferTransfer] = useState(false);

    return (
        <>
            <div className="card">
                <div className="cardLight">
                    <div className='btnBackTop'>
                        <button type="button" class="btnBack" onClick={onBack}></button>
                        <h2><AutoTranslate>Scientific Examination</AutoTranslate></h2>
                    </div>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Examination Start Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" readOnly required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Examination End Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" readOnly required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Examination Method</AutoTranslate></label>
                            <input type="date" placeholder="" name="" readOnly required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Observations/Findings </AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Scientific Opinion </AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Examination Remarks </AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly></textarea>
                        </div>
                    </div>
                </div>

                <div className="cardLight">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Attached Files</AutoTranslate></h2>

                    <div class="table-wrapper">
                        <table class="">
                            <thead>
                                <tr>
                                    <th><AutoTranslate>File Name</AutoTranslate></th>
                                    <th><AutoTranslate>Year</AutoTranslate></th>
                                    <th><AutoTranslate>Version</AutoTranslate></th>
                                    <th><AutoTranslate>Status</AutoTranslate></th>
                                    <th><AutoTranslate>View</AutoTranslate></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><AutoTranslate>1.Budget_Allocation_Report_2021_2.0.0_20260710_101337991_1.jpeg</AutoTranslate></td>
                                    <td><AutoTranslate>2021</AutoTranslate></td>
                                    <td><AutoTranslate>2.0.0</AutoTranslate></td>
                                    <td><span className='pending'>PENDING</span></td>
                                    <td>
                                        <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap
                    bg-indigo-600 hover:bg-indigo-700 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-3 w-3"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd"></path></svg><span class="">View</span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><AutoTranslate>1.Budget_Allocation_Report_2021_2.0.0_20260710_101337991_1.jpeg</AutoTranslate></td>
                                    <td><AutoTranslate>2021</AutoTranslate></td>
                                    <td><AutoTranslate>2.0.0</AutoTranslate></td>
                                    <td><span className='pending'>PENDING</span></td>
                                    <td>
                                        <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap
                    bg-indigo-600 hover:bg-indigo-700 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-3 w-3"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd"></path></svg><span class="">View</span></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="cardLight">
                    <h2 className="flex align-center gap-2 mb-5"><AutoTranslate>Report</AutoTranslate></h2>

                    <div className="grid grid-col-4 mb-4">

                        <div className="form-group">
                            <label><AutoTranslate>Report Date</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Report Title</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Scientific Report</AutoTranslate></label>
                            <button class="btn btn-view w-100"><MdRemoveRedEye /> <AutoTranslate>View & Download</AutoTranslate></button>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Supporting Documents</AutoTranslate></label>
                            <button class="btn btn-view w-100"><MdRemoveRedEye /> <AutoTranslate>View & Download</AutoTranslate></button>
                        </div>
                        <div className="form-group col-span-2">
                            <label><AutoTranslate>Report Summary </AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly></textarea>
                        </div>
                    </div>

                </div>
                <div className="grid grid-col-2 mb-4">
                    <div className="form-group">
                        <label><AutoTranslate>Remarks</AutoTranslate></label>
                        <textarea id="" rows="2" required></textarea>
                    </div>

                </div>

                <div class="btn-group">
                    <button type="button" class="btn-primary">Save</button>
                    <button type="button" class="btn-primary">Return</button>
                    <button type="button" class="btn-primary">Approve</button>
                    <button type="button" class="btn-primary" onClick={() => { setReferTransfer(true) }}>Refer / Transfer</button>
                    <button type="button" class="btn btn-back" onClick={onBack}>Back</button>
                </div>

            </div>

            {/* Evidence Allocation Modal */}
            {referTransfer && (
                <div className="overlayModal">
                    <div className="document-modal modal-sm">

                        {/* Header */}
                        <div className="modal-header">
                            <div className="modal-title">
                                <h2><AutoTranslate>Refer / Transfer</AutoTranslate></h2>
                            </div>
                            <div className="headerRight">
                                {/* Close Button */}
                                <button className="closeBtn" onClick={() => { setReferTransfer(false) }} title="Close">
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
                                            <label><AutoTranslate>Transfer Type</AutoTranslate></label>
                                            <select>
                                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                                <option value=""><AutoTranslate>Referral for Further Examination</AutoTranslate></option>
                                                <option value=""><AutoTranslate>Transfer to Another Laboratory</AutoTranslate></option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label><AutoTranslate>From Laboratory</AutoTranslate></label>
                                            <input type="text" placeholder="" name="" value="" required readOnly />
                                        </div>

                                        <div className="form-group">
                                            <label><AutoTranslate>To Laboratory</AutoTranslate></label>
                                            <select>
                                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                                <option value=""><AutoTranslate>CFSL</AutoTranslate></option>
                                                <option value=""><AutoTranslate>SFSL</AutoTranslate></option>
                                                <option value=""><AutoTranslate>RFSL</AutoTranslate></option>
                                                <option value=""><AutoTranslate>DFSL</AutoTranslate></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button onClick={() => setReferTransfer(false)} className="btn-cancel">
                                        <AutoTranslate>Cancel</AutoTranslate>
                                    </button>
                                    <button className="btn-primary">Submit</button>
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