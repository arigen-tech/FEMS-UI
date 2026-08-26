import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import ReportEntryComponent from './ReportEntryComponent';
import ViewExamine from './ViewExamine';

const ReportEntry = () => {
  const [showViewExamine, setShowViewExamine] = useState(false);
  const [selectedDocumentHeaderId, setSelectedDocumentHeaderId] = useState(null);

  const handleOpenCase = (documentHeaderId) => {
    console.log('Opening case with ID:', documentHeaderId);
    setSelectedDocumentHeaderId(documentHeaderId);
    setShowViewExamine(true);
  };

  const handleBack = () => {
    console.log('Going back to list');
    setShowViewExamine(false);
    setSelectedDocumentHeaderId(null);
  };

  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Report Entry</AutoTranslate></h1>
      </div>

      {!showViewExamine && (
        <ReportEntryComponent 
          onOpenCase={handleOpenCase}
        />
      )}

      {showViewExamine && (
        <ViewExamine 
          documentHeaderId={selectedDocumentHeaderId}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

export default ReportEntry;