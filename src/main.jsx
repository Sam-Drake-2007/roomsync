/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import ContentPage from './content.jsx'
import RoommatePage from './roommate.jsx'
import HousingPage from './housing.jsx'
import HousingResultsPage from './housing-results.jsx'
import RoommateResultsPage from './roommate-results.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContentPage />
  },
  {
    path: '/roommate',
    element: <RoommatePage />
  },
  {
    path: '/housing',
    element: <HousingPage />
  },
  {
    path: '/h-results',
    element: <HousingResultsPage />
  },
  {
    path: '/r-results',
    element: <RoommateResultsPage />
  }
]);

  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
