import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import bridge from '@vkontakte/vk-bridge';

bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));