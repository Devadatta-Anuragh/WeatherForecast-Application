
import './App.css';
import Forecast from './components/Forecast';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  Routes,
  Route
} from "react-router-dom";
import VideoComponent from './components/VideoComponent';


function App() {


  return (
    <>
        <VideoComponent/>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/forecast" element={< Forecast />} />
        </Routes>
    </>

  );
}

export default App;
