import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import { API_HOST } from "../API/apiConfig";

const DispatchComponent = ({ onView }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchPendingDispatch();
  }, []);

  const fetchPendingDispatch = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/dispatch/pending`);
      setReports(response.data || []);
    } catch (error) {
      console.error("Error fetching pending dispatch list:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = reports.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.caseNumber?.toLowerCase().includes(term) ||
      r.firNumber?.toLowerCase().includes(term) ||
      r.reportNumber?.toLowerCase().includes(term) ||
      r.divisionName?.toLowerCase().includes(term)
    );
  });

  const visible = filtered.slice(0, itemsPerPage);
  const totalItems = filtered.length;

  if (loading) return <LoadingComponent />;

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

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><AutoTranslate>Case Number</AutoTranslate></th>
              <th><AutoTranslate>FIR Number</AutoTranslate></th>
              <th><AutoTranslate>Report Number</AutoTranslate></th>
              <th><AutoTranslate>Division</AutoTranslate></th>
              <th><AutoTranslate>Approved Date</AutoTranslate></th>
              <th><AutoTranslate>Status</AutoTranslate></th>
              <th><AutoTranslate>Action</AutoTranslate></th>
            </tr>
          </thead>
          <tbody>
            {visible.length > 0 ? visible.map((r) => (
              <tr key={r.reportEntryId}>
                <td>{r.caseNumber || '--'}</td>
                <td>{r.firNumber || '--'}</td>
                <td>{r.reportNumber || '--'}</td>
                <td>{r.divisionName || '--'}</td>
                <td>{r.approvedDate ? new Date(r.approvedDate).toLocaleDateString() : '--'}</td>
                <td><span className={r.dispatchStatus === 'DISPATCHED' ? 'approved' : 'pending'}>{r.dispatchStatus}</span></td>
                <td className="text-center">
                  <button className="btnTable" onClick={() => onView(r.reportEntryId)}>
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

export default DispatchComponent;