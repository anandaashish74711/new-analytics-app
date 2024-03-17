import React, { useEffect, useState } from 'react';

const HeartBreathRate = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Initialize pyodide
    async function initPyodide() {
      const pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' });
      // Import necessary Python libraries
      await pyodide.runPythonAsync(`
        import numpy as np
        import pandas as pd
        from scipy.signal import find_peaks
        import heartpy as hp

        # Your Python code here
        df = pd.read_excel('/content/manender_data_100khz.xlsx', skiprows=3)
        time = df.iloc[:, 0]
        magnitude = df.iloc[:, 1]
        phase_angle = df.iloc[:, 3]

        def moving_average(data, window_size):
          cumsum = np.cumsum(data)
          cumsum[window_size:] = cumsum[window_size:] - cumsum[:-window_size]
          return cumsum[window_size - 1:] / window_size

        filtered_data_breath = hp.filter_signal(magnitude, cutoff=0.5, sample_rate=10.0, order=2, filtertype='lowpass')
        filtered_data_heart = hp.filter_signal(magnitude, cutoff=[0.6, 2], filtertype='bandpass', sample_rate=10.0)

        smoothed_y_breath = moving_average(filtered_data_breath, window_size=5)

        peaks_breath, _ = find_peaks(smoothed_y_breath, distance=15)
        peaks_heart, _ = find_peaks(filtered_data_heart)

        breath_rate = len(peaks_breath) / (len(time) / 600)
        heart_rate = len(peaks_heart) / (len(time) / 600)

        output = f'breath rate is : {round(breath_rate)}\\nheart rate is : {round(heart_rate)}'
        output  # Return the output
      `);

      // Get the output from Python and update state
      const result = await pyodide.globals.get('output');
      setOutput(result);
    }

    initPyodide();
  }, []);

  return (
    <div>
      <h1>Heart and Breath Rate</h1>
      <pre>{output}</pre>
    </div>
  );
};

export default HeartBreathRate;
