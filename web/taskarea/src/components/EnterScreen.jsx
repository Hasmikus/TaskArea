// EnterScreen.jsx

import React, {Component} from 'react';
import '../styles/EnterScreen.scss';
//import Background from '/images/';

class EnterScreen extends Component {

  render() {
    return (
      <div className="enterScreen">
          <div className="div1"></div>
          <div className="div2"></div>
          <div className="header">
             <p>MANAGING YOUR TASKS TOGETHER</p>
             <a href='signUp' className='greenButton'>Get started</a>
          </div>
          <div className="div3"></div>
          <div className="div4"></div>
    </div>
    )
  }
}
export default EnterScreen
