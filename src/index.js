import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const endpoint = 'https://www.stellarbiotechnologies.com/media/press-releases/json';
const provider = 'Stellar Biotechnologies';

ReactDOM.render(<App endpoint={endpoint} provider={provider} />, document.getElementById('root'));
registerServiceWorker();
