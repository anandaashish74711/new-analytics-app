import React from 'react';

function PhaseGraph({ userData }) {
  return (
    <div>
      <div>PhaseGraph</div>
      {userData && (
        <div>
          <h2>Comorbidities:</h2>
          <ul>
            {Object.entries(userData.comorbidities).map(([key, value]) => (
              <li key={key}>
                {key}: {value ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PhaseGraph;
