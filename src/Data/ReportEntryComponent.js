import React from 'react'
import { Link } from 'react-router-dom'

const ReportEntryComponent = ({ setShowViewExamine }) => {
    return (
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

            <div class="table-wrapper">
                <table class="">
                    <thead>
                        <tr>
                            <th class="text-center">
                                <input type="checkbox" title="Select all documents" />
                            </th>
                            <th><span class="">Case No</span></th>
                            <th><span class="">Case Title</span></th>
                            <th><span class="">Case Description</span></th>
                            <th class="text-center"><span class="">No. Of Attached Files</span></th>
                            <th class="text-center"><span class="">Status</span></th>
                            <th class="text-center"><span class="">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" title="Select all documents" /></td>
                            <td>FSL/2026/00145</td>
                            <td>Bhubaneswar</td>
                            <td>Case Description...</td>
                            <td class="text-center">6</td>
                            <td class="text-center"><span class="pending">Pending</span></td>
                            <td class="text-center"><button class="btnTable" onClick={() => setShowViewExamine(true)}>View &amp; Examine</button></td>
                            {/* <td colspan="10" class="text-center"><span class="">No data found.</span></td> */}
                        </tr>
                        <tr>
                            <td><input type="checkbox" title="Select all documents" /></td>
                            <td>FSL/2026/00145</td>
                            <td>Bhubaneswar</td>
                            <td>Case Description...</td>
                            <td class="text-center">4</td>
                            <td class="text-center"><span class="pending">Pending</span></td>
                            <td class="text-center"><button class="btnTable" onClick={() => setShowViewExamine(true)}>View &amp; Examine</button></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" title="Select all documents" /></td>
                            <td>FSL/2026/00146</td>
                            <td>Bhubaneswar</td>
                            <td>Case Description...</td>
                            <td class="text-center">5</td>
                            <td class="text-center"><span class="pending">Referral Report Entry Pending</span></td>
                            <td class="text-center">
                                <Link to="/referral-report-entry">
                                    <button class="btnTable">View &amp; Examine</button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            {/* <td colspan="10" class="text-center"><span class="">No data found.</span></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>


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
    )
}

export default ReportEntryComponent