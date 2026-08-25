import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import ReferralTransferComponent from './ReferralTransferComponent';
import ReferralTransferView from './ReferralTransferView';

const ReferralTransfer = () => {
    const [transferView, setTransferView] = useState(false);
    // get Current Role from local Storage
    const currentRole = localStorage.getItem("role") || "";
    return (
        <div className="">
            <div className="title">
                <h1><AutoTranslate>Referral / Transfer</AutoTranslate></h1>
            </div>

            {!transferView && <ReferralTransferComponent onView={() => setTransferView(true)} currentRole={currentRole} />}
            {transferView && <ReferralTransferView onBack={() => setTransferView(false)} currentRole={currentRole} />}
        </div>
    )
}

export default ReferralTransfer;