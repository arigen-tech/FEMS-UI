import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate';
import PreExaminationList from './PreExaminationList';
import PreExamineForm from './PreExamineForm';
import Layout from '../Components/Layout';

const PreExaminationModule = () => {
  const [activeCaseId, setActiveCaseId] = useState(null);

  return (
    <Layout>
      <div className="">
        <div className="title">
          <h1><AutoTranslate>Pre-Examination</AutoTranslate></h1>
        </div>
        {!activeCaseId && (
          <PreExaminationList onOpenCase={(id) => setActiveCaseId(id)} />
        )}
        {activeCaseId && (
          <PreExamineForm
            documentHeaderId={activeCaseId}
            onBack={() => setActiveCaseId(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default PreExaminationModule;