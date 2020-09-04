import React from 'react';
import { Navigate } from 'react-router-dom';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import UnauthLayout from 'src/layouts/UnauthLayout';
import AccountView from 'src/views/account/AccountView';
import MasterView from 'src/views/reports/MasterView';
import HomeView from "src/views/Home/HomeView"
import RunView from "src/views/Run/Run";
import ActivityView from "src/views/Activity/Activity";
import ActivitiesView from "src/views/Activities/Activities";
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <PrimaryLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'run', element: <RunView /> },
      { path: 'activities', element: <ActivitiesView /> },
      { path: 'activity', element: <ActivityView /> },
      { path: 'challenges', element: <MasterView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <UnauthLayout />,
    children: [
      { path: 'home', element: <HomeView /> },
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/home" /> },
      // { path: '/', element: <Navigate to="/app/run" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
