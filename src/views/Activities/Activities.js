import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrensContext } from "../../CurrensContext";
import ActivitiesList from "./ActivitiesList";

const Activities = () => {
    const { authToken } = useContext(CurrensContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!authToken) {
         navigate("/login");
      }
    });

    return (
      <div>
          <ActivitiesList />
      </div>
    );
  };

export default Activities;
