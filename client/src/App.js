import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';
import FileGrabber from './FileGrabber/fileGrabber';



function App() {
  const cookies = new Cookies();
  const cookieList = ['currency', 'CB_URL', 'sc_is_visitor_unique', '_derived_epik', '_pin_unauth', 'gr_session', '_gid', 'country']
  cookieList.forEach(cookie => cookies.remove(cookie, { sameSite: lax }))

  return (
    <FileGrabber/>
    );
}

export default App;
