import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';

const ReportReviewComponent = ({ reports, onView }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = reports.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.fileNo?.toLowerCase().includes(term) ||
      r.firNumber?.toLowerCase().includes(term) ||
      r.caseTitle?.toLowerCase().includes(term) ||
      r.scientificOfficerName?.toLowerCase().includes(term) ||
      r.reportTitle?.toLowerCase().includes(term)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="card">
      <div className="grid grid-col-4 mb-4">
        <div className="form-group">
          <label htmlFor="itemsPerPage"><span><AutoTranslate>Show:</AutoTranslate></span></label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
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
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><AutoTranslate>Case No.</AutoTranslate></th>
              <th><AutoTranslate>FIR No.</AutoTranslate></th>
              <th><AutoTranslate>Case Title</AutoTranslate></th>
              <th><AutoTranslate>Scientific Officer</AutoTranslate></th>
              <th><AutoTranslate>Report Title</AutoTranslate></th>
              <th><AutoTranslate>Submitted Date</AutoTranslate></th>
              <th><AutoTranslate>Case Status</AutoTranslate></th>
              <th className='text-center'><AutoTranslate>Action</AutoTranslate></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((report) => (
              <tr key={report.reportEntryId}>
                <td>{report.fileNo || '--'}</td>
                <td>{report.firNumber || '--'}</td>
                <td>{report.caseTitle || '--'}</td>
                <td>{report.scientificOfficerName || '--'}</td>
                <td>{report.reportTitle || '--'}</td>
                <td>{report.submittedDate ? new Date(report.submittedDate).toLocaleDateString() : '--'}</td>
                <td><span className="pending">Pending for Review</span></td>
                <td className="text-center">
                  <button 
                    className="btnTable" 
                    onClick={() => onView(report.documentHeaderId)}
                  >
                    <AutoTranslate>View</AutoTranslate>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="text-center">
                  <span><AutoTranslate>No reports pending for review.</AutoTranslate></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="paginationWp">
        <div className="items">
          <div className="paginationText">
            <span className="text-sm text-gray-700">
              <AutoTranslate>
                {`Showing ${totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} entries.`}
              </AutoTranslate>
            </span>
            <span className="text-sm text-gray-700 mx-2">(<AutoTranslate>Pages</AutoTranslate> {totalPages})</span>
          </div>
        </div>
        <div className="items">
          <div className="paginationBtn">
            <button title="Previous" disabled={currentPage === 1 || totalPages === 0}
              className={currentPage === 1 || totalPages === 0 ? "cursor-not-allowed" : ""}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
            </button>
            <button title="Next" disabled={currentPage === totalPages || totalPages === 0}
              className={currentPage === totalPages || totalPages === 0 ? "cursor-not-allowed" : ""}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportReviewComponent;