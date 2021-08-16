import { Divider } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./members.css";



export default function Members({ usersInProject }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="project_members">
      <div className="search_feature">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
        <h3>MEMBERS</h3>
        <Divider /> 
        {usersInProject.map((user, index) => {
          return (
            <div className="all_project_members" key={index}>
              <img className="project_member_avatar" src={user.avatar} alt={user.name} />
              <p><strong>{user.user_name}</strong></p>
            </div>
          );
        })}
      
    </div>
  );
}
