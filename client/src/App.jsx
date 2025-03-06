
import './App.css';
import Home from './components/home';
import Errorpage from './components/Errorpage';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';

function App() {


  return (
    <>
      {/* <Home /> */}


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Route>


          <Route path='*' element={<Errorpage />} />

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
