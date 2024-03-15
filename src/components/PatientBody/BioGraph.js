import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function BioGraph() {
  const { users } = useSelector((state) => state.app);
  const userData = useSelector((state) => state.app.users);

  const [frequencyFilter, setFrequencyFilter] = useState({ targetFrequency: 90 });
  const [visualizationType, setVisualizationType] = useState('bioImpedance');
  const [filteredMedicalData, setFilteredMedicalData] = useState([]);
  const [values, setValues] = useState([]);
  const [sampleSize, setSampleSize] = useState(200);
  const [selectedVisitIndex, setSelectedVisitIndex] = useState(0);
  const [Bio, setBio] = useState('Phase Angle');
  const [postGeneratorFilter, setPostGeneratorFilter] = useState(null);
  const [postSensorFilter, setPostSensorFilter] = useState(null);
  const [averageValue, setAverageValue] = useState(null);

  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    chart.setOption(getChartData());
    chart.on('click', function (params) {
      console.log(params);
    });
    chart.on('dataZoom', function (params) {
      console.log(params);
    });
    window.addEventListener('resize', function () {
      chart.resize();
    });
  }, [values]);

  useEffect(() => {
    if (users) {
      const filteredData = applyFilters(
        users,
        frequencyFilter,
        selectedVisitIndex,
        postGeneratorFilter,
        postSensorFilter
      );
      setFilteredMedicalData(filteredData);

      const bioImpedanceValues = filteredData.map((item) => item.bioImpedance);
      const phaseAngleValues = filteredData.map((item) => item.phaseAngle);

      if (visualizationType === 'bioImpedance') {
        setValues(bioImpedanceValues);
      } else {
        setValues(phaseAngleValues);
      }

      // Calculate average
      const sum =
        visualizationType === 'bioImpedance'
          ? bioImpedanceValues.reduce((acc, curr) => acc + curr, 0)
          : phaseAngleValues.reduce((acc, curr) => acc + curr, 0);

      const avg = sum / filteredData.length;
      setAverageValue(avg);
    }
  }, [
    users,
    frequencyFilter,
    visualizationType,
    selectedVisitIndex,
    postGeneratorFilter,
    postSensorFilter,
  ]);

  const applyFilters = (users, frequencyFilter, selectedVisitIndex, postGeneratorFilter, postSensorFilter) => {
    const { targetFrequency } = frequencyFilter;

    return (
      users.visit[selectedVisitIndex]?.MedicalData.filter(
        (item) =>
          item.frequency === targetFrequency &&
          (postGeneratorFilter === null || item.postGenerator === postGeneratorFilter) &&
          (postSensorFilter === null || item.postSensor === postSensorFilter)
      ) || []
    );
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
    setVisualizationType((prevType) => (prevType === 'phaseAngle' ? 'bioImpedance' : 'phaseAngle'));
    setBio((prevBio) => (prevBio === 'Phase Angle' ? 'BioImpedance' : 'Phase Angle'));
  };

  const getChartData = () => {
    const timestamps =
      users.visit[selectedVisitIndex]?.MedicalData.map((medicalData) => formatTimestamp(medicalData.timestamp)) || [];

    return {
      color: ['#0066CC'], // Updated color theme
      xAxis: {
        type: 'category',
        data: timestamps,
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#DDD',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
        formatter: function (params) {
          return `${params[0].name}: ${params[0].value}`;
        },
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100,
          xAxisIndex: [0],
        },
        {
          type: 'inside',
          start: 0,
          end: 100,
          xAxisIndex: [0],
        },
      ],
      series: [
        {
          name: `${visualizationType === 'phaseAngle' ? 'Bioimpedance' : 'Phase Angle'} Values`,
          data: values,
          type: 'line',
          markLine: {
            data: [
              { yAxis: 30, label: { formatter: '30', position: 'end' } },
              { yAxis: 50, label: { formatter: '50', position: 'end' } },
              { yAxis: 70, label: { formatter: '70', position: 'end' } },
              { yAxis: 80, label: { formatter: '80', position: 'end' } },
              { yAxis: 40, label: { formatter: '40', position: 'end' } },
            ],
          },
        },
      ],
    };
  };

  if (!users) {
    return <h1>loading</h1>;
  } else {
    return (
      <div className="h-auto p-4 my-4 rounded-lg shadow-lg bg-white">
        <button
          onClick={toggleVisualizationType}
          className="bg-blue-500 text-white py-2 m-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          {Bio}
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
              className="border p-2 text-black"
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
              Electrode 1:
            </label>
            <select
              id="postGenerator"
              value={postGeneratorFilter || ''}
              onChange={handlePostGeneratorChange}
              className="border p-2  text-black"
            >
              {Array.from({ length: 6 }, (_, index) => index).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label htmlFor="postSensor" className="mr-2">
              Electrode 2:
            </label>
            <select
              id="postSensor"
              value={postSensorFilter || ''}
              onChange={handlePostSensorChange}
              className="border p-2  text-black"
            >
              {Array.from({ length: 6 }, (_, index) => index).map((value) => (
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
              className="border p-2  text-black"
            />
            {users.visit[selectedVisitIndex] ? (
              <span className="ml-2 text-black-500">
                Visit Date: {formatTimestamp(users.visit[selectedVisitIndex].visitDate)}
              </span>
            ) : (
              <span className="ml-2 text-black-500">Default Visit Date</span>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">{Bio === 'Phase Angle' ? 'Bioimpedance' : 'Phase Angle'}</h2>
        <div id="chart" style={{ width: '100%', height: '400px' }}></div>

        {averageValue && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Average Value</h3>
            <div className="flex items-center">
              <span className="mr-2">Average {Bio === 'Phase Angle' ? 'Bioimpedance' : 'Phase Angle'}:</span>
              <span className="text-red-500 font-bold">{averageValue.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BioGraph;
