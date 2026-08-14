import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const EvidenceMetadata = () => {
    const evidenceCategories = [
      "Physical Evidence",
      "Digital Evidence",
      "Biological Evidence",
      "Documentary Evidence",
      "Audio Evidence",
      "Video Evidence",
      "Image Evidence",
    ];
    
      const [isOpenDropdown, setisOpenDropdown] = useState(false);
      const [selectedCategories, setSelectedCategories] = useState([]);
    
      const handleSelect = (category) => {
        setSelectedCategories((prev) => {
          if (prev.includes(category)) {
            // Remove if already selected
            return prev.filter((item) => item !== category);
          }
    
          // Add if not selected
          return [...prev, category];
        });
      };
    
    return (
        <div className="cardLight">
            <h2 className="flex align-center gap-2">🔍 <AutoTranslate>Evidence Metadata</AutoTranslate><span className="text-red-500">*</span></h2>

            <div className="grid grid-col-4 mb-4">
                <div className="form-group">
                    <label><AutoTranslate>Evidence ID  </AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Exhibit Number </AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <div className="evidence-category">
                        <label>Evidence Category</label>
                        {/* Dropdown button */}
                        <div className={`dropdown-select ${isOpenDropdown ? "active" : ""}`}
                            onClick={() => setisOpenDropdown(!isOpenDropdown)}>
                            <span>
                                {selectedCategories.length === 0
                                    ? "Select"
                                    : `${selectedCategories.length} Selected`}
                            </span>
                            <span className="dropdown-arrow">▼</span>
                        </div>

                        {/* Dropdown options */}
                        {isOpenDropdown && (
                            <div className="dropdown-options">
                                {evidenceCategories.map((category) => (
                                    <label key={category} className="dropdown-option" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleSelect(category)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* <label><AutoTranslate>Evidence Category</AutoTranslate></label>
                <select>
                  <option value=""><AutoTranslate>Select</AutoTranslate></option>           
                  <option value=""><AutoTranslate>Physical Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Digital Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Biological Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Documentary Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Audio Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Video Evidence</AutoTranslate></option>
                  <option value=""><AutoTranslate>Image Evidence</AutoTranslate></option>
                </select> */}
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Evidence Type</AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate>CCTV Footage</AutoTranslate></option>
                        <option value=""><AutoTranslate>Mobile Phone</AutoTranslate></option>
                        <option value=""><AutoTranslate>Hard Disk </AutoTranslate></option>
                        <option value=""><AutoTranslate>Blood Sample</AutoTranslate></option>
                        <option value=""><AutoTranslate>Hair Sample</AutoTranslate></option>
                        <option value=""><AutoTranslate>Firearm</AutoTranslate></option>
                        <option value=""><AutoTranslate>Ammunition</AutoTranslate></option>
                        <option value=""><AutoTranslate>Fingerprint</AutoTranslate></option>
                        <option value=""><AutoTranslate>Voice Recording </AutoTranslate></option>
                        <option value=""><AutoTranslate>Questioned Document</AutoTranslate></option>
                        <option value=""><AutoTranslate>Soil Sample</AutoTranslate></option>
                        <option value=""><AutoTranslate>Chemical Substance</AutoTranslate></option>
                        <option value=""><AutoTranslate>DNA Sample</AutoTranslate></option>
                    </select>
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Evidence Description  </AutoTranslate></label>
                    <textarea id="" rows="2" required></textarea>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Source</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Collection Location </AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Collection Date </AutoTranslate></label>
                    <input type="date" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Remarks </AutoTranslate></label>
                    <textarea id="" rows="2" required></textarea>
                </div>
            </div>

        </div>
    )
}

export default EvidenceMetadata