import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import Layout from 'components/Layout';
import { Provider } from 'react-redux';
import { store } from './store/Store';

function App() {
  return (
   <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="registration" element={<RegisterPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
  );
}

export default App;

// TestAuth & TestAuth2 only for example for use api
