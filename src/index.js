import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'
import {PostContextProvider} from './context/PostContext'
import { SocketContextProvider } from './context/SocketContext';

ReactDOM.render(
  <React.StrictMode>
    <PostContextProvider>
      <AuthContextProvider>
        <SocketContextProvider>
        <App /> 
        </SocketContextProvider>
      </AuthContextProvider>
    </PostContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

