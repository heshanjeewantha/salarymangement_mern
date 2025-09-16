import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Leaveform from './pages/Leaveform';
import Leavestatus from './pages/Leavestatus';

function App() {

  return (
    <>

    <Router>
    <Routes>


      <Route path="/" element={<Leaveform/>}/>
      <Route path="/leavestatus" element={<Leavestatus/>}/>


    </Routes>
    </Router>
     
    </>
  )
}

export default App
