import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Leaveform from './pages/Leaveform';

function App() {

  return (
    <>

    <Router>
    <Routes>


      <Route path="/" element={<Leaveform/>}/>


    </Routes>
    </Router>
     
    </>
  )
}

export default App
