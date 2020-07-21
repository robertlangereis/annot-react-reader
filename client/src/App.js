import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';
import FileGrabber from './FileGrabber/fileGrabber';



function App() {
  const cookies = new Cookies();
  cookies.getAll({ doNotParse: true });
  return (
    <FileGrabber/>
    );
}

export default App;
