import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';

function PhaseAngleChart() {
  const users = useSelector((state) => state.app.users);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (users) {
      setFilteredVisits(users.visit);
    }
  }, [users]);

  useEffect(() => {
    if (filteredVisits.length > 0) {
      const data = filteredVisits.map((visit) => {
        const phaseAngleValue = calculatePhaseAngle(visit);
        return phaseAngleValue;
      });
      setChartData(data);

      renderChart(data, filteredVisits);
    }
  }, [filteredVisits]);

  const calculatePhaseAngle = (visit) => {
    if (visit) {
      const phaseAngleValues = visit.MedicalData.map((item) => item.phaseAngle);
      const sum = phaseAngleValues.reduce((acc, curr) => acc + curr, 0);
      return sum / phaseAngleValues.length || 0;
    }
    return 0;
  };

  const handleDateFilter = (startDate, endDate) => {
    const filtered = users.visit.filter((visit) => {
      const visitDate = new Date(visit.visitDate);
      return visitDate >= startDate && visitDate <= endDate;
    });
    setFilteredVisits(filtered);
  };

  const renderChart = (data, visits) => {
    const chart = echarts.init(document.getElementById('phaseAngle-chart'));

    const option = {
      title: {
        text: 'Phase Angle Chart',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const index = params[0].dataIndex;
          return `Phase Angle Value: ${params[0].value.toFixed(2)}`;
        },
      },
      xAxis: {
        type: 'category',
        data: visits.map((visit) => new Date(visit.visitDate).toLocaleString()),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data,
          type: 'line',
          markLine: {
            data: [{ type: 'average', name: 'Average' }],
          },
        },
      ],
    };

    chart.setOption(option);
  };

  return (
    <div className="h-400 rounded-lg m-6 mr-4 p-2 transition ease-in-out delay-150 bg-white-200 shadow-xl hover:-translate-y-1">
      <div className="chart-controls">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" onChange={(e) => handleDateFilter(new Date(e.target.value), null)} />
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" onChange={(e) => handleDateFilter(null, new Date(e.target.value))} />
      </div>
      <div className="chart-container">
        <div id="phaseAngle-chart" style={{ width: '100%', height: '300px' }} />
      </div>
    </div>
  );
}

export default PhaseAngleChart;
