import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrensContext } from "../../CurrensContext";
import { ActivityMap } from './ActivityMap';

const Activity = () => {
  const { authToken } = useContext(CurrensContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
       navigate("/login");
    }
  });

  return (
    <div>
      <ActivityMap />
    </div>
  );
};

export default Activity;
