import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import DispatchComponent from './DispatchComponent';
import DispatchViewComponent from './DispatchViewComponent';

const Dispatch = () => {
  const [showDispatchView, setShowDispatchView] = useState(false);
  const [selectedReportEntryId, setSelectedReportEntryId] = useState(null);

  const handleView = (reportEntryId) => {
    setSelectedReportEntryId(reportEntryId);
    setShowDispatchView(true);
  };

  const handleBack = () => {
    setSelectedReportEntryId(null);
    setShowDispatchView(false);
  };

  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Dispatch</AutoTranslate></h1>
      </div>

      {!showDispatchView && <DispatchComponent onView={handleView} />}

      {showDispatchView && (
        <DispatchViewComponent reportEntryId={selectedReportEntryId} onBack={handleBack} />
      )}
    </div>
  )
}

export default Dispatch;