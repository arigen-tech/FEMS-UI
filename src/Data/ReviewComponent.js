import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST } from "../API/apiConfig";

const ReviewComponent = ({ documentHeaderId, onView, onBack }) => {
  const [caseData, setCaseData] = useState(null);
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const showPopup = (message, type = 'info') => {
    setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
  };

  useEffect(() => {
    fetchCaseAndEvidence();
  }, [documentHeaderId]);

  const fetchCaseAndEvidence = async () => {
    try {
      setLoading(true);

      const [caseRes, evidenceRes] = await Promise.all([
        apiClient.get(`${API_HOST}/api/report-entry/case/${documentHeaderId}`),
        apiClient.get(`${API_HOST}/api/report-review/evidence/${documentHeaderId}`)
      ]);

      setCaseData(caseRes.data);
      setEvidenceList(evidenceRes.data || []);
    } catch (error) {
      console.error("Error fetching case/evidence:", error);
      showPopup("Failed to load case and evidence details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvidence = evidenceList.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.evidenceId?.toLowerCase().includes(term) ||
      item.evidenceCategory?.toLowerCase().includes(term) ||
      item.evidenceType?.toLowerCase().includes(term) ||
      item.division?.toLowerCase().includes(term) ||
      item.scientificOfficerName?.toLowerCase().includes(term)
    );
  });

  const visibleEvidence = filteredEvidence.slice(0, itemsPerPage);

  if (loading) return <LoadingComponent />;
  if (!caseData) return null;

  return (
    <>
      {popupMessage && (
        <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
      )}

      <div className="card">
        {/* Case & Evidence Information */}
        <div className="cardLight mb-30">
          <div className='btnBackTop'>
            <button type="button" className="btnBack" onClick={onBack}></button>
            <h2><AutoTranslate>Case & Evidence Information</AutoTranslate></h2>
          </div>

          <div className="grid grid-col-4 mb-4">
            <div className="form-group">
              <label><AutoTranslate>Case ID</AutoTranslate></label>
              <input type="text" value={caseData.caseId || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>File No.</AutoTranslate></label>
              <input type="text" value={caseData.fileNo || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>FIR Number</AutoTranslate></label>
              <input type="text" value={caseData.firNumber || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Police Station</AutoTranslate></label>
              <input type="text" value={caseData.policeStation || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Title</AutoTranslate></label>
              <input type="text" value={caseData.title || ''} readOnly />
            </div>
            {/* <div className="form-group">
              <label><AutoTranslate>Subject</AutoTranslate></label>
              <input type="text" value={caseData.subject || ''} readOnly />
            </div> */}
          </div>
        </div>

        {/* Table controls */}
        <div className="grid grid-col-4 mb-4">
          <div className="form-group">
            <label htmlFor="itemsPerPage"><span>Show:</span></label>
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
            <label htmlFor="searchId"><span>Search</span></label>
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

        {/* Evidence Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th><AutoTranslate>S.No</AutoTranslate></th>
                {/* <th><AutoTranslate>Evidence ID</AutoTranslate></th> */}
                <th><AutoTranslate>Evidence Category</AutoTranslate></th>
                <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                <th><AutoTranslate>Division</AutoTranslate></th>
                <th><AutoTranslate>Scientific Officer</AutoTranslate></th>
                <th><AutoTranslate>Report Status</AutoTranslate></th>
                <th><AutoTranslate>Referral Status</AutoTranslate></th>
                <th><AutoTranslate>Action</AutoTranslate></th>
              </tr>
            </thead>
            <tbody>
              {visibleEvidence.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    <span><AutoTranslate>No data found.</AutoTranslate></span>
                  </td>
                </tr>
              ) : (
                visibleEvidence.map((item, index) => (
                  <tr key={item.documentDetailId}>
                    <td>{index + 1}</td>
                    {/* <td>{item.evidenceId}</td> */}
                    <td>{item.evidenceCategory || '--'}</td>
                    <td>{item.evidenceType || '--'}</td>
                    <td>{item.division || '--'}</td>
                    <td>{item.scientificOfficerName || '--'}</td>
                    <td>{item.reportStatus || '--'}</td>
                    <td>{item.referralStatus || '--'}</td>
                    <td className="text-center">
                      <button
                        className="btnTable"
                        onClick={() => onView(item.reportEntryId, item.documentDetailId)}
                        disabled={!item.reportEntryId}
                      >
                        <AutoTranslate>View</AutoTranslate>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="paginationWp mb-20">
          <div className="items">
            <div className="paginationText">
              <span className="text-sm text-gray-700">
                <AutoTranslate>Showing</AutoTranslate> {visibleEvidence.length > 0 ? 1 : 0} to {visibleEvidence.length} of {filteredEvidence.length} <AutoTranslate>entries.</AutoTranslate>
              </span>
            </div>
          </div>
        </div>

        <div className="btn-group">
          <button type="button" className="btn btn-back" onClick={onBack}>
            <AutoTranslate>Back</AutoTranslate>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;