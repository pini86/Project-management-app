import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import Page404 from './pages/Page404';
import Layout from './components/Layout';
import { extractUserIdFromToken, getUserStateFromLocalStorage } from './utils/authUtils';
import { useGetUserByIdQuery } from './api/UsersApi';
import { useState } from 'react';
import { useAppDispatch } from 'store/hooks/redux';
import { userSlice } from './store/reducers/userSlice';
import { useAppSelector } from './store/hooks/redux';

function App() {
  const { token } = getUserStateFromLocalStorage();
  const isLoggedIn =
    useAppSelector((state) => state.userReducer.isLoggedIn) ||
    getUserStateFromLocalStorage().isLoggedIn;

  const [userId, setUserId] = useState('');
  const dispatch = useAppDispatch();
  const { updateUser } = userSlice.actions;

  const { data: userData } = useGetUserByIdQuery(
    { userId },
    {
      skip: !userId,
    }
  );
  if (userData) {
    dispatch(updateUser(userData));
  }
  if (isLoggedIn && token && userId === '') {
    setUserId(extractUserIdFromToken(token));
  }

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
          <Route path="login" element={isLoggedIn ? <Navigate to="../" /> : <LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="registration"
            element={isLoggedIn ? <Navigate to="../" /> : <RegisterPage />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
