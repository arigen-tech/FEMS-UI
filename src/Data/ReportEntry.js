import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import ReportEntryComponent from './ReportEntryComponent';
import PreExamine from './PreExamine';

const ReportEntry = () => {
  const [showPreExamine, setShowPreExamine] = useState(false);
  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Report Entry</AutoTranslate></h1>
      </div>

      {!showPreExamine && <ReportEntryComponent setShowPreExamine={setShowPreExamine} />}

      {showPreExamine && <PreExamine setShowPreExamine={setShowPreExamine} />}

    </div>
  )
}

export default ReportEntry;
