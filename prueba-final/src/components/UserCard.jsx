import React from "react";

const UserCard = ({ user, index }) => {
  return (
    <div
      className="feature-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="feature-icon">👤</div>
      <h3>{user.nombre}</h3>
      <p>
        <strong>Email:</strong> {user.correo}
      </p>
      <p>
        <strong>País:</strong> {user.pais}
      </p>
    </div>
  );
};

export default UserCard;
