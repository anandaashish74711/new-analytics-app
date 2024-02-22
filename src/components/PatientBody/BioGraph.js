import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartJs, LineElement, CategoryScale, LinearScale, PointElement, TimeScale } from 'chart.js';
import { useSelector } from 'react-redux';

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
  const { users } = useSelector((state) => state.app);

  const [frequencyFilter, setFrequencyFilter] = useState({ targetFrequency: 90 });
  const [visualizationType, setVisualizationType] = useState('bioImpedance');
  const [filteredMedicalData, setFilteredMedicalData] = useState([]);
  const [values, setValues] = useState([]);
  const [sampleSize, setSampleSize] = useState(200);
  const [selectedVisitIndex, setSelectedVisitIndex] = useState(0);
  const [Bio, setBio] = useState('Phase Angle');
  const [postGeneratorFilter, setPostGeneratorFilter] = useState(null);
  const [postSensorFilter, setPostSensorFilter] = useState(null);

  useEffect(() => {
    if (users) {
      const filteredData = applyFilters(users, frequencyFilter, selectedVisitIndex, postGeneratorFilter, postSensorFilter);
      setFilteredMedicalData(filteredData);

      const sampledValues = sampleArray(filteredData.map((item) => item[visualizationType]), sampleSize);
      setValues(sampledValues);
    }
  }, [users, frequencyFilter, visualizationType, sampleSize, selectedVisitIndex, postGeneratorFilter, postSensorFilter]);

  const applyFilters = (users, frequencyFilter, selectedVisitIndex, postGeneratorFilter, postSensorFilter) => {
    const { targetFrequency } = frequencyFilter;

    return users.visit[selectedVisitIndex]?.MedicalData.filter(
      (item) => item.frequency === targetFrequency &&
                  (postGeneratorFilter === null || item.postGenerator === postGeneratorFilter) &&
                  (postSensorFilter === null || item.postSensor === postSensorFilter)
    ) || [];
  };

  const handleFrequencyChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setFrequencyFilter({ targetFrequency: value });
  };

  const handleVisitIndexChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setSelectedVisitIndex(index);
  };

  const handlePostGeneratorChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setPostGeneratorFilter(value);
  };

  const handlePostSensorChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setPostSensorFilter(value);
  };

  const toggleVisualizationType = () => {
    setVisualizationType((prevType) => (prevType === 'bioImpedance' ? 'phaseAngle' : 'bioImpedance'));
    setBio((prevBio) => (prevBio === 'BioImpedance' ? 'Phase Angle' : 'BioImpedance'));
  };

  const getChartData = () => {
    const dataKey = visualizationType === 'bioImpedance' ? 'bioImpedance' : 'phaseAngle';
    const timestamps = sampleArray(
      users.visit[selectedVisitIndex]?.MedicalData.map((medicalData) => {
        const date = new Date(medicalData.timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      }) || [],
      sampleSize
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
        maintainAspectRatio: false,
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
          text:Date,
        },
      },
    },
    responsive: true,
  },
};
  

  if (!users) {
    return <h1>loading</h1>;
  } else {
    return (
      <div className="bg-gray-200 min-h-screen p-4 my-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{Bio}</h2>
        <button
  onClick={toggleVisualizationType}
  className="bg-blue-500 text-white py-2 m-2 px-4 rounded hover:bg-blue-700 transition duration-300"
>
  ({Bio === 'BioImpedance' ? 'Phase Angle' : 'BioImpedance'})
</button>

        <div className="flex flex-wrap mb-4">
          <div className="flex items-center mb-2 mr-4">
            <label htmlFor="targetFrequency" className="mr-2">
              Target Frequency:
            </label>
            <select
              id="targetFrequency"
              value={frequencyFilter.targetFrequency}
              onChange={handleFrequencyChange}
              className="border p-2"
            >
              {Array.from({ length: 21 }, (_, index) => 90 + index).map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-2 mr-4">
            <label htmlFor="postGenerator" className="mr-2">
              Post Generator:
            </label>
            <select
              id="postGenerator"
              value={postGeneratorFilter || ''}
              onChange={handlePostGeneratorChange}
              className="border p-2"
            >
              {Array.from({ length: 6 }, (_, index) => index ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label htmlFor="postSensor" className="mr-2">
              Post Sensor:
            </label>
            <select
              id="postSensor"
              value={postSensorFilter || ''}
              onChange={handlePostSensorChange}
              className="border p-2"
            >
              {Array.from({ length: 6 }, (_, index) => index ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mb-2">
  <label htmlFor="visitIndex" className="mr-2">
    Visit:
  </label>
  <input
    type="number"
    id="visitIndex"
    value={selectedVisitIndex}
    onChange={handleVisitIndexChange}
    className="border p-2"
  />
  {users.visit[selectedVisitIndex] ? (
    <span className="ml-2 text-gray-500">
      Visit Date: {new Date(users.visit[selectedVisitIndex].visitDate).toLocaleDateString()}
    </span>
  ) : (
    <span className="ml-2 text-gray-500">Default Visit Date</span>
  )}
</div>

        </div>
        <div className="mt-4">
          <Line data={getChartData()} options={options} />
        </div>
      </div>
    );
  }
}

export default BioGraph;