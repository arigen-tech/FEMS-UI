import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from '../API/apiClient';
import { MASTER_API } from '../API/apiConfig';

const EvidenceMetadata = ({ formData = {}, onChange, categoryOptions = [], onCategoryChange }) => {
  const [evidenceTypes, setEvidenceTypes] = useState([]);
  const [evidenceTypesLoading, setEvidenceTypesLoading] = useState(false);

  // Evidence Type cascades off the selected Evidence Category
  // (the same category already used elsewhere in this form: formData.category)
  useEffect(() => {
    let cancelled = false;
    const categoryId = formData.category?.id;

    setEvidenceTypesLoading(true);
    const url = categoryId
      ? `${MASTER_API}/evidence-type/getByParent/${categoryId}/1`
      : `${MASTER_API}/evidence-type/getAll/1`;

    apiClient
      .get(url)
      .then((res) => {
        if (!cancelled) setEvidenceTypes(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to load evidence types:', err);
        if (!cancelled) setEvidenceTypes([]);
      })
      .finally(() => {
        if (!cancelled) setEvidenceTypesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.category?.id]);

  const handleChange = (field) => (e) => onChange(field, e.target.value);

  return (
    <div className="cardLight">
      <h2 className="flex align-center gap-2">🔍 <AutoTranslate>Evidence Metadata</AutoTranslate><span className="text-red-500">*</span></h2>

      <div className="grid grid-col-4 mb-4">
        <div className="form-group">
          <label><AutoTranslate>Evidence ID  </AutoTranslate></label>
          <input type="text" value={formData.evidenceId || ''} onChange={handleChange('evidenceId')} required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>Exhibit Number </AutoTranslate></label>
          <input type="text" value={formData.exhibitNumber || ''} onChange={handleChange('exhibitNumber')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Evidence Category</AutoTranslate></label>
          <select value={formData.category?.id || ''} onChange={onCategoryChange}>
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Evidence Type</AutoTranslate></label>
          <select
            value={formData.evidenceTypeId || ''}
            onChange={handleChange('evidenceTypeId')}
            disabled={evidenceTypesLoading}
          >
            <option value=""><AutoTranslate>Select</AutoTranslate></option>
            {evidenceTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label><AutoTranslate>Evidence Description  </AutoTranslate></label>
          <textarea rows="2" value={formData.subject || ''} onChange={handleChange('subject')} required></textarea>
        </div>
        <div className="form-group">
          <label><AutoTranslate>Source</AutoTranslate></label>
          <input type="text" value={formData.evidenceSource || ''} onChange={handleChange('evidenceSource')} required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>Collection Location </AutoTranslate></label>
          <input type="text" value={formData.collectionLocation || ''} onChange={handleChange('collectionLocation')} required />
        </div>
        <div className="form-group">
          <label><AutoTranslate>Collection Date </AutoTranslate></label>
          <input type="date" value={formData.collectionDate || ''} onChange={handleChange('collectionDate')} required />
        </div>

        <div className="form-group">
          <label><AutoTranslate>Remarks </AutoTranslate></label>
          <textarea rows="2" value={formData.evidenceRemarks || ''} onChange={handleChange('evidenceRemarks')} required></textarea>
        </div>
      </div>
    </div>
  );
};

export default EvidenceMetadata;