import React, { useEffect } from 'react';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/FetchapiSlice';

export default function Body() {
 

  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const userType = user.role;
  const dispatch = useDispatch();

  useEffect(() => {
    if(userType === 'patient') {
      dispatch(getUser({ userId, userType }));
   
    }
  }, [user]);

  return (
    <div className='flex bg-' >
      <div className='w-1/4 p-4'>
        <Profile />
        <div className='ml-2'>
          <ComorbiditiesCard />
        </div>
      </div>

      <div className='w-3/4 p-4'>
        <div className=''>
          <BioGraph />
        </div>
      </div>
    </div>
  );
}
