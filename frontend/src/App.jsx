import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import ProfilePage from './pages/ProfilePage'

import ProtectedRoute from './ProtectedRoute'
import FormProduct from './components/Product/FormProduct'
import ProductListView from './pages/Product/ProductListView'
import ProductDetails from './components/Product/ProductDetails'
import FormStore from './components/Store/FormStore'
import { StoreProvider } from './context/StoresContext'
import StoreListView from './pages/Store/StoreListView'
import StoreOwnerListView from './pages/Store/StoreOwnerListView'
import { ProductProvider } from './context/ProductsContext'
import { CartProvider } from './context/CartContext'
import StoreAdminListView from './pages/Store/StoreAdminListView'

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<StoreListView />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/stores' element={<StoreListView />} />
                <Route path='/products/:id' element={<ProductListView />} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/product/:id' element={<ProductDetails />} />
                  <Route path='/add-product' element={<FormProduct />} />
                  <Route path='/edit-product/:id' element={<FormProduct />} />

                  <Route path='/stores/owner' element={<StoreOwnerListView />} />
                  <Route path='/stores/admin' element={<StoreAdminListView/>} />
                  <Route path='/add-store' element={<FormStore />} />
                  <Route path='/edit-store/:id' element={<FormStore />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </StoreProvider>
    </AuthProvider>
  )
}

export default App
