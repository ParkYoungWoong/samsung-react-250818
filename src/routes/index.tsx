import { createBrowserRouter, RouterProvider } from 'react-router'
import DefaultLayout from '@/routes/layouts/default'
import Home from '@/routes/pages/Home'
import About from '@/routes/pages/About'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
import SignIn from '@/routes/pages/SignIn'
import NotFound from '@/routes/pages/NotFound'
import { requiresAuth, guestOnly } from '@/routes/loaders'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/', // http://localhost:5173/
        element: <Home />
      },
      {
        path: '/about', // http://localhost:5173/about
        element: <About />
      },
      {
        path: '/movies',
        loader: requiresAuth,
        element: <Movies />
      },
      {
        path: '/movies/:movieId',
        loader: requiresAuth,
        element: <MovieDetails />
      },
      {
        path: '/signin',
        loader: guestOnly,
        element: <SignIn />
      }
    ]
  },
  // http://localhost:5173/alsjkfdnlksajwn4elioruasliku31234
  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
