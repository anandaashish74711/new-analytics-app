
import React from "react";
import { useSelector } from "react-redux";

export default function ComorbiditiesCard() {
  const { loading,  users } = useSelector((state) => state.app);

  return (
    <div className="container mx-auto p-4 flex  ">
      {loading && <p>Loading...</p>}
     
      {users && users.comorbidities && (
        <div className="flex-1  bg-blue-800 shadow-xl rounded-lg">
          <div className="   p-4 aspect-w-1 aspect-h-1 w-12/12 bg-white-800 transition-shadow"> 
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Comorbidities</h2>
            <ul className="list-disc ml-6 mb-4"> 
              {Object.entries(users.comorbidities).map(([key, value]) => (
                <li key={key} className="mb-2 text-white">
                  <span className="font-bold">{key}:</span>{" "}
                  {value ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
