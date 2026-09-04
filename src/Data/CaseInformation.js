import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from '../API/apiClient';
import { MASTER_API } from '../API/apiConfig';

const CaseInformation = ({ formData = {}, onChange }) => {
  const [caseTypes, setCaseTypes] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [districtsLoading, setDistrictsLoading] = useState(false);

  useEffect(() => {
    apiClient.get(`${MASTER_API}/case-type/getAll/1`)
      .then((res) => setCaseTypes(res.data || []))
      .catch((err) => {
        console.error('Failed to load case types:', err);
        setCaseTypes([]);
      });

    apiClient.get(`${MASTER_API}/crime-type/getAll/1`)
      .then((res) => setCrimeTypes(res.data || []))
      .catch((err) => {
        console.error('Failed to load crime types:', err);
        setCrimeTypes([]);
      });

    apiClient.get(`${MASTER_API}/state/getAll/1`)
      .then((res) => setStates(res.data || []))
      .catch((err) => {
        console.error('Failed to load states:', err);
        setStates([]);
      });

    apiClient.get(`${MASTER_API}/priority/getAll/1`)
      .then((res) => setPriorities(res.data || []))
      .catch((err) => {
        console.error('Failed to load priorities:', err);
        setPriorities([]);
      });
  }, []);

  // Districts depend on which State is currently selected
  useEffect(() => {
    if (!formData.stateId) {
      setDistricts([]);
      return;
    }
    let cancelled = false;
    setDistrictsLoading(true);
    apiClient
      .get(`${MASTER_API}/district/getByParent/${formData.stateId}/1`)
      .then((res) => {
        if (!cancelled) setDistricts(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to load districts:', err);
        if (!cancelled) setDistricts([]);
      })
      .finally(() => {
        if (!cancelled) setDistrictsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [formData.stateId]);

  const handleChange = (field) => (e) => onChange(field, e.target.value);

  const handleStateChange = (e) => {
    onChange('stateId', e.target.value);
    onChange('districtId', ''); // district belonged to the previous state
  };

  return (
    <div className="cardLight">
      <h2 className="flex align-center gap-2">📝 <AutoTranslate>Case Information</AutoTranslate> <span className="text-red-500">*</span></h2>

      <div className="grid grid-col-4 mb-4">
        {/* <div className="form-group">
          <label><AutoTranslate>Case ID</AutoTranslate></label>
          <input type="text" value={formData.caseId || ''} onChange={handleChange('caseId')} required />
        </div> */}
        <div className="form-group">
          <label><AutoTranslate>Case Number</AutoTranslate></label>
          <input type="text" placeholder='Enter case number' value={formData.fileNo || ''} onChange={handleChange('fileNo')} maxLength="30" />
        </div>
        <div className="form-group">
          <label><AutoTranslate>Case Title</AutoTranslate></label>
          <input type="text" placeholder='Enter case title' value={formData.title || ''} onChange={handleChange('title')} maxLength="30" required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>FIR Number</AutoTranslate></label>
          <input type="text" placeholder='Enter FIR number' value={formData.firNumber || ''} onChange={handleChange('firNumber')} maxLength="30" required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>FIR Date</AutoTranslate></label>
          <input type="date" value={formData.firDate || ''} onChange={handleChange('firDate')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Case Type</AutoTranslate></label>
          <select value={formData.caseTypeId || ''} onChange={handleChange('caseTypeId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {caseTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label><AutoTranslate>Crime Type</AutoTranslate></label>
          <select value={formData.crimeTypeId || ''} onChange={handleChange('crimeTypeId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {crimeTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>State</AutoTranslate></label>
          <select value={formData.stateId || ''} onChange={handleStateChange}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {states.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}{item.code ? ` (${item.code})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label><AutoTranslate>District</AutoTranslate></label>
          <select
            value={formData.districtId || ''}
            onChange={handleChange('districtId')}
            disabled={!formData.stateId || districtsLoading}
          >
            <option value="">{!formData.stateId ? 'Select State first' : 'Select'}</option>
            {districts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}{item.code ? ` (${item.code})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label><AutoTranslate>Police Station</AutoTranslate></label>
          <input type="text" placeholder='Enter police station' value={formData.policeStation || ''} onChange={handleChange('policeStation')} maxLength="30" required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Investigating Officer</AutoTranslate></label>
          <input type="text" placeholder='Enter investigating officer' value={formData.investigatingOfficer || ''} onChange={handleChange('investigatingOfficer')} maxLength="30" required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>Court Reference</AutoTranslate></label>
          <input type="text" placeholder='Enter court reference' value={formData.courtReference || ''} onChange={handleChange('courtReference')} maxLength="30" required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Priority </AutoTranslate></label>
          <select value={formData.priorityId || ''} onChange={handleChange('priorityId')}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {priorities.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Date of Incident</AutoTranslate></label>
          <input type="date" value={formData.dateOfIncident || ''} onChange={handleChange('dateOfIncident')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Incident Location</AutoTranslate></label>
          <input type="text" placeholder='Enter incident location' value={formData.incidentLocation || ''} onChange={handleChange('incidentLocation')} maxLength="30" required />
        </div>
      </div>
    </div>
  );
};

export default CaseInformation;