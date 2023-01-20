
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/Full-pizza';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Contacts from './pages/Contacts';

function App() {
  return (
              <Routes>
                <Route path='/' element={<MainLayout/>}>
                  <Route path='/World-of-Pizza' element={<Home/>}/>
                  <Route path='/World-of-Pizza/cart' element={<Cart/>}/>
                  <Route path='/World-of-Pizza/pizza/:id' element={<FullPizza/>}/>
                  <Route path='*' element={<NotFound/>}/>
                  <Route path ='/World-of-Pizza/about' element={<About/>}/>
                  <Route path ='/World-of-Pizza/contacts' element={<Contacts/>}/>
                </Route>
              </Routes>
  );
}

export default App;
