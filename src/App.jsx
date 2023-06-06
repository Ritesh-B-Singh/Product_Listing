import { Routes, Route } from 'react-router-dom';
import './App.css'
import ProductContainer from './components/ProductContainer';
import ProductDetailPage from './components/ProductDetailPage';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductContainer />} />
        <Route path='/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
