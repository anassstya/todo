import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.tsx'
import Footer from "./Components/Footer.tsx";
import './styles/App.scss'
import { Provider } from "react-redux";
import {store} from "./store.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../AppRouter.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <div className="app">
                  <Header/>
                  <div className="main-content">
                      <AppRoutes/>
                  </div>
                  <Footer/>
              </div>
          </BrowserRouter>
      </Provider>
  </StrictMode>
)
