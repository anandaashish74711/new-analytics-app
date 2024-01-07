import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { getUser } from './features/FetchapiSlice';
import { useDispatch } from 'react-redux';

function App() {
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUser())
  },[])
  return (
    <div className="App  bg-white"> {/* Add bg-white class */}
      <header className="App-top-layout ">
        <Header />
        <Body />
        <Footer />
      </header>
    </div>
  );
}

export default App;
