import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import ReportReviewComponent from './ReportReviewComponent';
import ReviewComponent from './ReviewComponent';
import FinalReviewComponent from './FinalReviewComponent';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST } from "../API/apiConfig";

const ReportReview = () => {
  const [activeComponent, setActiveComponent] = useState("A");
  const [pendingReports, setPendingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocumentHeaderId, setSelectedDocumentHeaderId] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedDocumentDetailId, setSelectedDocumentDetailId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const showPopup = (message, type = 'info') => {
    setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
  };

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const fetchPendingReports = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/report-review/pending`);
      setPendingReports(response.data || []);
    } catch (error) {
      console.error("Error fetching pending reports:", error);
      showPopup("Failed to load pending reports.", "error");
      setPendingReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Called from ReportReviewComponent (Step A) -> opens the evidence table (Step B)
  const handleView = (documentHeaderId) => {
    setSelectedDocumentHeaderId(documentHeaderId);
    setActiveComponent("B");
  };

  // Called from ReviewComponent (Step B) row -> opens the full report (Step C)
  const handleFinalReview = (reportEntryId, documentDetailId) => {
    setSelectedReportId(reportEntryId);
    setSelectedDocumentDetailId(documentDetailId);
    setActiveComponent("C");
  };

  const handleBack = () => {
    setSelectedDocumentHeaderId(null);
    setSelectedReportId(null);
    setSelectedDocumentDetailId(null);
    setActiveComponent("A");
    fetchPendingReports();
  };

  if (loading) return <LoadingComponent />;

  return (
    <>
      {popupMessage && (
        <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
      )}
      <div className="">
        <div className="title">
          <h1><AutoTranslate>Report Review</AutoTranslate></h1>
        </div>

        {activeComponent === "A" && (
          <ReportReviewComponent 
            reports={pendingReports}
            onView={handleView} 
          />
        )}

        {activeComponent === "B" && (
          <ReviewComponent 
            documentHeaderId={selectedDocumentHeaderId}
            onView={handleFinalReview}
            onBack={handleBack}
          />
        )}

        {activeComponent === "C" && (
          <FinalReviewComponent 
            reportEntryId={selectedReportId}
            documentDetailId={selectedDocumentDetailId}
            onBack={handleBack}
          />
        )}
      </div>
    </>
  )
}

export default ReportReview;