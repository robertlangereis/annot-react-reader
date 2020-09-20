import React from 'react'
import './App.css'
import Cookies from 'universal-cookie'
import FileGrabber from './components/FileGrabber/FileGrabber'

function App () {
  const cookies = new Cookies()
  const cookieList = [
    'currency',
    'CB_URL',
    'sc_is_visitor_unique',
    '_derived_epik',
    '_pin_unauth',
    'gr_session',
    '_gid',
    'country'
  ]
  // var d = new Date()
  // const yesterday = d.setDate(d.getDate() - 5)
  cookieList.forEach(cookie =>
    cookies.remove(cookie, {
      path: '/',
      domain: '.flaticon.com'
    })
  )
  return <FileGrabber />
}

export default App
