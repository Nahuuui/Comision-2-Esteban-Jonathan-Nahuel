import ReactDOM from "react-dom/client";
import { AppRouter } from "./AppRouter.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </AuthProvider>
)