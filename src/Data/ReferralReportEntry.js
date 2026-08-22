import React from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import { Link } from 'react-router-dom';
import { MdRemoveRedEye, MdOutlineClose } from "react-icons/md";

const ReferralReportEntry = () => {
    return (
        <>
            <div className="">
                <div className="title">
                    <h1><AutoTranslate>Referral Report Entry</AutoTranslate></h1>
                </div>

                <div className="card">
                    <div className="cardLight mb-30">
                        <div className='btnBackTop'>
                            <Link to="/report-entry">
                                <button type="button" class="btnBack"></button>
                            </Link>
                            <h2><AutoTranslate>Case & Evidence Information</AutoTranslate></h2>
                        </div>

                        <div className="grid grid-col-4 mb-4">
                            <div className="form-group">
                                <label><AutoTranslate>Case Number</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="SFSL/145/2026" readOnly />
                            </div>
                            <div className="form-group">
                                <label><AutoTranslate>FIR Number</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="145/2026" readOnly />
                            </div>
                            <div className="form-group">
                                <label><AutoTranslate>Police Station</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="Saheed Nagar" readOnly />
                            </div>
                            <div className="form-group">
                                <label><AutoTranslate>District</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="Khordha" readOnly />
                            </div>
                            <div className="form-group">
                                <label><AutoTranslate>Incident Date</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="15-Aug-2026" readOnly />
                            </div>
                            <div className="form-group">
                                <label><AutoTranslate>Forwarding Authority</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="Saheed Nagar Police Station" readOnly />
                            </div>

                            <div className="form-group">
                                <label><AutoTranslate>From Laboratory</AutoTranslate></label>
                                <input type="text" placeholder="" name="" value="" readOnly />
                            </div>

                        </div>
                    </div>



                    <div class="grid grid-col-4 mb-4">
                        <div class="form-group"><label for="itemsPerPage"><span class="">Show:</span></label><select id="itemsPerPage">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select></div>
                        <div class="form-group"><label for="searchId"><span class="">Search</span></label>
                            <input type="text" id="searchId" placeholder="Search..." class="searchIcon" value="" />
                        </div>
                    </div>


                    <div class="table-wrapper">
                        <table class="">
                            <thead>
                                <tr>
                                    <th><AutoTranslate>Referral ID</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence Category</AutoTranslate></th>
                                    <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                                    <th><AutoTranslate>Division</AutoTranslate></th>
                                    <th><AutoTranslate>Scientific Officer</AutoTranslate></th>
                                    <th><AutoTranslate>Report Status</AutoTranslate></th>
                                    <th><AutoTranslate>Referral Status</AutoTranslate></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><AutoTranslate>RFID-001</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-001</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-001</AutoTranslate></td>
                                    <td><AutoTranslate>Biological Sample</AutoTranslate></td>
                                    <td><AutoTranslate>DNA</AutoTranslate></td>
                                    <td><AutoTranslate>Officer A</AutoTranslate></td>
                                    <td><AutoTranslate>Submitted</AutoTranslate></td>
                                    <td><AutoTranslate>--</AutoTranslate></td>
                                </tr>
                                <tr>
                                    <td><AutoTranslate>RFID-002</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-002</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-002</AutoTranslate></td>
                                    <td><AutoTranslate>CCTV Footage</AutoTranslate></td>
                                    <td><AutoTranslate>Cyber</AutoTranslate></td>
                                    <td><AutoTranslate>Officer B</AutoTranslate></td>
                                    <td><AutoTranslate>Submitted</AutoTranslate></td>
                                    <td><AutoTranslate>--</AutoTranslate></td>
                                </tr>
                                <tr>
                                    <td><AutoTranslate>RFID-003</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-003</AutoTranslate></td>
                                    <td><AutoTranslate>EVD-003</AutoTranslate></td>
                                    <td><AutoTranslate>Firearm</AutoTranslate></td>
                                    <td><AutoTranslate>Ballistics</AutoTranslate></td>
                                    <td><AutoTranslate>Officer c</AutoTranslate></td>
                                    <td><AutoTranslate>Submitted</AutoTranslate></td>
                                    <td><AutoTranslate>--</AutoTranslate></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div class="paginationWp mb-20">
                        <div class="items">
                            <div class="paginationText">
                                <span class="text-sm text-gray-700">
                                    <span class="">Showing 0 to 0 of 0 entries.</span></span>
                                <span class="text-sm text-gray-700 mx-2">(<span class="">Pages</span> 0)</span>
                            </div>
                        </div>
                        <div class="items">
                            <div class="paginationBtn"><button title="End" disabled="" class="cursor-not-allowed"><svg
                                stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z">
                                </path>
                            </svg></button><button title="End" disabled="" class="cursor-not-allowed"><svg stroke="currentColor"
                                fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z">
                                </path>
                            </svg></button></div>
                        </div>
                    </div>



                    <div className="cardLight">
                        <div className='btnBackTop'>
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
                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group col-span-2">
                            <label><AutoTranslate>Remarks</AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly></textarea>
                        </div>


                        <div className="form-group">
                            <label><AutoTranslate>Supporting Documents</AutoTranslate></label>
                            <button class="btn btn-view w-100"><MdRemoveRedEye /> <AutoTranslate>View & Download</AutoTranslate></button>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Reason for Referral / Transfer</AutoTranslate><span>*</span></label>
                            <textarea id="" rows="2" required readOnly ></textarea>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Assign to Division</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="DNA" required readOnly />
                        </div>
                        <div className="form-group col-span-2">
                            <label><AutoTranslate>Referral Pre-Examination Remarks </AutoTranslate></label>
                            <textarea id="" rows="2" required readOnly ></textarea>
                        </div>


                        <div className="form-group col-span-2">
                            <label><AutoTranslate>Report Remarks</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Upload Report</AutoTranslate></label>
                            <input type="file" placeholder="" name="" required />
                        </div>

                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn-primary">Save</button>
                        <button type="button" class="btn-primary">Submit</button>
                        <Link to="/report-entry">
                            <button type="button" class="btn btn-back" >Back</button>
                        </Link>

                    </div>
                </div>
            </div>
        </>


    )
}

export default ReferralReportEntry