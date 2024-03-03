import React, { useEffect } from 'react';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/FetchapiSlice';
import { useParams } from 'react-router-dom';

export default function Body() {
  const { userID } = useParams();
  
  console.log("User ID:", userID);

  const dispatch = useDispatch();


  useEffect(() => {
      console.log("Dispatching getUser action with:", userID);
      dispatch(getUser({userId: userID, userType: 'patient'}));
  }, [userID]);

  // console.log("User:", user);

  return (
    <div className='flex  text-white bg-gray-500'>
      <div className='mt-3'>
        <Profile />
        <div className=''>
          <ComorbiditiesCard />
        </div>
      </div>
      <div className='w-3/4 p-4'>
        <div className='bg-gray-800 rounded-lg pb-16  pl-4 shadow-md '>
          <BioGraph />
        </div>
      </div>
    </div>
  );
}
