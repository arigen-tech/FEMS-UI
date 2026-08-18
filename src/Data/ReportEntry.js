import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import ReportEntryComponent from './ReportEntryComponent';
import ViewExamine from './ViewExamine';


const ReportEntry = () => {
  const [showViewExamine, setShowViewExamine] = useState(false);
  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Report Entry</AutoTranslate></h1>
      </div>

      {!showViewExamine && <ReportEntryComponent setShowViewExamine={setShowViewExamine} />}

      {showViewExamine && <ViewExamine setShowViewExamine={setShowViewExamine} />}

    </div>
  )
}

export default ReportEntry;
