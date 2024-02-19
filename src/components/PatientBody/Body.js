import React, { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities' ;
import { getUser } from '../../features/FetchapiSlice';


export default function Body() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userid=user._id
  const role=user.role
  

  useEffect(() => {
    dispatch(getUser( {userid,role}));
  }, [dispatch]);


  return (
    <div className='flex bg-white'>
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
