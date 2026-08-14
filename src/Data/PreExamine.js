import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const PreExamine = ({ setShowPreExamine }) => {
    const [adSubmitted, setAdSubmitted] = useState("");
    const [sealsIntact, setSealsIntact] = useState("");
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
                                    <td><input type="checkbox" /></td>
                                    <td>EVD-001</td>
                                    <td>P-1</td>
                                    <td>Digital Evidence</td>
                                    <td>CCTV Footage</td>
                                    <td>CCTV Camera 03</td>
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

                    </div>
                </div>
                {/* Case & Evidence Details section end */}


                {/* Document / Forwarding Verification section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Document / Forwarding Verification</AutoTranslate></h2>
                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Adequate Documents Submitted</AutoTranslate></label>
                            <select value={adSubmitted} onChange={(e) => setAdSubmitted(e.target.value)}>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        {adSubmitted === "no" && (
                            <div className="form-group">
                                <label><AutoTranslate>Document Deficiency Remarks</AutoTranslate></label>
                                <textarea id="" rows="2" required></textarea>
                            </div>
                        )}

                        <div className="form-group">
                            <label><AutoTranslate>Forwarding Letter Available</AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>FIR Copy Available </AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seizure Memo Available</AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>FSL Form Available</AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Court Order Available </AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Other Required Documents</AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Document Deficiency Remarks</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                    </div>
                </div>
                {/* Document / Forwarding Verification section end */}



                {/* Parcel / Seal Verification section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Parcel / Seal Verification</AutoTranslate></h2>
                    <div className="grid grid-col-4 mb-4">

                        <div className="form-group">
                            <label><AutoTranslate>Seals Intact</AutoTranslate></label>
                            <select value={sealsIntact} onChange={(e) => setSealsIntact(e.target.value)}>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                                <option value="na"><AutoTranslate>NA</AutoTranslate></option>
                            </select>
                        </div>
                        {sealsIntact === "no" && (
                            <div className="form-group">
                                <label><AutoTranslate>Remarks</AutoTranslate></label>
                                <textarea id="" rows="2" required></textarea>
                            </div>
                        )}

                        <div className="form-group">
                            <label><AutoTranslate>Seal Tallied</AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                                <option value="na"><AutoTranslate>NA</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seal Impression Available </AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                                <option value="na"><AutoTranslate>NA</AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Parcel Condition </AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate></AutoTranslate></option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Parcel Tampered </AutoTranslate></label>
                            <select>
                                <option value="0"><AutoTranslate>Select</AutoTranslate></option>
                                <option value="yes"><AutoTranslate>Yes</AutoTranslate></option>
                                <option value="no"><AutoTranslate>No</AutoTranslate></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Parcel Description</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seal Details</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seal Verification Remarks </AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                    </div>
                </div>
                {/* Parcel / Seal Verification section end */}

                {/* Evidence Examination Request section */}
                <div className="cardLight mb-20">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Evidence Examination Request</AutoTranslate></h2>
                    <div className="grid grid-col-4 mb-4">

                        <div className="form-group">
                            <label><AutoTranslate>Evidence ID </AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Exhibit Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence Category</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence Type </AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Examination Requested </AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Quantity</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Condition </AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Source </AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Collection Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Collection Location</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Remarks</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>

                    </div>
                </div>
                {/* Evidence Examination Request section end */}

                <div class="btn-group">
                    <button type="button" class="btn-primary">Save</button>
                    <button type="button" class="btn btn-outline">Reset</button>
                    <button type="button" class="btn btn-back" onClick={() => setShowPreExamine(false)}>Back</button>
                </div>

            </div>
        </>
    )
}

export default PreExamine