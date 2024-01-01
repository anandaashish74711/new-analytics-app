import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/FetchapiSlice';

export default function Profile() {
  const userData = useSelector((state) => state.app.users); // Assuming that 'users' is the key in your state that holds the user data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Profile</h1>

      {userData && (
        <div>
           <p>ID: {userData._id}</p>
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>Race: {userData.race}</p>
          <p>Blood Group: {userData.bloodGroup}</p>
          <p>Height: {userData.height}</p>
          <p>Weight: {userData.weight}</p>
          <p>BMI: {userData.BMI}</p>
         
        </div>
      )}
    </div>
  );
}
