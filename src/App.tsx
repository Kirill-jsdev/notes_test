import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Dashboard from './pages/Dashboard'
import RootLayout from './pages/RootLayout'
import NotesPage from './pages/Notes'
import SearchPage from './pages/SearchPage'
import EditPage from './pages/EditPage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <HomePage />},
      {path: '/create/:notebookId', element: <CreatePage />},
      {path: '/edit/:notebookId/:noteId', element: <EditPage />},
      {path: '/notes/:notebookId', element: <NotesPage />},
      {path: '/search', element: <SearchPage />},
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
