import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Routes ,Route} from "react-router-dom";
import HolidayView from "./pages/HolidayView";
import SingleHolidayPage from "./pages/SingleHolidayPage";
function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/view/:country/:year" element={<HolidayView/>} />
      <Route path="/holiday/:id" element={<SingleHolidayPage/>} />
     
    </Routes>
    <Footer/>
  
     
    
    </>
    
  );
}

export default App;
