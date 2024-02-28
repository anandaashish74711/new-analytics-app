import React from 'react';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities';
import backgroundImage from './background-healthcare.jpg'; // Import your background image file

export default function Body() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set background image
    backgroundSize: 'cover', // Cover the entire container
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    backgroundPosition: 'center', // Center the image horizontally and vertically
  };

  return (
    <div className='flex' style={backgroundStyle}> 
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
