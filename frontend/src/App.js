import { Route , Routes , Navigate} from "react-router-dom";
import Login from './Components/Login/Index';
import Signup from './Components/Signup/Index';
import Banner from './Components/Banner/Index'
import Product from './Components/Product/Index'
import Item from './Components/Item/Index'
import MainPage from "./Pages/Mainpage/Index";
import CartView from "./Components/HandleCart/Index";
function App() {
  
  return (
    <div className="">
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/shop" element = {<MainPage/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path="/item" element={<Item/>} />
          <Route path="/cart" element={<CartView />} />
        </Routes>
    </div>
  );
}

export default App;
