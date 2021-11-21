import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "react-toastify/dist/ReactToastify.css"

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/index';

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: "top-right",
  hideProgressBar: false,
  newestOnTop: true,
  rtl: false,
  pauseOnHover: true
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
