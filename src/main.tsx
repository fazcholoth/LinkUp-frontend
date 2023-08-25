import ReactDOM from 'react-dom/client'
import appRouter from "./routes/AppRouter"
import {RouterProvider} from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from './state/store';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { Provider } from 'react-redux';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={appRouter}/>  
    </PersistGate>
    </Provider>
    <ToastContainer />
  </>
   
)
