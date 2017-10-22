import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './styles/EnterScreen.css'
import './styles/Profile.css'
import './styles/SignUpPage.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render (
  <App/>,
  document.getElementById('root')
);
