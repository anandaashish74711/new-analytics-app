import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import patient from '../components/PatientBody/patient.jpg'
function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${patient})`, // Set background image
    backgroundSize: 'cover', // Cover the entire container
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    backgroundPosition: 'center', // Center the image horizontally and vertically
  };
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const authError = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await dispatch(loginUser({ email, password, role })); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

 
  useEffect(() => {
    if (user) {
      const { _id: userID, role: userRole } = user;
      const url = `/dashboard/${userRole.toLowerCase()}/${userID}`;
      navigate(url);
    }
  }, [user, navigate]);

      
  

  useEffect(() => {
   
    dispatch(clearError());
  }, [dispatch]);



  return (
   
    <div className="min-h-screen flex items-center justify-center "style={backgroundStyle}>
      <div className="bg- p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline "
            />
          </div>

          <div>
            <label htmlFor="role" className="block  text-white text-sm font-bold mb-2">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline  "
            > 
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Patient">Patient</option>

            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>

          {authError && <p className="text-red-500">{authError}</p>}
        </form>
      </div>
    </div>
    
  );
}

export default Login;
