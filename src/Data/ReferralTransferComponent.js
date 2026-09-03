import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import { BRANCH_ADMIN, USER } from "../API/apiConfig";

const ReferralTransferComponent = ({ referrals, onView, currentRole }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filtered = referrals.filter((r) => {
        const term = searchTerm.toLowerCase();
        return (
            r.caseNo?.toLowerCase().includes(term) ||
            r.evidenceId?.toLowerCase().includes(term) ||
            r.evidenceType?.toLowerCase().includes(term) ||
            r.fromLaboratoryName?.toLowerCase().includes(term) ||
            r.toLaboratoryName?.toLowerCase().includes(term)
        );
    });

    const visible = filtered.slice(0, itemsPerPage);
    const totalItems = filtered.length;

    const statusLabel = (status) => {
        if (status === "REFERRED") return currentRole === USER
            ? "Pending Acceptance"
            : "Referred for External Examination";
        if (status === "ACCEPTED") return "Referred Case Approved";
        return status || "--";
    };

    const statusClass = (status) => status === "ACCEPTED" ? "approved" : "pending";

    // Any role other than BRANCH_ADMIN / USER falls back to this
    // generic table so the list is never silently empty for e.g.
    // "Case & Evidence Officer" or other roles.
    const isBranchAdmin = currentRole === BRANCH_ADMIN;
    const isDepartmentAdmin = currentRole === USER;
    const isOtherRole = !isBranchAdmin && !isDepartmentAdmin;

    return (
        <div className="card">
            <div className="grid grid-col-4 mb-4">
                <div className="form-group">
                    <label htmlFor="itemsPerPage"><span><AutoTranslate>Show:</AutoTranslate></span></label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="searchId"><span><AutoTranslate>Search</AutoTranslate></span></label>
                    <input
                        type="text"
                        id="searchId"
                        placeholder="Search..."
                        className="searchIcon"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isBranchAdmin && (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th><AutoTranslate>Case No.</AutoTranslate></th>
                                {/* <th><AutoTranslate>Evidence ID</AutoTranslate></th> */}
                                <th><AutoTranslate>From Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>To Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>Date</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Status</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.length > 0 ? visible.map((r) => (
                                <tr key={r.documentDetailId}>
                                    <td>{r.caseNo || '--'}</td>
                                    {/* <td>{r.evidenceId || '--'}</td> */}
                                    <td>{r.fromLaboratoryName || '--'}</td>
                                    <td>{r.toLaboratoryName || '--'}</td>
                                    <td>{r.referredOn ? new Date(r.referredOn).toLocaleDateString() : '--'}</td>
                                    <td className='text-center'>
                                        <span className={statusClass(r.referralStatus)}>{statusLabel(r.referralStatus)}</span>
                                    </td>
                                    <td className="text-center">
                                        <button className="btnTable" onClick={() => onView(r.documentDetailId)}>
                                            <AutoTranslate>View</AutoTranslate>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        <span><AutoTranslate>No data found.</AutoTranslate></span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isDepartmentAdmin && (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th><AutoTranslate>Case No.</AutoTranslate></th>
                                <th><AutoTranslate>From Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                                <th><AutoTranslate>Status</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.length > 0 ? visible.map((r) => (
                                <tr key={r.documentDetailId}>
                                    <td>{r.caseNo || '--'}</td>
                                    <td>{r.fromLaboratoryName || '--'}</td>
                                    <td>{r.evidenceId || '--'}</td>
                                    <td>{r.evidenceType || '--'}</td>
                                    <td><span className={statusClass(r.referralStatus)}>{statusLabel(r.referralStatus)}</span></td>
                                    <td className="text-center">
                                        <button className="btnTable" onClick={() => onView(r.documentDetailId)}>
                                            <AutoTranslate>View</AutoTranslate>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        <span><AutoTranslate>No data found.</AutoTranslate></span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isOtherRole && (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th><AutoTranslate>Case No.</AutoTranslate></th>
                                <th><AutoTranslate>Evidence ID</AutoTranslate></th>
                                <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                                <th><AutoTranslate>From Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>To Laboratory</AutoTranslate></th>
                                <th><AutoTranslate>Date</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Status</AutoTranslate></th>
                                <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.length > 0 ? visible.map((r) => (
                                <tr key={r.documentDetailId}>
                                    <td>{r.caseNo || '--'}</td>
                                    <td>{r.evidenceId || '--'}</td>
                                    <td>{r.evidenceType || '--'}</td>
                                    <td>{r.fromLaboratoryName || '--'}</td>
                                    <td>{r.toLaboratoryName || '--'}</td>
                                    <td>{r.referredOn ? new Date(r.referredOn).toLocaleDateString() : '--'}</td>
                                    <td className='text-center'>
                                        <span className={statusClass(r.referralStatus)}>{statusLabel(r.referralStatus)}</span>
                                    </td>
                                    <td className="text-center">
                                        <button className="btnTable" onClick={() => onView(r.documentDetailId)}>
                                            <AutoTranslate>View</AutoTranslate>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={8} className="text-center">
                                        <span><AutoTranslate>No data found.</AutoTranslate></span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="paginationWp">
                <div className="items">
                    <div className="paginationText">
                        <span className="text-sm text-gray-700">
                            <AutoTranslate>{`Showing ${totalItems > 0 ? 1 : 0} to ${visible.length} of ${totalItems} entries.`}</AutoTranslate>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReferralTransferComponent;