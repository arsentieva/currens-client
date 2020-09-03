import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/images/running.png"
      {...props}
      style={{ width: "50px" }}
    />
  );
};

export default Logo;
