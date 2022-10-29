import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import user from './state';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App user = {user} />
);

