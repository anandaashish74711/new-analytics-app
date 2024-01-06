import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartJs, LineElement, CategoryScale, LinearScale, PointElement, TimeScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/FetchapiSlice';

chartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement
);

function sampleArray(array, sampleSize) {
  const sampledArray = [];
  const step = Math.max(1, Math.floor(array.length / sampleSize));

  for (let i = 0; i < array.length; i += step) {
    sampledArray.push(array[i]);
  }

  return sampledArray;
}


function BioGraph() {
  const {users,loading,error}= useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.visit && !loading) {
      console.log('Dispatching getUser...');
      dispatch(getUser());
  } 
})


const [frequencyFilter, setFrequencyFilter] = useState({ min: 0, max: 100 });



  if (!users || !users.visit) {
    // Handle the case where userData or userData.visit is undefined
    return <div>Loading...</div>;
  }

  const handleFrequencyChange = (event, type) => {
    const value = parseFloat(event.target.value);
    setFrequencyFilter((prevFilter) => ({ ...prevFilter, [type]: value }));
  };
 
  const applyFrequencyFilter = (users, frequencyFilter) => {
    const { min, max } = frequencyFilter;
  
    // Logging the MedicalData array for debugging purposes
    console.log(users.visit.MedicalData);
  
    return users.visit.flatMap((visit) =>
      visit.MedicalData.filter((item) => {
        // Log the frequency for each item
        console.log('Item Frequency:', item.frequency);
  
        // Filter based on the frequency range
        return item.frequency >= min && item.frequency <= max;
      })
    );
  };
  
  
  // Assuming data structure is available and contains bioImpedanceValues and timestamps
  const allBioImpedanceValues = users.visit.flatMap((visit) =>
    visit.MedicalData.map((medicalData) => medicalData.bioImpedance)
  );
  const allTimestamps = users.visit.flatMap((visit) =>
    visit.MedicalData.map((medicalData) => medicalData.timestamp)
  );

  // Filter data based on selected frequency
  const filteredMedicalData = applyFrequencyFilter(users, frequencyFilter);


  const filteredBioImpedanceValues = filteredMedicalData.map((item) => item.bioImpedance);

  // Use only a sampled subset of values
  const sampleSize = 500; // Adjust the sample size as needed
  const bioImpedanceValues = sampleArray(filteredBioImpedanceValues, sampleSize);
  const timestamps = sampleArray(allTimestamps, sampleSize).sort(
    (a, b) => new Date(a) - new Date(b)
  ); // Sort timestamps

  console.log('Timestamps:', timestamps);
  console.log('Bioimpedance Values:', bioImpedanceValues);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Bioimpedance Values',
        data: bioImpedanceValues,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        pointBackgroundColor: 'blue',
      },
    ],
  };
  const options = {
    type: 'line',
    data: chartData, // Corrected from data: data,
    options: {
      plugins: {
        title: {
          text: 'Chart.js Time Scale',
          display: true
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'DD T',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'value',
          },
        },
      },
      responsive: true,
    },
  };
  

  console.log('Chart Data:', chartData);

  return (
    <div>
      <h2>BioGraph</h2>
      <div>
        <label htmlFor="minFrequency">Min Frequency:</label>
        <input
          type="number"
          id="minFrequency"
          value={frequencyFilter.min}
          onChange={(e) => handleFrequencyChange(e, 'min')}
        />
        <label htmlFor="maxFrequency">Max Frequency:</label>
        <input
          type="number"
          id="maxFrequency"
          value={frequencyFilter.max}
          onChange={(e) => handleFrequencyChange(e, 'max')}
        />
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default BioGraph;
