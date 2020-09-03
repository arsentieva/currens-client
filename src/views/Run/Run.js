import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RunMap } from 'src/views/Run/RunMap';
import { CurrensContext } from "../../CurrensContext";

const Run = () => {
  const { authToken } = useContext(CurrensContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
       navigate("/login");
    }
  });

  return (
    <div>
      <RunMap />
    </div>
  );
};

export default Run;
