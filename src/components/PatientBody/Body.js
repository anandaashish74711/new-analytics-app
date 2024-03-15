import React, { useEffect } from 'react';
import Profile from './Profile';
import ComorbiditiesCard from './combodities';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/FetchapiSlice';
import { useParams, Link } from 'react-router-dom'; // Import Link
import Report from './report/report';
import BioGraph from './BioGraph';

export default function Body() {
  const { userID } = useParams();
  const userType = useSelector((state) => state.auth.userType); // Assuming you have a userType in your Redux state

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching getUser action with:", userID);
    dispatch(getUser({ userId: userID, userType: userType }));
  }, [dispatch, userID, userType]);

  return (
    <>
      <div className='h-20 w-screen shadow-lg mt-2 flex items-center justify-center'>
  {/* Link to navigate to the report */}
  <Link
    to={`/dashboard/patient/${userID}/report`}
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'
  >
    View Report
  </Link>
</div>
      <div className='flex text-white'>
        <div className='mt-3'>
          <Profile />
          <ComorbiditiesCard />
        </div>
        <div className='w-3/4 p-4'>
          {/* BioGraph component */}
          <BioGraph />
        </div>
      </div>
    </>
  );
}
