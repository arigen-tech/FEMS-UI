import React from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const CaseInformation = () => {
    return (
        <div className="cardLight">
            <h2 className="flex align-center gap-2">📝 <AutoTranslate>Case Information</AutoTranslate> <span className="text-red-500">*</span></h2>

            <div className="grid grid-col-4 mb-4">
                <div className="form-group">
                    <label><AutoTranslate>Case ID</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Case Number</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Case Title</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>FIR Number</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>FIR Date</AutoTranslate></label>
                    <input type="date" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Case Type</AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate></AutoTranslate></option>
                    </select>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Crime Type</AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate></AutoTranslate></option>
                    </select>
                </div>

                <div className="form-group">
                    <label><AutoTranslate>State</AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate></AutoTranslate></option>
                    </select>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>District</AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate></AutoTranslate></option>
                    </select>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Police Station</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Investigating Officer</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Court Reference</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Priority </AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate>Normal</AutoTranslate></option>
                        <option value=""><AutoTranslate>Urgent</AutoTranslate></option>
                        <option value=""><AutoTranslate>Critical</AutoTranslate></option>
                    </select>
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Date of Incident</AutoTranslate></label>
                    <input type="date" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Incident Location</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
            </div>
        </div>
    )
}

export default CaseInformation