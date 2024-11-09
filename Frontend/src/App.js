import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register';
import Login from './Components/Login';
import ProtectedComponent from './Components/ProtectedComponents';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/protected' element={<ProtectedComponent/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
