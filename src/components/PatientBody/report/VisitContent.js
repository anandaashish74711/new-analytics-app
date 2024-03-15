import { useSelector } from 'react-redux';
import GreenHRF from './green.png'
import BlueHRF from './blue.png'
import RedHRF from './red.png'
import HeartFill from './LungFill'
function VisitContent() {
  const userData = useSelector((state) => state.app.users);
  const riskFactor = 80;
  let heartRateFailureImage =''
  if(riskFactor < 23 ){
    heartRateFailureImage = GreenHRF
  }else if(riskFactor >= 23 && riskFactor < 70){
    heartRateFailureImage = BlueHRF
  }else{
    heartRateFailureImage = RedHRF
  }
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 h-96 rounded-lg m-6 mr-4 p-4 transition ease-in-out delay-150 bg-purple-200 relative flex'>
       
         <img src={heartRateFailureImage} />

          <div >
            <HeartFill percentage={70} color={'blue'} />
          </div>
       
      </div>
      <div className='h-96 rounded-lg m-6 mr-4 transition ease-in-out delay-150 bg-purple-100 flex items-center justify-center'>
        <div className='text-purple-800 text-xl text-center w-1/2'>
          <h2 className='text-purple-800'>Visit Dates:</h2>
          <ul className='text-purple-400 gap-2'>
            {userData.visit.map((visit, index) => (
              <li key={visit._id}>
                {index + 1}. Date: {new Date(visit.visitDate).toLocaleDateString()} Time: {new Date(visit.visitDate).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VisitContent;
