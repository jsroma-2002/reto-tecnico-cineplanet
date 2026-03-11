import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Candystore from '../pages/Candystore';
import Payment from '../pages/Payment';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/candystore" element={<Candystore />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default AppRouter;
