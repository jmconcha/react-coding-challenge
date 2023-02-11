import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ItemList, ItemDetails } from './components';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ItemList />,
  },
  {
    path: 'item/:id',
    element: <ItemDetails />,
  },
]);

ReactDOM.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
  document.getElementById('root')
);
