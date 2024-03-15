import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';
import VisitContent from './VisitContent';
import Header from './profile'
import DeltaZ from './deltaZ';
import Thorasicimpedence from './Thorasicimpedence';

import PhaseAngleChart from './PhaseAngle';

function Report() {
  return(
    <>
<div className=''> 
<Header/>
    </div>
    <div className='m-1 '>
      <VisitContent/>
    </div>
    <div className='m-1 '>
      <DeltaZ/>
    </div>
    <div className='m-1 '>
      <Thorasicimpedence/>
    </div>
    <div className='m-1 '>
      <PhaseAngleChart/>
    </div>
    </>
  )
    
}
export default Report;