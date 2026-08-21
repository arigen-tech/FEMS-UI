import React, { useState } from 'react';
import ReferralTransferComponent from './ReferralTransferComponent';
import ReferralTransferView from './ReferralTransferView';

const ReferralTransfer = () => {
    const [transferView, setTransferView] = useState(false);
     // get Current Role from local Storage
    const currentRole = localStorage.getItem("role") || "";
    return (
        <>
            {!transferView && <ReferralTransferComponent onView={() => setTransferView(true)} currentRole={currentRole} />}
            {transferView && <ReferralTransferView onBack={() => setTransferView(false)} currentRole={currentRole} />}
        </>
    )
}

export default ReferralTransfer;