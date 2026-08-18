import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import PreExamination from './PreExamination';
import PreExamine from './PreExamine';

const PreExaminationModule = () => {
    const [showPreExamine, setShowPreExamine] = useState(false);
    return (
        <div className="">
            <div className="title">
                <h1><AutoTranslate>Pre-Examination</AutoTranslate></h1>
            </div>

            {!showPreExamine && <PreExamination setShowPreExamine={setShowPreExamine} />}

            {showPreExamine && <PreExamine setShowPreExamine={setShowPreExamine} />}

        </div>
    )
}

export default PreExaminationModule;