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
    console.log('fetch')
  },[])
  return (
    <div className="App mx-4 bg-white"> {/* Add bg-white class */}
      <header className="App-top-layout mb-4">
        <Header />
        <Body />
        <Footer />
      </header>
    </div>
  );
}

export default App;
