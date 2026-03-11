import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Candystore from '../pages/Candystore';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/candystore" element={<Candystore />} />
    </Routes>
  );
}

export default AppRouter;
