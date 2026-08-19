import React, { useState } from 'react';
import AutoTranslate from '../i18n/AutoTranslate'; // Import AutoTranslate
import DispatchComponent from './DispatchComponent';
import DispatchViewComponent from './DispatchViewComponent';

const Dispatch = () => {
  const [showDispatchView, setShowDispatchView] = useState(false);
   return (
     <div className="">
       <div className="title">
         <h1><AutoTranslate>Dispatch</AutoTranslate></h1>
       </div>
 
       {!showDispatchView && <DispatchComponent setShowDispatchView={setShowDispatchView} />}
 
       {showDispatchView && <DispatchViewComponent setShowDispatchView={setShowDispatchView} />}
 
     </div>
   )
}

export default Dispatch;