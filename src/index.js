import React from 'react';
import ReactDOM from 'react-dom';
import TestForm from './TestForm';
import 'antd/dist/antd.css'

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<TestForm />, document.getElementById('root'));