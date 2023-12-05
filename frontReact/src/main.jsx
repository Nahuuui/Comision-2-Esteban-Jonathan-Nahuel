import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import {AppRouter} from './AppRouter.jsx'
import AuthProvider from "./providers/AuthProvider.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>
</AuthProvider>
)
