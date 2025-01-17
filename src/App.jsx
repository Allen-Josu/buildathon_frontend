
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
