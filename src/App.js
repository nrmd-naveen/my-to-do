import Register from './user/register/register';
import Login from './user/login/login';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Home from './main/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
