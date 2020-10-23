import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app.js';

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<Main />, root)
