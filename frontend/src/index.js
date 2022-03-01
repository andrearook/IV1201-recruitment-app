import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/Store';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

/**
 * <Provider store = { store }> : We make the store available for our components by wrapping our App with Provider.
 * <Suspense fallback={<div>Loading...</div>}> : This fallback is needed since translations must be loaded at first
 *      and might not been loaded at initial render. This could be a
 *      functional component named Loading with a prettier UI, now it 
 *      is just a div with a text: Loading...
 * 
 * <I18nextProvider i18n={i18n}>  :   Make i18n accessable to whole app with the I18nextProvider   
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18n}> 
          <App />
      </I18nextProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);