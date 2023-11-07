import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Dashboard from './pages/Dashboard'
import RootLayout from './pages/RootLayout'
import NotesPage from './pages/Notes'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    children: [
      {path: '/', element: <HomePage />},
      {path: '/create/:notebookId', element: <CreatePage />},
      {path: '/notes/:notebookId', element: <NotesPage />},
      {path: '/dashboard', element: <Dashboard />},
    ]
  },
  
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
