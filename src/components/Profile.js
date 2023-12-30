import React, { useContext } from 'react';
import {DataContext} from '../context/DataContext'; // Adjust the path if needed

export default function Profile() {
  const { data, isLoading, error } = useContext(DataContext);

  // Extract the relevant information from the fetched data
  const { name, age, gender } = data; // Assuming the API response has this structure

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Personal Information</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
    </div>
  );
}
