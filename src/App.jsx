import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import Store from "./Store";
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={Store}>
          <BrowserRouter>
            <Routes>
              <Route path="/profile" element={<ProfilePage />} />
              < Route path="login" element={<AuthPage />} />
              <Route path="*" element={<AuthPage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </>
  )
}