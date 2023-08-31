// App.js
import React from 'react';
import { Routes,  Route } from "react-router-dom";
import ChatBoxPage from './ChatBoxPage';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <>
       
      <Routes>
        <Route  path="/" element={<LoginPage />} /> 
        <Route  path="/ChatBoxPage" element={<ChatBoxPage/>}/>
      </Routes>
      
    
    </>
  )
 

};

export default App;
