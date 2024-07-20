import './App.css';
import Navbar from './Components/Navbar';
import ImageUploadCard from './Components/Classifier';
import {Routes, Route,BrowserRouter} from 'react-router-dom'
import About from './Components/About';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
       <Navbar/>
       <div className="container">
        
        
       <Routes>
        <Route path='/' element={<ImageUploadCard/>}></Route>
       <Route path='/about' element={<About/>}></Route>
       </Routes>
       </div>
       
    </div>
    
    </BrowserRouter>
  );
}

export default App;
