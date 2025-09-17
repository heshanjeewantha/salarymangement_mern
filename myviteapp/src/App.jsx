import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Leaveform from './pages/Leaveform';
import Dashboard from './pages/Dashboard';
import SalaryForm from './pages/SalaryForm';
import SalaryTable from './pages/SalaryTable';
import UpdateSalary from './pages/UpdateSalary';
import Leavestatus from './pages/Leavestatus';
import ViewSalary from './pages/ViewSalary';

function App() {

  return (
    <>

    <Router>
    <Routes>

      <Route path="/" element={<Dashboard/>}/>
      <Route path="/leaveform" element={<Leaveform/>}/>
      <Route path="/leavestatus" element={<Leavestatus/>}/>
      <Route path="/salary" element={<SalaryForm/>}/>
      <Route path="/salary-table" element={<SalaryTable/>}/>
      <Route path="/salary/update/:id" element={<UpdateSalary/>}/>
      <Route path="/salary/view/:id" element={<ViewSalary />} />


    </Routes>
    </Router>
     
    </>
  )
}

export default App
