import React, { useState, useEffect } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import apiClient from '../API/apiClient';
import { MASTER_API } from '../API/apiConfig';
import { TrashIcon } from "@heroicons/react/24/solid";
import { FiPlus } from "react-icons/fi";

const EvidenceMetadata = ({
  category,
  onCategoryChange,
  categoryOptions = [],
  evidenceRows = [],
  onEvidenceRowsChange,
}) => {
  const [evidenceTypes, setEvidenceTypes] = useState([]);
  const [evidenceTypesLoading, setEvidenceTypesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const categoryId = category?.id;

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
  }, [category?.id]);

  const updateRow = (index, field, value) => {
    const updated = evidenceRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    onEvidenceRowsChange(updated);
  };

  const addRow = () => {
    onEvidenceRowsChange([
      ...evidenceRows,
      { id: `row_${Date.now()}`, categoryId: category?.id || '', evidenceTypeId: '', description: '', file: null },
    ]);
  };

  const removeRow = (index) => {
    if (evidenceRows.length <= 1) return;
    onEvidenceRowsChange(evidenceRows.filter((_, i) => i !== index));
  };

  // ✅ CRITICAL FIX: Pass a proper synthetic event to onCategoryChange
  const handleCategorySelect = (e) => {
    const selectedId = e.target.value;
    
    // 1. Pass the event to the parent's handleCategoryChange
    if (onCategoryChange) {
      onCategoryChange(e);
    }

    // 2. Update all rows to store this categoryId
    const updatedRows = evidenceRows.map((r) => ({
      ...r,
      categoryId: selectedId
    }));
    onEvidenceRowsChange(updatedRows);
  };

  return (
    <div className="cardLight">
      <h2 className="flex align-center gap-2 mb-4">
        🔍 <AutoTranslate>Evidence Metadata</AutoTranslate><span className="text-red-500">*</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full mb-4 border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-left font-medium text-gray-700" style={{ width: "20%" }}>
                <AutoTranslate>Evidence Category</AutoTranslate>
              </th>
              <th className="p-3 text-left font-medium text-gray-700" style={{ width: "20%" }}>
                <AutoTranslate>Evidence Type</AutoTranslate>
              </th>
              <th className="p-3 text-left font-medium text-gray-700" style={{ width: "35%" }}>
                <AutoTranslate>Evidence Description</AutoTranslate>
              </th>
              <th className="p-3 text-left font-medium text-gray-700" style={{ width: "20%" }}>
                <AutoTranslate>Choose File</AutoTranslate>
              </th>
              <th className="p-3 text-center font-medium text-gray-700" style={{ width: "5%" }}>
                <AutoTranslate>Action</AutoTranslate>
              </th>
            </tr>
          </thead>
          <tbody>
            {evidenceRows.map((row, index) => {
              const isFirstRow = index === 0;

              return (
                <tr key={row.id} className="border-b border-gray-100">
                  
                  {/* EVIDENCE CATEGORY - Separate cell for each row */}
                  <td className="p-3">
                    <select
                      className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                        ${!isFirstRow ? 'bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200' : 'bg-white border-gray-300'}`}
                      value={category?.id || ''}
                      disabled={!isFirstRow}
                      onChange={handleCategorySelect}
                    >
                      <option value=""><AutoTranslate>Select Category</AutoTranslate></option>
                      {categoryOptions.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </td>

                  {/* EVIDENCE TYPE - Always Active */}
                  <td className="p-3">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={row.evidenceTypeId || ''}
                      onChange={(e) => updateRow(index, 'evidenceTypeId', e.target.value)}
                      disabled={evidenceTypesLoading}
                    >
                      <option value=""><AutoTranslate>Select</AutoTranslate></option>
                      {evidenceTypes.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </td>

                  {/* EVIDENCE DESCRIPTION - Always Active */}
                  <td className="p-3">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter description"
                      value={row.description || ''}
                      onChange={(e) => updateRow(index, 'description', e.target.value)}
                      required
                    />
                  </td>

                  {/* CHOOSE FILE - Always Active */}
                  <td className="p-3">
                    <input
                      type="file"
                      className="w-full p-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!row.file}
                      onChange={(e) => updateRow(index, 'file', e.target.files?.[0] || null)}
                    />
                    {row.file && (
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                        {row.file.name}
                      </div>
                    )}
                  </td>

                  {/* ACTION - Delete */}
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-50"
                      onClick={() => removeRow(index)}
                      disabled={evidenceRows.length <= 1}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button 
          type="button" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium"
          onClick={addRow}
        >
          <FiPlus /> <AutoTranslate>Add</AutoTranslate>
        </button>
      </div>
    </div>
  );
};

export default EvidenceMetadata;