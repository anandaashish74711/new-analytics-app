import { useSelector } from 'react-redux';
import GreenHRF from './green.png';
import BlueHRF from './blue.png';
import RedHRF from './red.png';
import lungs1 from './lungs1.png'; // Assuming BreathRateImage is the correct import
import HeartFill from './LungFill';
import { FaHeartPulse } from 'react-icons/fa6';
import { BsFillLungsFill } from 'react-icons/bs';
import { FaHeartbeat } from 'react-icons/fa';

function VisitContent() {
  const userData = useSelector((state) => state.app.users);
  const riskFactor = 20;
  let heartRateFailureImage = '';
  if (riskFactor < 23) {
    heartRateFailureImage = GreenHRF;
  } else if (riskFactor >= 23 && riskFactor < 70) {
    heartRateFailureImage = BlueHRF;
  } else {
    heartRateFailureImage = RedHRF;
  }

  return (
    <div className='flex flex-wrap m-2'>

      {/* Heart Failure Card */}
      <div className='flex items-center justify-center m-2'>
        <div className='rounded-xl p-6 bg-white-200 shadow-lg flex flex-col items-center justify-center w-60 h-80'>
          <img src={GreenHRF} alt='Heart Failure' className='mb-4 h-20 w-25' />
          <div>
            <h3 className='text-lg  mt-4lokjyhgfdgtyu8ipoiuy7tryuiouytf'>Heart Failure Risk Factor</h3>
            <p className='text-base'>Risk Factor: {riskFactor}%</p>
          </div>
        </div>
      </div>


          
      <div className='flex items-center justify-center m-2'>
        <div className='rounded-xl p-6 bg-white-200 flex flex-col items-center justify-center mb-2 w-60 h-80 shadow-lg'>
            <HeartFill percentage={70} color={'blue'} style={{ width: '50px', height: '50px' }} />
            <h3 className='text-lg'>Water Level in Lungs</h3>
            </div>
           
          
     
      </div>

      {/* Heart Rate Card */}
      <div className='flex items-center justify-center m-2'>
        <div className='rounded-xl p-6 bg-white-200 flex flex-col items-center justify-center mb-2 w-60 h-80 shadow-lg'>
          <FaHeartPulse className='h-40 w-20' />
          <div>
            <h3 className='text-lg'>Heart Rate</h3>
            {/* Add content related to heart rate */}
          </div>
        </div>
      </div>

      {/* Breath Rate Card */}
      <div className='flex items-center justify-center m-2'>
        <div className='rounded-xl p-6 bg-white-200 shadow-lg flex flex-col items-center justify-center w-60 h-80'>
          <BsFillLungsFill className='h-40 w-20' />
          <div>
            <h3 className='text-lg'>Breath Rate</h3>
          </div>
        </div>
      </div>

      {/* Visit Dates Section */}
      <div className='flex flex-wrap justify-end gap-4 px-4'>
        <div className='rounded-lg p-4 bg-white-200 max-h-full flex items-center justify-center w-full max-w-xs shadow-lg'>
          <div className='text-purple-800 text-sm sm:text-base md:text-lg text-center w-full'>
            <h2 className='text-purple-800'>Visit Dates:</h2>
            <ul className=''>
              {userData.visit.map((visit, index) => (
                <li key={visit._id} className='text-xs sm:text-sm md:text-base'>
                  {index + 1}. Date: {new Date(visit.visitDate).toLocaleDateString()} Time: {new Date(visit.visitDate).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default VisitContent;
