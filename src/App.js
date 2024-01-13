// App.js
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { getUser } from './features/FetchapiSlice';
import { useDispatch } from 'react-redux';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router=createBrowserRouter(
  
)


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App bg-white">
      <header className="App-top-layout ">
        <Header />
        <Body />
        <Footer />
      </header>
    </div>
  );
}

export default App;
