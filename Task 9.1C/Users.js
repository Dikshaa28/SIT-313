import React from "react";
import { faker } from "@faker-js/faker";
import "./Users.css";

function Users() {
  const cardCount = 8;

  return (
    <div className="users-container">
      {[...Array(cardCount)].map((_, index) => (
        <div key={index} className="user-card">
          <img
            src={faker.image.avatar() || "https://via.placeholder.com/150"}
            alt="avatar"
            className="user-avatar"
          />
          <p>{faker.person.fullName() || "Unknown User"}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
