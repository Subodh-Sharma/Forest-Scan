import React from 'react';
import './App.css';
import Header from "./components/Header";
import Home from './pages/Home';
import TreeCount from './pages/TreeCount';
import TreeSpecies from './pages/TreeSpecies';
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="App" style={{height: "100vh"}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tree-species" element={<TreeSpecies/>}/>
          <Route path="/tree-count" element={<TreeCount/>}/>
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
