import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Leaveform from './pages/Leaveform';
import SalaryForm from './pages/SalaryForm';
import SalaryTable from './pages/SalaryTable';

function App() {

  return (
    <>

    <Router>
    <Routes>


  <Route path="/" element={<Leaveform/>}/>
  <Route path="/salary" element={<SalaryForm/>}/>
  <Route path="/salary-table" element={<SalaryTable/>}/>


    </Routes>
    </Router>
    </>
  )
}

export default App
