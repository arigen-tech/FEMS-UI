import React, { useState, useEffect, useCallback } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from "../API/apiClient";
import LoadingComponent from '../Components/LoadingComponent';
import Popup from '../Components/Popup';
import { API_HOST, DEPAETMENT_API, MASTER_API } from "../API/apiConfig";

const PreExamineForm = ({ documentHeaderId, onBack }) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const [divisions, setDivisions] = useState([]);
  const [employees, setEmployees] = useState({}); // keyed by divisionId
  const [crimeTypeOptions, setCrimeTypeOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [natureOfExamOptions, setNatureOfExamOptions] = useState([]);
  const [sealStatusOptions, setSealStatusOptions] = useState([]);
  const [parcelConditionOptions, setParcelConditionOptions] = useState([]);

  const [form, setForm] = useState({
    purposeId: "",
    natureOfExaminationId: "",
    noOfParcels: "",
    noOfExhibits: "",
    natureOfCase: "",
    crimeTypeId: "",
    priorityId: "",
    sealStatusId: "",
    sealVerificationRemarks: "",
    parcelConditionId: "",
    parcelConditionOther: "",
  });

  const [assignments, setAssignments] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const showPopup = (message, type = 'info') => {
    setPopupMessage({ message, type, onClose: () => setPopupMessage(null) });
  };

  // Decode JWT token to get employee ID
  const getEmployeeIdFromToken = () => {
    try {
      const token = localStorage.getItem('tokenKey') || sessionStorage.getItem('tokenKey');
      if (!token) {
        console.warn("No token found");
        return null;
      }
      
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedToken = JSON.parse(jsonPayload);
      console.log("Decoded token:", decodedToken);
      
      return decodedToken.employeeId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Fetch current user's branch ID using employee endpoint
  const fetchCurrentUserBranchId = async () => {
    try {
      const employeeId = getEmployeeIdFromToken();
      if (!employeeId) {
        console.warn("No employee ID found in token");
        return null;
      }
      
      console.log("Fetching employee details for ID:", employeeId);
      
      const response = await apiClient.get(`${API_HOST}/employee/findById/${employeeId}`);
      
      if (response.data && response.data.branch) {
        const branchId = response.data.branch.id;
        console.log("Branch ID found:", branchId);
        return branchId;
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching current user branch:", error);
      return null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      fetchCase();
      fetchCrimeTypes();
      fetchPriorities();
      fetchPurposes();
      fetchNatureOfExam();
      fetchSealStatuses();
      fetchParcelConditions();
      await fetchDivisions();
    };
    
    initialize();
  }, [documentHeaderId]);

  const fetchCase = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_HOST}/api/pre-examination/case/${documentHeaderId}`);
      const data = response.data;
      setCaseData(data);

      const initAssignments = {};
      (data.evidenceList || []).forEach((row) => {
        initAssignments[row.documentDetailId] = {
          divisionId: row.assignedDivisionId || "",
          employeeId: row.assignedEmployeeId || "",
          remark: row.assignmentRemark || "",
        };
        
        if (row.assignedDivisionId) {
          fetchEmployeesForDivision(row.assignedDivisionId);
        }
      });
      setAssignments(initAssignments);

      setForm({
        purposeId: data.purposeId ?? "",
        natureOfExaminationId: data.natureOfExaminationId ?? "",
        noOfParcels: data.noOfParcels ?? "",
        noOfExhibits: data.noOfExhibits ?? (data.evidenceList?.length || ""),
        natureOfCase: data.natureOfCase || "",
        crimeTypeId: data.crimeTypeId ?? "",
        priorityId: data.examPriorityId ?? "",
        sealStatusId: data.sealStatusId ?? "",
        sealVerificationRemarks: data.sealVerificationRemarks || "",
        parcelConditionId: data.parcelConditionId ?? "",
        parcelConditionOther: data.parcelConditionOther || "",
      });
    } catch (error) {
      console.error("Error fetching case for pre-examination:", error);
      showPopup("Failed to load case details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async () => {
    try {
      const branchId = await fetchCurrentUserBranchId();
      
      if (!branchId) {
        console.warn("No branch ID found for current user");
        setDivisions([]);
        return;
      }
      
      console.log("Fetching departments for branch:", branchId);
      
      const response = await apiClient.get(`${DEPAETMENT_API}/findByBranch/${branchId}`);
      setDivisions(response.data || []);
    } catch (error) {
      console.error("Error fetching divisions:", error);
      setDivisions([]);
    }
  };

  const fetchEmployeesForDivision = useCallback(async (divisionId) => {
    if (!divisionId) return;
    
    try {
      const response = await apiClient.get(`${API_HOST}/api/pre-examination/employees/scientific-officers/${divisionId}`);
      const employeesList = response.data || [];
      
      setEmployees(prev => ({
        ...prev,
        [divisionId]: employeesList
      }));
    } catch (error) {
      console.error(`Error fetching employees for division ${divisionId}:`, error);
      
      try {
        const fallbackResponse = await apiClient.get(`${API_HOST}/employee/department/${divisionId}`);
        if (fallbackResponse.data && fallbackResponse.data.response) {
          const employeesList = fallbackResponse.data.response || [];
          setEmployees(prev => ({
            ...prev,
            [divisionId]: employeesList
          }));
        }
      } catch (fallbackError) {
        console.error(`Fallback also failed for division ${divisionId}:`, fallbackError);
        setEmployees(prev => ({
          ...prev,
          [divisionId]: []
        }));
      }
    }
  }, []);

  const fetchCrimeTypes = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/crime-type/getAll/1`);
      setCrimeTypeOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching crime types:", error);
      setCrimeTypeOptions([]);
    }
  };

  const fetchPriorities = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/priority/getAll/1`);
      setPriorityOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching priorities:", error);
      setPriorityOptions([]);
    }
  };

  const fetchPurposes = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/purpose/getAll/1`);
      setPurposeOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching purposes:", error);
      setPurposeOptions([]);
    }
  };

  const fetchNatureOfExam = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/nature-of-examination/getAll/1`);
      setNatureOfExamOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching nature of examination options:", error);
      setNatureOfExamOptions([]);
    }
  };

  const fetchSealStatuses = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/seal-status/getAll/1`);
      setSealStatusOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching seal statuses:", error);
      setSealStatusOptions([]);
    }
  };

  const fetchParcelConditions = async () => {
    try {
      const response = await apiClient.get(`${MASTER_API}/parcel-condition/getAll/1`);
      setParcelConditionOptions(response.data || []);
    } catch (error) {
      console.error("Error fetching parcel conditions:", error);
      setParcelConditionOptions([]);
    }
  };

  // Validation functions
  const validateField = (field, value) => {
    switch (field) {
      case 'natureOfCase':
        if (!value?.trim()) return "Nature of case is required";
        if (value.trim().length < 10) return "Nature of case must be at least 10 characters";
        return "";
      case 'sealStatusId':
        if (!value) return "Seal status is required";
        return "";
      case 'parcelConditionId':
        if (!value) return "Parcel condition is required";
        return "";
      case 'sealVerificationRemarks':
        if (showSealRemarks && !value?.trim()) return "Verification remarks are required";
        return "";
      case 'parcelConditionOther':
        if (showParcelOther && !value?.trim()) return "Other condition specification is required";
        return "";
      case 'purposeId':
        if (!value) return "Purpose is required";
        return "";
      case 'natureOfExaminationId':
        if (!value) return "Nature of examination is required";
        return "";
      case 'crimeTypeId':
        if (!value) return "Nature of crime is required";
        return "";
      case 'priorityId':
        if (!value) return "Priority is required";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Validate on change if field was touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Auto-fill Parcel Condition from Seal Status
  const handleSealStatusChange = (value) => {
    const selected = sealStatusOptions.find((s) => String(s.id) === String(value));
    setForm((prev) => ({
      ...prev,
      sealStatusId: value,
      parcelConditionId: selected?.defaultParcelConditionId
        ? String(selected.defaultParcelConditionId)
        : prev.parcelConditionId,
    }));
    
    // Validate seal status
    if (touched.sealStatusId) {
      const error = validateField('sealStatusId', value);
      setErrors(prev => ({ ...prev, sealStatusId: error }));
    }
    
    // Clear parcel condition error if auto-filled
    if (selected?.defaultParcelConditionId) {
      setErrors(prev => ({ ...prev, parcelConditionId: "" }));
    }
  };

  const selectedSealStatus = sealStatusOptions.find(
    (s) => String(s.id) === String(form.sealStatusId)
  );
  const selectedParcelCondition = parcelConditionOptions.find(
    (p) => String(p.id) === String(form.parcelConditionId)
  );
  const showSealRemarks = !!selectedSealStatus?.requiresVerificationRemarks;
  const showParcelOther = selectedParcelCondition?.name?.trim().toLowerCase() === "other";
  
  // Check if parcel condition was auto-filled from seal status
  const isParcelConditionAutoFilled = !!selectedSealStatus?.defaultParcelConditionId;

  const handleDivisionChange = (detailId, divisionId) => {
    setAssignments((prev) => ({
      ...prev,
      [detailId]: { 
        ...prev[detailId], 
        divisionId,
        employeeId: "" // Reset employee when division changes
      },
    }));
    
    if (divisionId) {
      fetchEmployeesForDivision(divisionId);
    }
  };

  const handleAssignmentChange = (detailId, field, value) => {
    setAssignments((prev) => ({
      ...prev,
      [detailId]: { ...prev[detailId], [field]: value },
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    const fieldsToValidate = [
      'natureOfCase',
      'sealStatusId',
      'parcelConditionId',
      'purposeId',
      'natureOfExaminationId',
      'crimeTypeId',
      'priorityId'
    ];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    
    // Conditional validations
    if (showSealRemarks) {
      const error = validateField('sealVerificationRemarks', form.sealVerificationRemarks);
      if (error) newErrors.sealVerificationRemarks = error;
    }
    
    if (showParcelOther) {
      const error = validateField('parcelConditionOther', form.parcelConditionOther);
      if (error) newErrors.parcelConditionOther = error;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    // Validate all fields
    if (!validateAll()) {
      showPopup("Please fill in all required fields correctly.", "warning");
      return;
    }

    const payload = {
      documentHeaderId,
      purposeId: form.purposeId ? parseInt(form.purposeId, 10) : null,
      natureOfExaminationId: form.natureOfExaminationId ? parseInt(form.natureOfExaminationId, 10) : null,
      noOfParcels: form.noOfParcels ? parseInt(form.noOfParcels, 10) : null,
      noOfExhibits: form.noOfExhibits ? parseInt(form.noOfExhibits, 10) : null,
      natureOfCase: form.natureOfCase,
      crimeTypeId: form.crimeTypeId ? parseInt(form.crimeTypeId, 10) : null,
      priorityId: form.priorityId ? parseInt(form.priorityId, 10) : null,
      sealStatusId: form.sealStatusId ? parseInt(form.sealStatusId, 10) : null,
      sealVerificationRemarks: form.sealVerificationRemarks || null,
      parcelConditionId: form.parcelConditionId ? parseInt(form.parcelConditionId, 10) : null,
      parcelConditionOther: form.parcelConditionOther || null,
      assignments: Object.entries(assignments).map(([detailId, a]) => ({
        documentDetailId: parseInt(detailId, 10),
        divisionId: a.divisionId ? parseInt(a.divisionId, 10) : null,
        employeeId: a.employeeId ? parseInt(a.employeeId, 10) : null,
        remark: a.remark || null,
      })),
    };

    try {
      setSaving(true);
      const response = await apiClient.post(`${API_HOST}/api/pre-examination/save`, payload);
      if (response?.data?.status === 200) {
        showPopup("Pre-examination saved successfully.", "success");
        setTimeout(() => onBack(), 800);
      } else {
        showPopup(response?.data?.message || "Failed to save pre-examination.", "error");
      }
    } catch (error) {
      console.error("Error saving pre-examination:", error);
      showPopup("Failed to save pre-examination: " + (error?.response?.data?.message || error.message), "error");
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
        {/* Case Details section - Read Only */}
        <div className="cardLight mb-20">
          <div className='btnBackTop'>
            <button type="button" className="btnBack" onClick={onBack}></button>
            <h2><AutoTranslate>Case Details</AutoTranslate></h2>
          </div>

          <div className="grid grid-col-4 mb-4">
            <div className="form-group">
              <label><AutoTranslate>Case Number</AutoTranslate></label>
              <input type="text" value={caseData.fileNo || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Case Title</AutoTranslate></label>
              <input type="text" value={caseData.title || ''} readOnly />
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
              <label><AutoTranslate>Incident Date</AutoTranslate></label>
              <input type="text" value={caseData.dateOfIncident ? new Date(caseData.dateOfIncident).toLocaleDateString('en-GB') : ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Incident Location</AutoTranslate></label>
              <input type="text" value={caseData.incidentLocation || ''} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Case Priority</AutoTranslate></label>
              <input type="text" value={caseData.priorityName || '--'} readOnly />
            </div>
            <div className="form-group">
              <label><AutoTranslate>Case Status</AutoTranslate></label>
              <input type="text" value={caseData.caseStatus || ''} readOnly />
            </div>
          </div>
        </div>

        {/* Forwarding Authority section - Read Only */}
        {caseData.forwardingAuthority && (
          <div className="cardLight mb-20">
            <h2 className="flex align-center gap-2"><AutoTranslate>Forwarding Authority</AutoTranslate></h2>
            <div className="grid grid-col-4 mb-4">
              <div className="form-group">
                <label><AutoTranslate>Authority Name</AutoTranslate></label>
                <input type="text" value={caseData.forwardingAuthority.authorityName || ''} readOnly />
              </div>
              <div className="form-group">
                <label><AutoTranslate>Designation</AutoTranslate></label>
                <input type="text" value={caseData.forwardingAuthority.designation || ''} readOnly />
              </div>
              <div className="form-group">
                <label><AutoTranslate>Organisation</AutoTranslate></label>
                <input type="text" value={caseData.forwardingAuthority.organisation || ''} readOnly />
              </div>
              <div className="form-group">
                <label><AutoTranslate>Forwarding Letter No.</AutoTranslate></label>
                <input type="text" value={caseData.forwardingAuthority.forwardingLetterNumber || ''} readOnly />
              </div>
            </div>
          </div>
        )}

        {/* Evidence / Parcel List section */}
        <div className="cardLight mb-20">
          <h2 className="flex align-center gap-2"><AutoTranslate>Evidence / Parcel List</AutoTranslate></h2>
          <div className="table-wrapper mb-8">
            <table>
              <thead>
                <tr>
                  <th><AutoTranslate>File Name</AutoTranslate></th>
                  <th><AutoTranslate>Evidence Category</AutoTranslate></th>
                  <th><AutoTranslate>Evidence Type</AutoTranslate></th>
                  <th><AutoTranslate>Assign Division</AutoTranslate></th>
                  <th><AutoTranslate>Assign Employee</AutoTranslate></th>
                  <th><AutoTranslate>Remark</AutoTranslate></th>
                </tr>
              </thead>
              <tbody>
                {(caseData.evidenceList || []).length > 0 ? caseData.evidenceList.map((row) => (
                  <tr key={row.documentDetailId}>
                    <td>{row.docName}</td>
                    <td>{row.evidenceCategory || '--'}</td>
                    <td>{row.evidenceTypeName || '--'}</td>
                    <td>
                      <select
                        value={assignments[row.documentDetailId]?.divisionId || ''}
                        onChange={(e) => handleDivisionChange(row.documentDetailId, e.target.value)}
                      >
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        {divisions.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={assignments[row.documentDetailId]?.employeeId || ''}
                        onChange={(e) => handleAssignmentChange(row.documentDetailId, 'employeeId', e.target.value)}
                        disabled={!assignments[row.documentDetailId]?.divisionId}
                      >
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        {(employees[assignments[row.documentDetailId]?.divisionId] || []).map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text" style={{width:"240px"}}
                        value={assignments[row.documentDetailId]?.remark || ''}
                        onChange={(e) => handleAssignmentChange(row.documentDetailId, 'remark', e.target.value)}
                        placeholder="Add remark"
                      />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <AutoTranslate>No evidence files found for this case.</AutoTranslate>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pre-Examination Details section - Editable */}
        <div className="cardLight mb-20">
          <h2 className="flex align-center gap-2"><AutoTranslate>Pre-Examination Details</AutoTranslate></h2>

          <div className="grid grid-col-4 mb-4">
            <div className="form-group">
              <label><AutoTranslate>Purpose</AutoTranslate> *</label>
              <select 
                value={form.purposeId} 
                onChange={(e) => handleFieldChange('purposeId', e.target.value)}
                onBlur={() => handleFieldBlur('purposeId')}
                className={errors.purposeId ? 'error' : ''}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {purposeOptions.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.purposeId && <span className="error-text">{errors.purposeId}</span>}
            </div>

            <div className="form-group">
              <label><AutoTranslate>Nature of Examination</AutoTranslate> *</label>
              <select
                value={form.natureOfExaminationId}
                onChange={(e) => handleFieldChange('natureOfExaminationId', e.target.value)}
                onBlur={() => handleFieldBlur('natureOfExaminationId')}
                className={errors.natureOfExaminationId ? 'error' : ''}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {natureOfExamOptions.map((n) => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
              {errors.natureOfExaminationId && <span className="error-text">{errors.natureOfExaminationId}</span>}
            </div>

            <div className="form-group">
              <label><AutoTranslate>No. of Parcels</AutoTranslate></label>
              <input
                type="number"
                value={form.noOfParcels}
                onChange={(e) => handleFieldChange('noOfParcels', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label><AutoTranslate>No. of Exhibits</AutoTranslate></label>
              <input
                type="number"
                value={form.noOfExhibits}
                onChange={(e) => handleFieldChange('noOfExhibits', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label><AutoTranslate>Nature of Case</AutoTranslate> *</label>
              <textarea
                rows="2"
                placeholder="Short description of case (min 10 characters)"
                value={form.natureOfCase}
                onChange={(e) => handleFieldChange('natureOfCase', e.target.value)}
                onBlur={() => handleFieldBlur('natureOfCase')}
                className={errors.natureOfCase ? 'error' : ''}
                required
              ></textarea>
              {errors.natureOfCase && <span className="error-text">{errors.natureOfCase}</span>}
            </div>

            <div className="form-group">
              <label><AutoTranslate>Nature of Crime</AutoTranslate> *</label>
              <select
                value={form.crimeTypeId}
                onChange={(e) => handleFieldChange('crimeTypeId', e.target.value)}
                onBlur={() => handleFieldBlur('crimeTypeId')}
                className={errors.crimeTypeId ? 'error' : ''}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {crimeTypeOptions.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.crimeTypeId && <span className="error-text">{errors.crimeTypeId}</span>}
            </div>

            <div className="form-group">
              <label><AutoTranslate>Priority</AutoTranslate> *</label>
              <select
                value={form.priorityId}
                onChange={(e) => handleFieldChange('priorityId', e.target.value)}
                onBlur={() => handleFieldBlur('priorityId')}
                className={errors.priorityId ? 'error' : ''}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {priorityOptions.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.priorityId && <span className="error-text">{errors.priorityId}</span>}
            </div>

            <div className="form-group">
              <label><AutoTranslate>Seal Status</AutoTranslate> *</label>
              <select 
                value={form.sealStatusId} 
                onChange={(e) => handleSealStatusChange(e.target.value)}
                onBlur={() => handleFieldBlur('sealStatusId')}
                className={errors.sealStatusId ? 'error' : ''}
              >
                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                {sealStatusOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {errors.sealStatusId && <span className="error-text">{errors.sealStatusId}</span>}
            </div>

            <div className="form-group">
              <label>
                <AutoTranslate>Parcel Condition</AutoTranslate> *
                {isParcelConditionAutoFilled && (
                  <span className="text-xs text-gray-400 ml-1">
                    (<AutoTranslate>auto-filled from Seal Status</AutoTranslate>)
                  </span>
                )}
              </label>
              {isParcelConditionAutoFilled ? (
                <input
                  type="text"
                  value={selectedParcelCondition?.name || ''}
                  readOnly
                  className="readonly-input"
                />
              ) : (
                <select
                  value={form.parcelConditionId}
                  onChange={(e) => handleFieldChange('parcelConditionId', e.target.value)}
                  onBlur={() => handleFieldBlur('parcelConditionId')}
                  className={errors.parcelConditionId ? 'error' : ''}
                >
                  <option value=""><AutoTranslate>Select</AutoTranslate></option>
                  {parcelConditionOptions.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              )}
              {errors.parcelConditionId && <span className="error-text">{errors.parcelConditionId}</span>}
            </div>

            {showSealRemarks && (
              <div className="form-group">
                <label><AutoTranslate>Verification Remarks</AutoTranslate> *</label>
                <textarea
                  rows="2"
                  value={form.sealVerificationRemarks}
                  onChange={(e) => handleFieldChange('sealVerificationRemarks', e.target.value)}
                  onBlur={() => handleFieldBlur('sealVerificationRemarks')}
                  className={errors.sealVerificationRemarks ? 'error' : ''}
                  required
                ></textarea>
                {errors.sealVerificationRemarks && <span className="error-text">{errors.sealVerificationRemarks}</span>}
              </div>
            )}

            {showParcelOther && (
              <div className="form-group">
                <label><AutoTranslate>Specify Other Condition</AutoTranslate> *</label>
                <input
                  type="text"
                  value={form.parcelConditionOther}
                  onChange={(e) => handleFieldChange('parcelConditionOther', e.target.value)}
                  onBlur={() => handleFieldBlur('parcelConditionOther')}
                  className={errors.parcelConditionOther ? 'error' : ''}
                  required
                />
                {errors.parcelConditionOther && <span className="error-text">{errors.parcelConditionOther}</span>}
              </div>
            )}
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
    </>
  );
};

export default PreExamineForm;