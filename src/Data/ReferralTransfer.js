import React, { useState } from 'react';
import ReferralTransferComponent from './ReferralTransferComponent';
import ReferralTransferView from './ReferralTransferView';

const ReferralTransfer = () => {
    const [transferView, setTransferView] = useState(false);
    return (
        <>
            {!transferView && <ReferralTransferComponent onView={() => setTransferView(true)} />}
            {transferView && <ReferralTransferView onBack={() => setTransferView(false)} />}
        </>
    )
}

export default ReferralTransfer;