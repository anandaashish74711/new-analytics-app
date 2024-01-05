import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../features/FetchapiSlice';

function PhaseGraph() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.app);


 

  return (
    <div>PhaseGraph</div>
  );
}

export default PhaseGraph;
