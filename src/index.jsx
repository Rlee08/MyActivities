import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Add these Tailwind directives
import './styles/tailwind.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);