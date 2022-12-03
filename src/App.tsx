import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';
import Page404 from 'pages/Page404';
import Layout from 'components/Layout';
import { extractUserIdFromToken, getUserStateFromLocalStorage } from 'utils/authUtils';
import { useGetUserByIdQuery } from 'api/UsersApi';
import { useState, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks/redux';
import { userSlice } from 'store/reducers/userSlice';

function App() {
  const { isLoggedIn, token } = getUserStateFromLocalStorage();
  const [userId, setUserId] = useState('');
  const dispatch = useAppDispatch();
  const { updateUser } = userSlice.actions;

  const { data: userData } = useGetUserByIdQuery(
    { userId },
    {
      skip: !userId,
    }
  );
  if (isLoggedIn && token && userId === '') {
    setUserId(extractUserIdFromToken(token));
  }

  useEffect(() => {
    if (userData) {
      dispatch(updateUser(userData));
    }
  }, [dispatch, updateUser, userData]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
