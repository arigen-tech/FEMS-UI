import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate

const ForwardingAuthorityDetails = () => {
    const [submission, setSubmission] = useState("");

    return (
        <div className="cardLight">
            <h2 className="flex align-center gap-2">📤 <AutoTranslate>Forwarding Authority Details</AutoTranslate> <span className="text-red-500">*</span></h2>

            <div className="grid grid-col-4 mb-4">

                <div className="form-group">
                    <label><AutoTranslate>Forwarding Authority Type</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Authority Name</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Designation</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Organisation </AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>District </AutoTranslate></label>
                    <select>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        <option value=""><AutoTranslate></AutoTranslate></option>
                    </select>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Address </AutoTranslate></label>
                    <textarea id="" rows="2"></textarea>
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Contact Number</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Email</AutoTranslate></label>
                    <input type="email" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Forwarding Letter Number</AutoTranslate></label>
                    <input type="text" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Forwarding Date</AutoTranslate></label>
                    <input type="date" placeholder="" name="" value="" required />
                </div>
                <div className="form-group">
                    <label><AutoTranslate>Forwarding Letter</AutoTranslate></label>
                    <input type="file" placeholder="" name="" value="" required />
                </div>

                <div className="form-group">
                    <label><AutoTranslate>Mode of Submission</AutoTranslate></label>
                    <select value={submission} onChange={(e) => setSubmission(e.target.value)}>
                        <option value=""><AutoTranslate>Select</AutoTranslate></option>
                        {/* <option value=""><AutoTranslate>Hand Delivered </AutoTranslate></option> */}
                        <option value="ifMessenger"><AutoTranslate>Authorized Messenger</AutoTranslate></option>
                        <option value="ifCourier"><AutoTranslate>Courier </AutoTranslate></option>
                        {/* <option value=""><AutoTranslate>Post</AutoTranslate></option>
                  <option value=""><AutoTranslate>Electronic / Digital</AutoTranslate></option>
                  <option value=""><AutoTranslate>Other </AutoTranslate></option> */}
                    </select>
                </div>

                {/* If Courier:  */}
                {submission === "ifCourier" && (
                    <>
                        <div className="form-group">
                            <label><AutoTranslate>Courier Agency</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>AWB / Consignment Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Booking Date </AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Dispatch Date</AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Expected Delivery Date </AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Actual Delivery Date </AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Parcel ID</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Parcel Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Number of Exhibits</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Package Type </AutoTranslate></label>
                            <select>
                                <option value=""><AutoTranslate>Select</AutoTranslate></option>
                                <option value=""><AutoTranslate></AutoTranslate></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Seal Number </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seal Description</AutoTranslate></label>
                            <textarea id="" rows="2"></textarea>
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Seal Condition </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Package Condition </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>

                        <div className="form-group">
                            <label><AutoTranslate>Received Date </AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Received Time</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Received By </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Remarks</AutoTranslate></label>
                            <textarea id="" rows="2" required></textarea>
                        </div>
                    </>
                )}

                {/* If Messenger:   */}
                {submission === "ifMessenger" && (
                    <>
                        <div className="form-group">
                            <label><AutoTranslate>Messenger Name</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Designation</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Organization </AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>ID / Reference Number</AutoTranslate></label>
                            <input type="text" placeholder="" name="" value="" required />
                        </div>
                        <div className="form-group">
                            <label><AutoTranslate>Date & Time of Handover</AutoTranslate></label>
                            <input type="date" placeholder="" name="" value="" required />
                        </div>
                    </>
                )}

            </div>

        </div>
    )
}

export default ForwardingAuthorityDetails