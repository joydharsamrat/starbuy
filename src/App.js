import { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes/Routes';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  return (
    <div>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
