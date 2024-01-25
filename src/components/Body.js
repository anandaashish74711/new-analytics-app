import React, { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities' // Ensure the correct import path

import { getUser } from '../features/FetchapiSlice';

export default function Body() {
  const auth = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ auth }));
  }, [dispatch, auth]);


  return (
    <div className='flex bg-cyan-950'>
      <div className='w-1/4 p-4'>
        <Profile />
        <div className='mb-4'>
          <ComorbiditiesCard />
        </div>
      </div>

      <div className='w-3/4 p-4'>
        <div className='mb-4'>
          <BioGraph />
        </div>
      </div>
    </div>
  );
}
