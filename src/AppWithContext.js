import React, { useState } from "react";
import { CurrensContext } from "./CurrensContext";
import App from "./App";
import { apiBaseUrl } from './config';

const AppWithContext = () => {
    const localStorageToken = localStorage.getItem("state-currens-token");
    const [authToken, setAuthToken] = useState(localStorageToken);
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(true);

    const login = (token) => {
        window.localStorage.setItem("state-currens-token", token);
        setAuthToken(token);
    };

    const logout = () => {
        window.localStorage.clear();
        setAuthToken(null);
    };

    const loadActivities = async () => {
        const response = await fetch(`${apiBaseUrl}/activities/`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          if (response.ok) {
            const allActivities = await response.json();
            setActivities(allActivities.activities);
        }
    };

    const getActivity = async (id) => {
        const response = await fetch(`${apiBaseUrl}/activities/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          if (response.ok) {
            const selectedActivity = await response.json();
            setActivity(selectedActivity.activity);
        }
    };

    const loadUserProfile = (age, gender, weight) => {
        if ((age === null || age === undefined || age === 0)
        || (gender === null || gender === undefined || gender === 0)
        || (weight === null || weight === undefined || weight === 0)) {
            setIsProfileComplete(false);
        } else {
            setIsProfileComplete(true);
        }
    };

return (
    <CurrensContext.Provider value={{ authToken, login, logout, activities, loadActivities, loadUserProfile, isProfileComplete, activity, getActivity }}>
        <App />
    </CurrensContext.Provider>
 );
};

export default AppWithContext;
