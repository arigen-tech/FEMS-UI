import React from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import { MdRemoveRedEye, MdOutlineClose } from "react-icons/md";

const DispatchViewComponent = ({ setShowDispatchView }) => {
    return (
        <div className="card">

            <div className="cardLight mb-20">
                <div className='btnBackTop'>
                    <button type="button" class="btnBack" onClick={() => setShowDispatchView(false)}></button>
                    {/* <h2><AutoTranslate>Back</AutoTranslate></h2> */}
                </div>

                <div className="grid grid-col-4 mb-4">
                    <div className="form-group">
                        <label><AutoTranslate>Forwarding Authority</AutoTranslate></label>
                        <input type="text" placeholder="" name="" />
                    </div>

                    <div className="form-group">
                        <label><AutoTranslate>Dispatch Date</AutoTranslate></label>
                        <input type="text" placeholder="" name="" />
                    </div>

                    <div className="form-group">
                        <label><AutoTranslate>Dispatch Reference No.</AutoTranslate></label>
                        <input type="text" placeholder="" name="" />
                    </div>
                    <div className="form-group">
                        <label><AutoTranslate>Recipient</AutoTranslate></label>
                        <input type="text" placeholder="" name="" />
                    </div>
                    <div className="form-group">
                        <label><AutoTranslate>Dispatch Mode</AutoTranslate></label>
                        <select>
                            <option value=""><AutoTranslate>Select</AutoTranslate></option>
                            <option value=""><AutoTranslate>Courier</AutoTranslate></option>
                            <option value=""><AutoTranslate>SMS</AutoTranslate></option>
                            <option value=""><AutoTranslate>Email</AutoTranslate></option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label><AutoTranslate>Dispatch Document </AutoTranslate></label>
                        <input type="file" placeholder="" name="" />
                    </div>

                    <div className="form-group col-span-2">
                        <label><AutoTranslate>Dispatch Remarks </AutoTranslate></label>
                        <textarea id="" rows="2"></textarea>
                    </div>

                    <div className="form-group">
                        <label><AutoTranslate>Notification </AutoTranslate></label>
                        <div className='checkboxGroup mt-12'>
                            <label class="checkBox" for="emailId">
                                <input type="checkbox" value="" id="emailId" />
                                <span>Email</span>
                            </label>
                            <label class="checkBox" for="smsId">
                                <input type="checkbox" value="" id="smsId" />
                                <span>SMS</span>
                            </label>
                        </div>
                    </div>


                </div>
            </div>


            <div class="btn-group">
                <button type="button" class="btn-primary">Save</button>
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="button" class="btn btn-back" onClick={() => setShowDispatchView(false)}>Back</button>
            </div>

        </div>
    )
}

export default DispatchViewComponent;