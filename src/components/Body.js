import React from 'react';
import Profile from './Profile';
import BioGraph from './BioGraph';
import ComorbiditiesCard from './combodities' // Ensure the correct import path

export default function Body() {
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
