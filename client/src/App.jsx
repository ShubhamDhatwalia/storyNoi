
import './App.css';
import Home from './components/Home';
import Errorpage from './components/Errorpage';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Story from './components/Story'
import Checkout from './components/Checkout';
import DigitalEbook from './components/DigitalEbook';

function App() {


  return (
    <>
      {/* <Home /> */}


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/story' element={<Story />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/digitalEbook' element={<DigitalEbook />} />


          </Route>

          

          <Route path='*' element={<Errorpage />} />

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
