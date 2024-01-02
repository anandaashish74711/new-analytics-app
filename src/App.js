import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
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
