import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from '../API/apiClient';
import { MASTER_API } from '../API/apiConfig';

const ForwardingAuthorityDetails = ({ formData = {}, onChange, onViewForwardingLetter }) => {
  const [authorityTypes, setAuthorityTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const [emailError, setEmailError] = useState('');

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

  const validateMobile = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value.slice(0, 10);
  };

  // ✅ Real email format check
  const isValidEmailFormat = (value) => {
    if (!value) return true; // let `required` handle empty
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  // ✅ Strip spaces (kept from original) + validate format + set error message
  const validateEmail = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    e.target.value = value;

    if (value && !isValidEmailFormat(value)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com).');
    } else {
      setEmailError('');
    }
  };

  // ✅ Extra check on blur (catches pasted values)
  const handleEmailBlur = (e) => {
    if (e.target.value && !isValidEmailFormat(e.target.value)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com).');
    }
  };

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
          <input type="text" placeholder='Enter your authority name' value={formData.authorityName || ''} onChange={handleChange('authorityName')} maxLength="30" required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Designation</AutoTranslate></label>
          <input type="text" placeholder='Enter your designation' value={formData.designation || ''} onChange={handleChange('designation')} maxLength="30" required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Organisation </AutoTranslate></label>
          <input type="text" placeholder='Enter your organisation' value={formData.organisation || ''} onChange={handleChange('organisation')} maxLength="30" required />
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
          <textarea rows="2" placeholder='Enter your address' value={formData.address || ''} onChange={handleChange('address')} maxLength="250"></textarea>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Contact Number</AutoTranslate></label>
          <input
            type="tel"
            placeholder='Enter your contact number'
            value={formData.contactNumber || ''}
            onChange={handleChange('contactNumber')}
            maxlength="10"
            inputmode="numeric"
            pattern="[0-9]{10}"
            onInput={validateMobile}  
            required
          />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Email</AutoTranslate></label>
          <input 
          type="email"
          name="email"
          placeholder='Enter your valid email' 
          value={formData.email || ''} 
          onChange={handleChange('email')} 
          onInput={validateEmail}
          onBlur={handleEmailBlur}
          className={emailError ? 'border-red-500 focus:border-red-500' : ''}
          required
           />
          {emailError && (
            <p className="text-xs text-red-500 mt-1">{emailError}</p>
          )}
        </div> 

        <div className="form-group">
          <label><AutoTranslate>Forwarding Letter Number</AutoTranslate></label>
          <input type="text" placeholder='Enter your forwarding letter number' value={formData.forwardingLetterNumber || ''} onChange={handleChange('forwardingLetterNumber')} maxLength="30" required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Forwarding Date</AutoTranslate></label>
          <input type="date" value={formData.forwardingDate || ''} onChange={handleChange('forwardingDate')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Forwarding Letter</AutoTranslate></label>

          {hasExistingLetter && (
            <div className="mb-1 text-sm">
              <button
                type="button"
                onClick={() => onViewForwardingLetter(formData.id)}
                className="text-blue-600 underline"
              >
                📄 <AutoTranslate>View current file</AutoTranslate>
              </button>
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
              <input type="text" placeholder='Enter Courier Agency' value={formData.courierAgency || ''} onChange={handleChange('courierAgency')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>AWB / Consignment Number</AutoTranslate></label>
              <input type="text" placeholder='Enter AWB/consignment number' value={formData.awbNumber || ''} onChange={handleChange('awbNumber')} maxLength="30" required />
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
              <input type="text" placeholder='Enter parcel ID' value={formData.parcelId || ''} onChange={handleChange('parcelId')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Parcel Number</AutoTranslate></label>
              <input type="text" placeholder='Enter parcel number' value={formData.parcelNumber || ''} onChange={handleChange('parcelNumber')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Number of Exhibits</AutoTranslate></label>
              <input type="text" placeholder='Enter number of exhibits' value={formData.numberOfExhibits || ''} onChange={handleChange('numberOfExhibits')} maxLength="30" required />
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
              <input type="text" placeholder='Enter seal number' value={formData.sealNumber || ''} onChange={handleChange('sealNumber')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Description</AutoTranslate></label>
              <textarea rows="2" placeholder='Enter seal description' value={formData.sealDescription || ''} onChange={handleChange('sealDescription')} maxLength="250"></textarea>
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Condition </AutoTranslate></label>
              <input type="text" placeholder='Enter seal condition' value={formData.sealCondition || ''} onChange={handleChange('sealCondition')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Package Condition </AutoTranslate></label>
              <input type="text" placeholder='Enter package condition' value={formData.packageCondition || ''} onChange={handleChange('packageCondition')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received Date </AutoTranslate></label>
              <input type="date" value={formData.receivedDate || ''} onChange={handleChange('receivedDate')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received Time</AutoTranslate></label>
              <input type="text" placeholder='Enter received time' value={formData.receivedTime || ''} onChange={handleChange('receivedTime')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Received By </AutoTranslate></label>
              <input type="text" placeholder='Enter received by' value={formData.receivedBy || ''} onChange={handleChange('receivedBy')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Remarks</AutoTranslate></label>
              <textarea rows="2" placeholder='Enter your remarks' value={formData.forwardingRemarks || ''} onChange={handleChange('forwardingRemarks')} maxLength="250" required></textarea>
            </div>
          </>
        )}

        {isMessenger && (
          <>
            <div className="form-group">
              <label><AutoTranslate>Messenger Name</AutoTranslate></label>
              <input type="text" placeholder='Enter messenger name' value={formData.messengerName || ''} onChange={handleChange('messengerName')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Designation</AutoTranslate></label>
              <input type="text" placeholder='Enter your designation' value={formData.messengerDesignation || ''} onChange={handleChange('messengerDesignation')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Organization </AutoTranslate></label>
              <input type="text" placeholder='Enter your organization' value={formData.messengerOrganization || ''} onChange={handleChange('messengerOrganization')} maxLength="30" required />
            </div>

            <div className="form-group">
              <label><AutoTranslate>ID / Reference Number</AutoTranslate></label>
              <input type="text" placeholder='Enter ID/reference number' value={formData.messengerIdRef || ''} onChange={handleChange('messengerIdRef')} maxLength="30" required />
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