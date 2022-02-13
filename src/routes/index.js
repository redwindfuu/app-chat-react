import React from 'react'
import {BrowserRouter,  Routes , Route , Navigation} from 'react-router-dom'
import ChatRoom from '../layout/pages/ChatRoom'
import Login from '../layout/pages/Login'

export default function Router() {
  return (
    
        <Routes>
            <Route path='/'  element={<ChatRoom />}/>
            <Route path='/login'  element={<Login/>}/>
        </Routes>      
    
  )
}
