import React from "react";

const UserCounter = ({ total }) => {
  return (
    <div className="user-counter-container fade-in">
      <h3>Total de usuarios: {total}</h3>
    </div>
  );
};

export default UserCounter;
