import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage'
import DisplayPage from './Pages/DisplayPage'
import Auth from './Components/Auth';
import AddPage from './Pages/AddPage'
import CategoryPage from './Pages/CategoryPage'
import { useSelector} from "react-redux";


function App() {
  const mode=useSelector((state)=>state.darkmode.modestatus)

  return (
    <div className={mode?`appbg`:`lightbg`}>
     <Navbar/>
     <Routes>
      <Route path={'/'} element={<LandingPage/>} />
      <Route path='/login' element={<Auth />}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path={'/home'} element={<DisplayPage/>} />
      <Route path={'/add'} element={<AddPage/>} />
      <Route path="/category/:categoryId" element={<CategoryPage/>} />
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
