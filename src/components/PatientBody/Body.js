import React, { useEffect } from 'react';
import Profile from './Profile';
import ComorbiditiesCard from './combodities';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/FetchapiSlice';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { AiFillFileText } from "react-icons/ai";
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
  <div className='h-20 w-screen bg-blue-800 shadow-lg mt-2 flex items-center justify-between px-4'>
      {/* Left Content */}
      <div className='flex items-center'>
        <h1 className='font-bold text-2xl text-white py-4 px-4'>IHUB-DATA</h1>
      </div>

      {/* Right Content */}
      <div className='flex items-center'>
        <Link
          to={`/dashboard/patient/${userID}/report`}
          className='bg-white-500 hover:bg-white-700 text-white h-10 font-bold py-2 px-4 rounded transition duration-300 flex items-center'
        >
          {/* Adjusted the icon size and added margin */}
          <AiFillFileText className='text-2xl mr-2' />
          View Report
        </Link>
      </div>
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
