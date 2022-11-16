import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import Layout from 'components/Layout';
import { useAppSelector } from 'store/hooks/redux';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="login" element={isLoggedIn ? <Navigate to="main" /> : <LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="registration"
            element={isLoggedIn ? <Navigate to="main" /> : <RegisterPage />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// TestAuth & TestAuth2 only for example for use api
