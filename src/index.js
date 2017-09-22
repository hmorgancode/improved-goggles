import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// no api calls, so just load and process the schema here and pass it down.
const schema = require('./schema.json');
const generalInfo = {
  name: 'General Info',
  id: -1,
  containing_object: {
    properties: []
  }
};
const groups = [];
schema.forEach((block) => {
  if (block.hasOwnProperty('containing_object')) {
    groups.push(block);
  } else {
    generalInfo.containing_object.properties.push(block);
  }
});

ReactDOM.render(<App generalInfo={generalInfo} groups={groups} />, document.getElementById('root'));
registerServiceWorker();
