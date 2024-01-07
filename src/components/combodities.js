// UserDetailComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/FetchapiSlice";

export default function ComorbiditiesCard() {
  const { loading, error, users } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  },);

  return (
    <div className="bg-gray-200 p-4 m-5 rounded-lg shadow-md w-64">
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {users && users.comorbidities && (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Comorbidities</h2>
          <ul className="list-disc pl-6">
            {Object.entries(users.comorbidities).map(([key, value]) => (
              <li key={key} className="mb-2">
                <span className="font-semibold">{key}:</span>{" "}
                <span className={value ? "text-green-500" : "text-red-500"}>
                  {value ? "Yes" : "No"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
