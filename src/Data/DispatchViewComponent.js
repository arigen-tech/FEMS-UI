import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST } from "../API/apiConfig";

const DispatchViewComponent = ({ reportEntryId, onBack }) => {
  const [dispatchData, setDispatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const [form, setForm] = useState({
    dispatchDate: "",
    dispatchReferenceNo: "",
    recipient: "",
    dispatchMode: "",
    dispatchRemarks: "",
    notifyEmail: false,
    notifySms: false,
  });
  const [dispatchDocument, setDispatchDocument] = useState(null);

  const showPopup = (message, type = 'info') => {
    setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
  };

  useEffect(() => {
    fetchDispatchDetail();
  }, [reportEntryId]);

  const fetchDispatchDetail = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/dispatch/report/${reportEntryId}`);
      const data = response.data;
      setDispatchData(data);

      setForm({
        dispatchDate: data.dispatchDate || "",
        dispatchReferenceNo: data.dispatchReferenceNo || "",
        recipient: data.recipient || "",
        dispatchMode: data.dispatchMode || "",
        dispatchRemarks: data.dispatchRemarks || "",
        notifyEmail: !!data.notifyEmail,
        notifySms: !!data.notifySms,
      });
    } catch (error) {
      console.error("Error fetching dispatch detail:", error);
      showPopup("Failed to load dispatch details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const fd = new FormData();
      fd.append("reportEntryId", reportEntryId);
      fd.append("dispatchDate", form.dispatchDate || "");
      fd.append("dispatchReferenceNo", form.dispatchReferenceNo || "");
      fd.append("recipient", form.recipient || "");
      fd.append("dispatchMode", form.dispatchMode || "");
      fd.append("dispatchRemarks", form.dispatchRemarks || "");
      fd.append("notifyEmail", form.notifyEmail);
      fd.append("notifySms", form.notifySms);
      if (dispatchDocument) fd.append("dispatchDocument", dispatchDocument);

      const response = await apiClient.post(`${API_HOST}/api/dispatch/save`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.status === 200) {
        showPopup("Dispatch saved successfully.", "success");
        setTimeout(() => onBack(), 800);
      } else {
        showPopup(response?.data?.message || "Failed to save dispatch.", "error");
      }
    } catch (error) {
      console.error("Error saving dispatch:", error);
      showPopup("Failed to save dispatch: " + (error?.response?.data?.message || error.message), "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingComponent />;
  if (!dispatchData) return null;

  return (
    <div className="card">
      {popupMessage && (
        <Popup message={popupMessage.message} type={popupMessage.type} onClose={popupMessage.onClose} />
      )}

      <div className="cardLight mb-20">
        <div className='btnBackTop'>
          <button type="button" className="btnBack" onClick={onBack}></button>
        </div>

        <div className="grid grid-col-4 mb-4">
          <div className="form-group">
            <label><AutoTranslate>Case Number</AutoTranslate></label>
            <input type="text" value={dispatchData.caseNumber || ''} readOnly />
          </div>
          <div className="form-group">
            <label><AutoTranslate>FIR Number</AutoTranslate></label>
            <input type="text" value={dispatchData.firNumber || ''} readOnly />
          </div>
          <div className="form-group">
            <label><AutoTranslate>Forwarding Authority</AutoTranslate></label>
            <input type="text" value={dispatchData.forwardingAuthorityName || ''} readOnly />
          </div>

          <div className="form-group">
            <label><AutoTranslate>Dispatch Date</AutoTranslate></label>
            <input
              type="date"
              value={form.dispatchDate}
              onChange={(e) => handleFieldChange('dispatchDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><AutoTranslate>Dispatch Reference No.</AutoTranslate></label>
            <input
              type="text"
              value={form.dispatchReferenceNo}
              onChange={(e) => handleFieldChange('dispatchReferenceNo', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label><AutoTranslate>Recipient</AutoTranslate></label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => handleFieldChange('recipient', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label><AutoTranslate>Dispatch Mode</AutoTranslate></label>
            <select
              value={form.dispatchMode}
              onChange={(e) => handleFieldChange('dispatchMode', e.target.value)}
            >
              <option value=""><AutoTranslate>Select</AutoTranslate></option>
              <option value="Courier"><AutoTranslate>Courier</AutoTranslate></option>
              <option value="SMS"><AutoTranslate>SMS</AutoTranslate></option>
              <option value="Email"><AutoTranslate>Email</AutoTranslate></option>
            </select>
          </div>
          <div className="form-group">
            <label><AutoTranslate>Dispatch Document</AutoTranslate></label>
            {dispatchData.dispatchDocumentPath && (
              <p className="text-xs text-gray-500 mb-1">
                <AutoTranslate>Current file</AutoTranslate>: {dispatchData.dispatchDocumentPath.split(/[\\/]/).pop()}
              </p>
            )}
            <input
              type="file"
              onChange={(e) => setDispatchDocument(e.target.files?.[0] || null)}
            />
          </div>

          <div className="form-group col-span-2">
            <label><AutoTranslate>Dispatch Remarks</AutoTranslate></label>
            <textarea
              rows="2"
              value={form.dispatchRemarks}
              onChange={(e) => handleFieldChange('dispatchRemarks', e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label><AutoTranslate>Notification</AutoTranslate></label>
            <div className='checkboxGroup mt-12'>
              <label className="checkBox" htmlFor="emailId">
                <input
                  type="checkbox"
                  id="emailId"
                  checked={form.notifyEmail}
                  onChange={(e) => handleFieldChange('notifyEmail', e.target.checked)}
                />
                <span>Email</span>
              </label>
              <label className="checkBox" htmlFor="smsId">
                <input
                  type="checkbox"
                  id="smsId"
                  checked={form.notifySms}
                  onChange={(e) => handleFieldChange('notifySms', e.target.checked)}
                />
                <span>SMS</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-group">
        <button type="button" className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <AutoTranslate>Saving...</AutoTranslate> : <AutoTranslate>Save</AutoTranslate>}
        </button>
        <button type="button" className="btn btn-back" onClick={onBack}>
          <AutoTranslate>Back</AutoTranslate>
        </button>
      </div>
    </div>
  )
}

export default DispatchViewComponent;