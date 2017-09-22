import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const schema = require('./schema.json');

ReactDOM.render(<App schema={schema} />, document.getElementById('root'));
registerServiceWorker();
