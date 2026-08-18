import React from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const ViewExamine = ({ setShowViewExamine }) => {

    return (
        <>
            <div className="card">

                <div className="cardLight mb-20">
                    <div className='btnBackTop'>
                        <button type="button" class="btnBack" onClick={() => setShowViewExamine(false)}></button>
                        <h2><AutoTranslate>Case & Evidence Information</AutoTranslate></h2>
                    </div>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Case ID</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Case Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>FIR Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Police Station</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence ID</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Evidence Type</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Division</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" readOnly />
                        </div>
                    </div>
                </div>



                <div className="cardLight">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Scientific Examination</AutoTranslate> <span className="text-red-500">*</span></h2>

                    <div className="grid grid-col-4 mb-4">
                        <div className="form-group">
                            <label><AutoTranslate>Examination Start Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Examination End Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Examination Method</AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate></AutoTranslate></option>
                            </select>
                        </div>
                        {/* <div className="form-group">
                            <label><AutoTranslate>Examination Method</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div> */}

                        <div className="form-group">
                            <label><AutoTranslate>Observations/Findings </AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Scientific Opinion </AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Examination Remarks </AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                    </div>
                </div>

                <div className="cardLight">
                    <h2 className="flex align-center gap-2"><AutoTranslate>Report</AutoTranslate> <span className="text-red-500">*</span></h2>

                    <div className="grid grid-col-4 mb-4">

                        <div className="form-group">
                            <label><AutoTranslate>Report Date</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Report Title</AutoTranslate></label>
                            <input type="text" placeholder="" name="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Report Summary </AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Scientific Report</AutoTranslate></label>
                            <input type="file" placeholder="" name="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Supporting Documents </AutoTranslate> <span style={{ fontSize: "12px", color: "#861616" }}>Multi Upload</span></label>
                            <input type="file" placeholder="" name="" required />
                        </div>
                    </div>

                </div>
                <div class="btn-group">
                    <button type="button" class="btn-primary">Save Draft</button>
                    <button type="button" class="btn-primary">Submit Report</button>
                    <button type="button" class="btn btn-back" onClick={() => setShowViewExamine(false)}>Back</button>
                </div>

            </div>
        </>
    )
}

export default ViewExamine