import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/EnterScreen.css'
import './styles/Timeline.css'
import './styles/TaskList.css'
import './styles/SignUpPage.css';
import './styles/TaskForm.css';

render (
    <App />,
    document.getElementById('root')
);
