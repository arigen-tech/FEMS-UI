import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import ReportReviewComponent from './ReportReviewComponent';
import ReviewComponent from './ReviewComponent';

const ReportReview = () => {
  const [showReviewReport, setShowReviewReport] = useState(false);
  return (
    <div className="">
      <div className="title">
        <h1><AutoTranslate>Report Review</AutoTranslate></h1>
      </div>

      {!showReviewReport && <ReportReviewComponent setShowReviewReport={setShowReviewReport} />}

      {showReviewReport && <ReviewComponent setShowReviewReport={setShowReviewReport} />}

    </div>
  )
}

export default ReportReview;