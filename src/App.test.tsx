import React from 'react';
import ReactDOM from 'react-dom';
//import '@testing-library/jest-dom';
//import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

