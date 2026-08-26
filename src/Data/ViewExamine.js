import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST, MASTER_API } from "../API/apiConfig";

const ViewExamine = ({ documentHeaderId, onBack }) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [examinationMethods, setExaminationMethods] = useState([]);

  const [form, setForm] = useState({
    examinationStartDate: "",
    examinationEndDate: "",
    examinationMethodId: "",
    observations: "",
    scientificOpinion: "",
    examinationRemarks: "",
    reportDate: "",
    reportTitle: "",
    reportSummary: "",
  });

  const [scientificReportFile, setScientificReportFile] = useState(null);
  const [supportingFiles, setSupportingFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showPopup = (message, type = 'info') => {
    setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
  };

  useEffect(() => {
    fetchCase();
    fetchExaminationMethods();
  }, [documentHeaderId]);

  const fetchCase = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/report-entry/case/${documentHeaderId}`);
      const data = response.data;
      setCaseData(data);
      setIsSubmitted(data.reportStatus === "SUBMITTED");

      setForm({
        examinationStartDate: data.examinationStartDate || "",
        examinationEndDate: data.examinationEndDate || "",
        examinationMethodId: data.examinationMethodId ?? "",
        observations: data.observations || "",
        scientificOpinion: data.scientificOpinion || "",
        examinationRemarks: data.examinationRemarks || "",
        reportDate: data.reportDate || "",
        reportTitle: data.reportTitle || "",
        reportSummary: data.reportSummary || "",
      });
    } catch (error) {
      console.error("Error fetching case for report entry:", error);
      showPopup(
        error?.response?.data?.message || "Failed to load case details, or no evidence is assigned to you in this case.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExaminationMethods = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/examination-method/getAll/1`);
      setExaminationMethods(response.data || []);
    } catch (error) {
      console.error("Error fetching examination methods:", error);
      setExaminationMethods([]);
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildFormData = (statusValue) => {
    const fd = new FormData();
    fd.append("documentHeaderId", documentHeaderId);
    fd.append("examinationStartDate", form.examinationStartDate || "");
    fd.append("examinationEndDate", form.examinationEndDate || "");
    if (form.examinationMethodId) fd.append("examinationMethodId", form.examinationMethodId);
    fd.append("observations", form.observations || "");
    fd.append("scientificOpinion", form.scientificOpinion || "");
    fd.append("examinationRemarks", form.examinationRemarks || "");
    fd.append("reportDate", form.reportDate || "");
    fd.append("reportTitle", form.reportTitle || "");
    fd.append("reportSummary", form.reportSummary || "");
    fd.append("status", statusValue);
    if (scientificReportFile) fd.append("scientificReport", scientificReportFile);
    supportingFiles.forEach((f) => fd.append("supportingDocuments", f));
    return fd;
  };

  const submitReport = async (statusValue) => {
    if (statusValue === "SUBMITTED") {
      if (!form.examinationStartDate || !form.examinationEndDate) {
        showPopup("Please fill in the examination start and end dates.", "warning");
        return;
      }
      if (!form.examinationMethodId) {
        showPopup("Please select an examination method.", "warning");
        return;
      }
      if (!form.observations?.trim()) {
        showPopup("Please enter observations/findings.", "warning");
        return;
      }
      if (!form.scientificOpinion?.trim()) {
        showPopup("Please enter the scientific opinion.", "warning");
        return;
      }
      if (!form.reportTitle?.trim()) {
        showPopup("Please enter a report title.", "warning");
        return;
      }
      if (!form.reportSummary?.trim()) {
        showPopup("Please enter a report summary.", "warning");
        return;
      }
    }

    try {
      setSaving(true);
      const fd = buildFormData(statusValue);
      const response = await apiClient.post(`${API_HOST}/api/report-entry/save`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.status === 200) {
        showPopup(
          statusValue === "SUBMITTED" ? "Report submitted successfully." : "Draft saved successfully.",
          "success"
        );
        if (statusValue === "SUBMITTED") {
          setTimeout(() => onBack(), 800);
        } else {
          fetchCase();
        }
      } else {
        showPopup(response?.data?.message || "Failed to save report.", "error");
      }
    } catch (error) {
      console.error("Error saving report:", error);
      showPopup("Failed to save report: " + (error?.response?.data?.message || error.message), "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingComponent />;
  if (!caseData) return null;

  return (
    <>
      {popupMessage && (
        <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
      )}

      <div className="card">

        {/* Case & Evidence Information — read only */}
        <div className="cardLight mb-20">
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
              <label><AutoTranslate>Case Number</AutoTranslate></label>
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
              <label><AutoTranslate>Division</AutoTranslate></label>
              <input type="text" value={caseData.divisionName || ''} readOnly />
            </div>
          </div>

          {/* Evidence assigned to me in this case */}
          <div className="table-wrapper mb-4">
            <table>
              <thead>
                <tr>
                  <th><AutoTranslate>File Name</AutoTranslate></th>
                  <th><AutoTranslate>Evidence Category</AutoTranslate></th>
                  <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                  <th><AutoTranslate>Description</AutoTranslate></th>
                </tr>
              </thead>
              <tbody>
                {(caseData.myEvidenceList || []).map((row) => (
                  <tr key={row.documentDetailId}>
                    <td>{row.docName}</td>
                    <td>{row.evidenceCategory || '--'}</td>
                    <td>{row.evidenceType || '--'}</td>
                    <td>{row.evidenceDescription || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isSubmitted && (
          <div className="cardLight mb-20">
            <p className="text-green-700 font-medium">
              <AutoTranslate>This report has already been submitted and is read-only.</AutoTranslate>
            </p>
          </div>
        )}

        {/* Scientific Examination */}
        <div className="cardLight">
          <h2 className="flex align-center gap-2">
            <AutoTranslate>Scientific Examination</AutoTranslate> <span className="text-red-500">*</span>
          </h2>

          <div className="grid grid-col-4 mb-4">
            <div className="form-group">
              <label><AutoTranslate>Examination Start Date</AutoTranslate></label>
              <input
                type="date"
                value={form.examinationStartDate}
                onChange={(e) => handleFieldChange('examinationStartDate', e.target.value)}
                disabled={isSubmitted}
                required
              />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Examination End Date</AutoTranslate></label>
              <input
                type="date"
                value={form.examinationEndDate}
                onChange={(e) => handleFieldChange('examinationEndDate', e.target.value)}
                disabled={isSubmitted}
                required
              />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Examination Method</AutoTranslate></label>
              <select
                value={form.examinationMethodId}
                onChange={(e) => handleFieldChange('examinationMethodId', e.target.value)}
                disabled={isSubmitted}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {examinationMethods.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><AutoTranslate>Observations/Findings</AutoTranslate></label>
              <textarea
                rows="2"
                value={form.observations}
                onChange={(e) => handleFieldChange('observations', e.target.value)}
                disabled={isSubmitted}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label><AutoTranslate>Scientific Opinion</AutoTranslate></label>
              <textarea
                rows="2"
                value={form.scientificOpinion}
                onChange={(e) => handleFieldChange('scientificOpinion', e.target.value)}
                disabled={isSubmitted}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label><AutoTranslate>Examination Remarks</AutoTranslate></label>
              <textarea
                rows="2"
                value={form.examinationRemarks}
                onChange={(e) => handleFieldChange('examinationRemarks', e.target.value)}
                disabled={isSubmitted}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Report */}
        <div className="cardLight">
          <h2 className="flex align-center gap-2">
            <AutoTranslate>Report</AutoTranslate> <span className="text-red-500">*</span>
          </h2>

          <div className="grid grid-col-4 mb-4">
            <div className="form-group">
              <label><AutoTranslate>Report Date</AutoTranslate></label>
              <input
                type="date"
                value={form.reportDate}
                onChange={(e) => handleFieldChange('reportDate', e.target.value)}
                disabled={isSubmitted}
                required
              />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Report Title</AutoTranslate></label>
              <input
                type="text"
                value={form.reportTitle}
                onChange={(e) => handleFieldChange('reportTitle', e.target.value)}
                disabled={isSubmitted}
                required
              />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Report Summary</AutoTranslate></label>
              <textarea
                rows="2"
                value={form.reportSummary}
                onChange={(e) => handleFieldChange('reportSummary', e.target.value)}
                disabled={isSubmitted}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label><AutoTranslate>Scientific Report</AutoTranslate></label>
              {caseData.scientificReportPath && (
                <p className="text-xs text-gray-500 mb-1">
                  <AutoTranslate>Current file on record</AutoTranslate>: {caseData.scientificReportPath.split('/').pop()}
                </p>
              )}
              <input
                type="file"
                onChange={(e) => setScientificReportFile(e.target.files?.[0] || null)}
                disabled={isSubmitted}
              />
            </div>
            <div className="form-group">
              <label>
                <AutoTranslate>Supporting Documents</AutoTranslate>{" "}
                <span style={{ fontSize: "12px", color: "#861616" }}>Multi Upload</span>
              </label>
              {(caseData.attachments || []).length > 0 && (
                <ul className="text-xs text-gray-500 mb-1">
                  {caseData.attachments.map((a) => (
                    <li key={a.id}>{a.fileName}</li>
                  ))}
                </ul>
              )}
              <input
                type="file"
                multiple
                onChange={(e) => setSupportingFiles(Array.from(e.target.files || []))}
                disabled={isSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="btn-group">
          {!isSubmitted && (
            <>
              <button type="button" className="btn-primary" onClick={() => submitReport("DRAFT")} disabled={saving}>
                {saving ? <AutoTranslate>Saving...</AutoTranslate> : <AutoTranslate>Save Draft</AutoTranslate>}
              </button>
              <button type="button" className="btn-primary" onClick={() => submitReport("SUBMITTED")} disabled={saving}>
                {saving ? <AutoTranslate>Submitting...</AutoTranslate> : <AutoTranslate>Submit Report</AutoTranslate>}
              </button>
            </>
          )}
          <button type="button" className="btn btn-back" onClick={onBack}>
            <AutoTranslate>Back</AutoTranslate>
          </button>
        </div>

      </div>
    </>
  );
};

export default ViewExamine;