import './App.css';
import Router from './routes';
import AuthProvider from './Utils/Auth';
import AppProvider from './Utils/App';
import { BrowserRouter } from 'react-router-dom'
import AddRoomModal from './components/Modals/AddRoomModal';
import React from 'react';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Router/>
          <AddRoomModal/>
          <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
