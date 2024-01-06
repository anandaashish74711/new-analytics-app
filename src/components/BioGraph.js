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
  const { users, loading, error } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.visit && !loading) {
      console.log('Dispatching getUser...');
      dispatch(getUser());
    }
  }, [users, loading, dispatch]);

  const [frequencyFilter, setFrequencyFilter] = useState({ min: 0, max: 100 });
  const [visualizationType, setVisualizationType] = useState('bioImpedance');

  const applyFrequencyFilter = (users, frequencyFilter) => {
    const { min, max } = frequencyFilter;

    console.log(users.visit.MedicalData);

    return users.visit.flatMap((visit) =>
      visit.MedicalData.filter((item) => {
        console.log('Item Frequency:', item.frequency);
        return item.frequency >= min && item.frequency <= max;
      })
    );
  };

  const allBioImpedanceValues = users.visit.flatMap((visit) =>
    visit.MedicalData.map((medicalData) => medicalData.bioImpedance)
  );
  const allTimestamps = users.visit.flatMap((visit) =>
    visit.MedicalData.map((medicalData) => medicalData.timestamp)
  );

  const handleFrequencyChange = (event, type) => {
    const value = parseFloat(event.target.value);
    setFrequencyFilter((prevFilter) => ({ ...prevFilter, [type]: value }));
  };

  const toggleVisualizationType = () => {
    setVisualizationType((prevType) => (prevType === 'bioImpedance' ? 'phaseAngle' : 'bioImpedance'));
  };

  const getChartData = () => {
    const dataKey = visualizationType === 'bioImpedance' ? 'bioImpedance' : 'phaseAngle';

    const filteredMedicalData = applyFrequencyFilter(users, frequencyFilter);

    const filteredValues = filteredMedicalData.map((item) => item[dataKey]);

    const sampleSize = 50;
    const values = sampleArray(filteredValues, sampleSize);
    const timestamps = sampleArray(allTimestamps, sampleSize).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      labels: timestamps,
      datasets: [
        {
          label: `${visualizationType === 'bioImpedance' ? 'Bioimpedance' : 'Phase Angle'} Values`,
          data: values,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          pointBackgroundColor: 'blue',
        },
      ],
    };
  };

  const options = {
    type: 'line',
    
    options: {
      plugins: {
        title: {
          text: 'Chart.js Time Scale',
          display: true,
          responsive: true,
    maintainAspectRatio: false
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
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
            text: 'Value',
          },
        },
      },
      responsive: true,
    },
  };

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
      <button onClick={toggleVisualizationType}>
        Toggle Visualization Type ({visualizationType === 'bioImpedance' ? 'Phase Angle' : 'Bioimpedance'})
      </button>
      <Line data={getChartData()} options={options} />
    </div>
  );
}

export default BioGraph;
