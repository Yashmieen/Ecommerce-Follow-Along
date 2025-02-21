import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Homepage, LoginPage,SignupPage} from './Routes.jsx'
 

 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
 
    </Routes>
    </BrowserRouter>
 
  );
}
 
export default App;
 