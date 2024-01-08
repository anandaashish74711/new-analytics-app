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

  const [frequencyFilter, setFrequencyFilter] = useState({ targetFrequency: 0 });
  const [visualizationType, setVisualizationType] = useState('bioImpedance');
  const [filteredMedicalData, setFilteredMedicalData] = useState([]);
  const [values, setValues] = useState([]);
  const [sampleSize, setSampleSize] = useState(50);
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
    const value = parseFloat(event.target.value);
    setFrequencyFilter({ targetFrequency: value });
  };

  const handleVisitIndexChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setSelectedVisitIndex(index);
  };

  const handlePostGeneratorChange = (event) => {
    const value = parseFloat(event.target.value);
    setPostGeneratorFilter(value);
  };

  const handlePostSensorChange = (event) => {
    const value = parseFloat(event.target.value);
    setPostSensorFilter(value);
  };

  const toggleVisualizationType = () => {
    setVisualizationType((prevType) => (prevType === 'bioImpedance' ? 'phaseAngle' : 'bioImpedance'));
    setBio((prevBio) => (prevBio === 'BioImpedance' ? 'Phase Angle' : 'BioImpedance'));
  };

  const getChartData = () => {
    const dataKey = visualizationType === 'bioImpedance' ? 'bioImpedance' : 'phaseAngle';

    const timestamps = sampleArray(users.visit[selectedVisitIndex]?.MedicalData.map((medicalData) => medicalData.timestamp) || [], sampleSize)
      .sort((a, b) => new Date(a) - new Date(b));

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
            text: 'Value',
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
        <button onClick={toggleVisualizationType} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Toggle Visualization Type ({Bio === 'BioImpedance' ? 'Phase Angle' : 'BioImpedance'})
        </button>
        <div className="flex flex-wrap mb-4">
          <div className="flex items-center mb-2 mr-4">
            <label htmlFor="targetFrequency" className="mr-2">
              Target Frequency:
            </label>
            <input
              type="number"
              id="targetFrequency"
              value={frequencyFilter.targetFrequency}
              onChange={handleFrequencyChange}
              className="border p-2"
            />
          </div>
          <div className="flex items-center mb-2 mr-4">
            <label htmlFor="postGenerator" className="mr-2">
              Post Generator:
            </label>
            <input
              type="number"
              id="postGenerator"
              value={postGeneratorFilter || ''}
              onChange={handlePostGeneratorChange}
              className="border p-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label htmlFor="postSensor" className="mr-2">
              Post Sensor:
            </label>
            <input
              type="number"
              id="postSensor"
              value={postSensorFilter || ''}
              onChange={handlePostSensorChange}
              className="border p-2"
            />
          </div>
          {users.visit[selectedVisitIndex] && (
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
              <span className="ml-2 text-gray-500">
                Visit Date: {new Date(users.visit[selectedVisitIndex].visitDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Line data={getChartData()} options={options} />
        </div>
      </div>
    );
  }
}

export default BioGraph;
