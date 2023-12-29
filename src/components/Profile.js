import React from 'react';

export default function Profile({ name, age, gender }) {
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

