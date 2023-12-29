import './App.css';
import FetchData from './FetchData'; 

import Header from'./components/Header'
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Body/>
        <Footer/>
       
        <FetchData />

      </header>
    </div>
  );
}

export default App;
