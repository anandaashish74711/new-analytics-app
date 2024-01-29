// UserDetailComponent.js
import React from "react";
import { useSelector } from "react-redux";

export default function ComorbiditiesCard() {
  const { loading, error, users } = useSelector((state) => state.app);

  return (
    <div className="container mx-auto p-4 flex ">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {users && users.comorbidities && (
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-md p-4 aspect-w-1 aspect-h-1 w-11/12"> {/* Adjusted width to w-11/12 */}
            <h2 className="text-2xl font-bold mb-4 text-center ">Comorbidities</h2>
            <ul className="list-disc ml-6 mb-4"> {/* Added margin-bottom for a bit more spacing */}
              {Object.entries(users.comorbidities).map(([key, value]) => (
                <li key={key} className="mb-2">
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
