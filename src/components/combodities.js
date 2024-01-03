// UserDetailComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/FetchapiSlice";

export default function ComorbiditiesCard() {
  const { loading, error, users } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {users && users.comorbidities && (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Comorbidities</h2>
          <ul className="list-disc ml-6">
            {Object.entries(users.comorbidities).map(([key, value]) => (
              <li key={key} className="mb-2">
                <span className="font-bold">{key}:</span> {value ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
