import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import { API_HOST } from "../API/apiConfig";

const ReportEntryComponent = ({ onOpenCase }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMyPendingCases();
  }, []);

  const fetchMyPendingCases = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching cases from:', `${API_HOST}/api/report-entry/pending`);
      
      const response = await apiClient.get(`${API_HOST}/api/report-entry/pending`);
      console.log('API Response:', response);
      console.log('Response Data:', response.data);
      
      setCases(response.data || []);
      
      // Log if no data returned
      if (!response.data || response.data.length === 0) {
        console.log('No cases returned from API');
      }
    } catch (error) {
      console.error("Error fetching report entry cases:", error);
      console.error("Error details:", error.response?.data || error.message);
      
      // FOR TESTING: Use mock data if API fails with 500
      // Remove this in production!
      if (error.response?.status === 500) {
        console.log('Backend error - using mock data for testing');
        setCases([
          {
            documentHeaderId: 1,
            fileNo: "CASE-001",
            title: "Test Case 1",
            caseType: "Fraud",
            attachedFileCount: 3,
            status: "PENDING"
          },
          {
            documentHeaderId: 2,
            fileNo: "CASE-002",
            title: "Test Case 2",
            caseType: "Cyber Crime",
            attachedFileCount: 5,
            status: "DRAFT"
          }
        ]);
      } else {
        setError(error.response?.data?.message || error.message || "Failed to load cases");
        setCases([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered = cases.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.fileNo?.toLowerCase().includes(term) ||
      c.title?.toLowerCase().includes(term) ||
      c.caseType?.toLowerCase().includes(term)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusLabel = (status) => {
    if (status === "DRAFT") return { text: "Draft Saved", cls: "pending" };
    return { text: "Pending", cls: "pending" };
  };

  const handleOpenCase = (documentHeaderId) => {
    console.log('Opening case with ID:', documentHeaderId);
    if (typeof onOpenCase === 'function') {
      onOpenCase(documentHeaderId);
    } else {
      console.error('onOpenCase is not a function or not provided');
      alert('Please configure onOpenCase handler in parent component');
    }
  };

  if (loading) return <LoadingComponent />;

  // Show error message if there's an error and no cases
  if (error && cases.length === 0) {
    return (
      <div className="card">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ color: 'red' }}>Error Loading Cases</h3>
          <p>{error}</p>
          <button 
            className="btn-primary" 
            onClick={fetchMyPendingCases}
            style={{ marginTop: '10px' }}
          >
            <AutoTranslate>Retry</AutoTranslate>
          </button>
        </div>
      </div>
    );
  }

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
              <th><span><AutoTranslate>Case No</AutoTranslate></span></th>
              <th><span><AutoTranslate>Case Title</AutoTranslate></span></th>
              <th><span><AutoTranslate>Case Type</AutoTranslate></span></th>
              <th className="text-center"><span><AutoTranslate>No. Of Attached Files</AutoTranslate></span></th>
              <th className="text-center"><span><AutoTranslate>Status</AutoTranslate></span></th>
              <th className="text-center"><span><AutoTranslate>Action</AutoTranslate></span></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((c) => {
              const status = statusLabel(c.status);
              return (
                <tr key={c.documentHeaderId}>
                  <td>{c.fileNo || '--'}</td>
                  <td>{c.title || '--'}</td>
                  <td>{c.caseType || '--'}</td>
                  <td className="text-center">{c.attachedFileCount || 0}</td>
                  <td className="text-center"><span className={status.cls}>{status.text}</span></td>
                  <td className="text-center">
                    <button 
                      className="btnTable" 
                      onClick={() => handleOpenCase(c.documentHeaderId)}
                    >
                      <AutoTranslate>View & Examine</AutoTranslate>
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <span><AutoTranslate>No cases pending report entry.</AutoTranslate></span>
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
  );
};

export default ReportEntryComponent;