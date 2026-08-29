import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from '../API/apiClient';
import { MASTER_API, API_HOST } from '../API/apiConfig';

const ForwardingAuthorityDetails = ({ formData = {}, onChange }) => {
  const [authorityTypes, setAuthorityTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);

  useEffect(() => {
    apiClient.get(`${MASTER_API}/forwarding-authority-type/getAll/1`)
      .then((res) => setAuthorityTypes(res.data || []))
      .catch((err) => {
        console.error('Failed to load authority types:', err);
        setAuthorityTypes([]);
      });

    apiClient.get(`${MASTER_API}/district/getAll/1`)
      .then((res) => setDistricts(res.data || []))
      .catch((err) => {
        console.error('Failed to load districts:', err);
        setDistricts([]);
      });

    apiClient.get(`${MASTER_API}/mode-of-submission/getAll/1`)
      .then((res) => setModeOptions(res.data || []))
      .catch((err) => {
        console.error('Failed to load submission modes:', err);
        setModeOptions([]);
      });

    apiClient.get(`${MASTER_API}/package-type/getAll/1`)
      .then((res) => setPackageTypes(res.data || []))
      .catch((err) => {
        console.error('Failed to load package types:', err);
        setPackageTypes([]);
      });
  }, []);

  const handleChange = (field) => (e) => onChange(field, e.target.value);

  const handleFileChange = (e) => {
    onChange('forwardingLetterFile', e.target.files?.[0] || null);
  };

  const selectedModeName = (
    modeOptions.find((m) => String(m.id) === String(formData.modeOfSubmissionId))?.name || ''
  ).toLowerCase();
  const isCourier = selectedModeName.includes('courier');
  const isMessenger = selectedModeName.includes('messenger');

  const hasExistingLetter = Boolean(formData.forwardingLetterPath) && !formData.forwardingLetterFile;

  return (
    <div className="cardLight">
      <h2 className="flex align-center gap-2">
        📤 <AutoTranslate>Forwarding Authority Details</AutoTranslate> <span className="text-red-500">*</span>
      </h2>

      <div className="grid grid-col-4 mb-4">

        <div className="form-group">
          <label><AutoTranslate>Forwarding Authority Type</AutoTranslate></label>
          <select value={formData.forwardingAuthorityTypeId || ''} onChange={handleChange('forwardingAuthorityTypeId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {authorityTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Authority Name</AutoTranslate></label>
          <input type="text" value={formData.authorityName || ''} onChange={handleChange('authorityName')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Designation</AutoTranslate></label>
          <input type="text" value={formData.designation || ''} onChange={handleChange('designation')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Organisation </AutoTranslate></label>
          <input type="text" value={formData.organisation || ''} onChange={handleChange('organisation')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>District </AutoTranslate></label>
          <select value={formData.forwardingDistrictId || ''} onChange={handleChange('forwardingDistrictId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {districts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}{item.code ? ` (${item.code})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Address </AutoTranslate></label>
          <textarea rows="2" value={formData.address || ''} onChange={handleChange('address')}></textarea>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Contact Number</AutoTranslate></label>
          <input type="text" value={formData.contactNumber || ''} onChange={handleChange('contactNumber')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Email</AutoTranslate></label>
          <input type="email" value={formData.email || ''} onChange={handleChange('email')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Forwarding Letter Number</AutoTranslate></label>
          <input type="text" value={formData.forwardingLetterNumber || ''} onChange={handleChange('forwardingLetterNumber')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Forwarding Date</AutoTranslate></label>
          <input type="date" value={formData.forwardingDate || ''} onChange={handleChange('forwardingDate')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Forwarding Letter</AutoTranslate></label>

          {hasExistingLetter && (
            <div className="mb-1 text-sm">
              <a
                href={`${API_HOST}/api/documents/download/${formData.forwardingLetterPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                📄 <AutoTranslate>View current file</AutoTranslate>
              </a>
              <span className="text-gray-400 ml-2">
                <AutoTranslate>Choose a new file below to replace it</AutoTranslate>
              </span>
            </div>
          )}

          <input
            type="file"
            onChange={handleFileChange}
            required={!formData.forwardingLetterPath}
          />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Mode of Submission</AutoTranslate></label>
          <select value={formData.modeOfSubmissionId || ''} onChange={handleChange('modeOfSubmissionId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {modeOptions.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        {isCourier && (
          <>
            <div className="form-group">
              <label><AutoTranslate>Courier Agency</AutoTranslate></label>
              <input type="text" value={formData.courierAgency || ''} onChange={handleChange('courierAgency')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>AWB / Consignment Number</AutoTranslate></label>
              <input type="text" value={formData.awbNumber || ''} onChange={handleChange('awbNumber')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Booking Date </AutoTranslate></label>
              <input type="date" value={formData.bookingDate || ''} onChange={handleChange('bookingDate')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Dispatch Date</AutoTranslate></label>
              <input type="date" value={formData.dispatchDate || ''} onChange={handleChange('dispatchDate')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Expected Delivery Date </AutoTranslate></label>
              <input type="date" value={formData.expectedDeliveryDate || ''} onChange={handleChange('expectedDeliveryDate')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Actual Delivery Date </AutoTranslate></label>
              <input type="date" value={formData.actualDeliveryDate || ''} onChange={handleChange('actualDeliveryDate')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Parcel ID</AutoTranslate></label>
              <input type="text" value={formData.parcelId || ''} onChange={handleChange('parcelId')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Parcel Number</AutoTranslate></label>
              <input type="text" value={formData.parcelNumber || ''} onChange={handleChange('parcelNumber')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Number of Exhibits</AutoTranslate></label>
              <input type="text" value={formData.numberOfExhibits || ''} onChange={handleChange('numberOfExhibits')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Package Type </AutoTranslate></label>
              <select value={formData.packageTypeId || ''} onChange={handleChange('packageTypeId')}>
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {packageTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Number </AutoTranslate></label>
              <input type="text" value={formData.sealNumber || ''} onChange={handleChange('sealNumber')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Description</AutoTranslate></label>
              <textarea rows="2" value={formData.sealDescription || ''} onChange={handleChange('sealDescription')}></textarea>
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Condition </AutoTranslate></label>
              <input type="text" value={formData.sealCondition || ''} onChange={handleChange('sealCondition')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Package Condition </AutoTranslate></label>
              <input type="text" value={formData.packageCondition || ''} onChange={handleChange('packageCondition')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received Date </AutoTranslate></label>
              <input type="date" value={formData.receivedDate || ''} onChange={handleChange('receivedDate')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received Time</AutoTranslate></label>
              <input type="text" value={formData.receivedTime || ''} onChange={handleChange('receivedTime')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received By </AutoTranslate></label>
              <input type="text" value={formData.receivedBy || ''} onChange={handleChange('receivedBy')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Remarks</AutoTranslate></label>
              <textarea rows="2" value={formData.forwardingRemarks || ''} onChange={handleChange('forwardingRemarks')} required></textarea>
            </div>
          </>
        )}

        {isMessenger && (
          <>
            <div className="form-group">
              <label><AutoTranslate>Messenger Name</AutoTranslate></label>
              <input type="text" value={formData.messengerName || ''} onChange={handleChange('messengerName')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Designation</AutoTranslate></label>
              <input type="text" value={formData.messengerDesignation || ''} onChange={handleChange('messengerDesignation')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Organization </AutoTranslate></label>
              <input type="text" value={formData.messengerOrganization || ''} onChange={handleChange('messengerOrganization')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>ID / Reference Number</AutoTranslate></label>
              <input type="text" value={formData.messengerIdRef || ''} onChange={handleChange('messengerIdRef')} required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Date & Time of Handover</AutoTranslate></label>
              <input type="date" value={formData.handoverDateTime || ''} onChange={handleChange('handoverDateTime')} required />
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default ForwardingAuthorityDetails;