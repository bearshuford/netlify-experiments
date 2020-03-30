import React from 'react';
import ReactDOM from 'react-dom'; 
import { ArcRoot, defaultOptions } from '@mixer/arcade-machine-react';
import 'joypad.js';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';
import AuthContext from './AuthContext';

const FocusedApp = ArcRoot(() => <App />, defaultOptions());

ReactDOM.render(
  <AuthContext>
    <FocusedApp />
  </AuthContext>,
  document.getElementById('root')
);