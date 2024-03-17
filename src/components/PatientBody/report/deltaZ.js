import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';

function DeltaZ() {
  const users = useSelector((state) => state.app.users);
  const [deltaValues, setDeltaValues] = useState([]);

  useEffect(() => {
    if (users) {
      const visits = users.visit;
      const firstVisitBioImpedance = visits[0]?.MedicalData.map((item) => item.bioImpedance) || [];

      const deltas = visits.map((visit, index) => {
        if (index === 0) return 0; // Set the first value as 0
        const bioImpedanceValues = visit.MedicalData.map((item) => item.bioImpedance);
        const sum = bioImpedanceValues.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / bioImpedanceValues.length || 0; // Avoid division by zero
        return avg - firstVisitBioImpedance.reduce((acc, curr) => acc + curr, 0) / firstVisitBioImpedance.length;
      });

      setDeltaValues(deltas);
    }
  }, [users]);

  useEffect(() => {
    if (deltaValues.length > 0) {
      const chart = echarts.init(document.getElementById('bioimpedance-chart'));

      const option = {
        title: {
          text: 'Delta Z',
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const index = params[0].dataIndex;
            return `Visit ${index + 1}: ${params[0].value} (Actual Bioimpedance: ${getActualBioimpedance(index)})`;
          },
        },
        xAxis: {
          type: 'category',
          data: deltaValues.map((value, index) => {
            const visit = users.visit[index];
            return visit ? new Date(visit.visitDate).toLocaleString() : `Visit ${index + 1}`;
          }),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: deltaValues,
            type: 'line',
            markLine: {
              data: [{ type: 'average', name: 'Average' }],
            },
          },
        ],
      };

      chart.setOption(option);

      
      return () => {
        chart.dispose();
      };
    }
  }, [deltaValues, users]);

  const getActualBioimpedance = (index) => {
    const visit = users.visit[index];
    if (visit) {
      const bioImpedanceValues = visit.MedicalData.map((item) => item.bioImpedance);
      const sum = bioImpedanceValues.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / bioImpedanceValues.length || 0; 
      return avg.toFixed(2); 
    }
    return 'N/A';
  };

  return (
    <div className=" h-400 rounded-lg m-6 mr-4 p-2 transition ease-in-out delay-150 bg-white-200 shadow-xl hover:-translate-y-1 "> 
      <div id="bioimpedance-chart" style={{ width: '100%', height: '300px' }} />
    </div>
  );
}

export default DeltaZ;
