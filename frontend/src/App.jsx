import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {LoginPage,SignupPage, Homepage} from './Routes.jsx'
 

 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Homepage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
 
    </Routes>
    </BrowserRouter>
 
  );
}
 
export default App;
 