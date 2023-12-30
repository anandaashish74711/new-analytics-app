import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <header className="App-top-layout"> // Use a different container element
          <Header />
          <Body />
          <Footer />
        </header>
      </div>
    </DataProvider>
  );
}

export default App;
