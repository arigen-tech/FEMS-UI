import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const ReferralTransferComponent = ({ onView, currentRole }) => {
   
    return (
        <div className="">
            <div className="title">
                <h1><AutoTranslate>Referral / Transfer</AutoTranslate></h1>
            </div>

            <div class="card">

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
              
                {currentRole === "LABORATORY ADMIN / HOD" ? (<div class="table-wrapper">
                    <table class="">
                        <thead>
                            <tr>
                                <th><AutoTranslate>Case No.</AutoTranslate></th>
                                <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                <th><AutoTranslate>From Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>To Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>Date</AutoTranslate></th>
                                <th><AutoTranslate>Status</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><AutoTranslate>DFSL/145/2026</AutoTranslate></td>
                                <td><AutoTranslate>DNA</AutoTranslate></td>
                                <td><AutoTranslate>DFSL Khordha</AutoTranslate></td>
                                <td><AutoTranslate>SFSL Bhubaneswar</AutoTranslate></td>
                                <td><AutoTranslate>18-Aug</AutoTranslate></td>
                                <td><span className='pending'>Reffered for External Examination</span></td>
                                <td class="text-center"><button class="btnTable" onClick={onView}><span class="">View</span></button></td>
                            </tr>
                            {/* <tr>
                            <td colspan="10" class="text-center"><span class="">No data found.</span></td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>) : ""}


                {currentRole === "CASE & EVIDENCE OFFICER" ? (<div class="table-wrapper">
                    <table class="">
                        <thead>
                            <tr>
                                <th><AutoTranslate>Case No.</AutoTranslate></th>
                                <th><AutoTranslate>Referral ID</AutoTranslate></th>
                                <th><AutoTranslate>From Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                <th><AutoTranslate>Division</AutoTranslate></th>
                                <th><AutoTranslate>Status</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><AutoTranslate>SFSL/145/2026</AutoTranslate></td>
                                <td><AutoTranslate>REF-00021</AutoTranslate></td>
                                <td><AutoTranslate>DFSL Khordha</AutoTranslate></td>
                                <td><AutoTranslate>SFSL Bhubaneswar</AutoTranslate></td>
                                <td><AutoTranslate>EVD-002	Cyber</AutoTranslate></td>
                                <td><span className='pending'>Pending Acceptance</span></td>
                                <td class="text-center"><button class="btnTable" onClick={onView}><span class="">View</span></button></td>
                            </tr>
                            {/* <tr>
                            <td colspan="10" class="text-center"><span class="">No data found.</span></td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>) : ""}


                {/* Pagination Controls */}
                <div class="paginationWp">
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

            </div>

        </div>
    )
}

export default ReferralTransferComponent