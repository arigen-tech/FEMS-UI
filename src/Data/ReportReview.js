import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import ReportReviewComponent from './ReportReviewComponent';
import ReviewComponent from './ReviewComponent';
import FinalReviewComponent from './FinalReviewComponent';

const ReportReview = () => {
  const [activeComponent, setActiveComponent] = useState("A");
  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Report Review</AutoTranslate></h1>
      </div>

      {activeComponent === "A" && (
        <ReportReviewComponent onView={() => setActiveComponent("B")} />
      )}

      {activeComponent === "B" && (
        <ReviewComponent onView={() => setActiveComponent("C")} onBack={() => setActiveComponent("A")} />
      )}

      {activeComponent === "C" && (
        <FinalReviewComponent onBack={() => setActiveComponent("B")} />
      )}

    </div>
  )
}

export default ReportReview;