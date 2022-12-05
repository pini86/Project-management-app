import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';
import Page404 from 'pages/Page404';
import Layout from 'components/Layout';
import { useAppDispatch, useAppSelector } from './store/hooks/redux';
import { userSlice } from './store/reducers/userSlice';
import { useEffect } from 'react';
import { extractUserIdFromToken } from 'utils/authUtils';

function App() {
  const { isLoggedIn, token, user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { updateUser } = userSlice.actions;

  useEffect(() => {
    if (token) {
      dispatch(updateUser({ ...user, _id: extractUserIdFromToken(token) }));
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="main" element={<MainPage />} />
          <Route
            path="boards/:boardId"
            element={isLoggedIn ? <BoardPage /> : <Navigate to="../" />}
          />
          <Route path="login" element={isLoggedIn ? <WelcomePage /> : <LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="registration" element={isLoggedIn ? <WelcomePage /> : <RegisterPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
