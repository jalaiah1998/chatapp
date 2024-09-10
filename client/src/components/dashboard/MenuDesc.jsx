import React, { useState } from "react";
import ChatMenu from "./ChatMenu";
import Profile from "./Profile";
import Groups from "./Groups";


const MenuDesc = ({
  setChatBox,
  theme,
  isSelected,
  chatUser,
  setConversationId,
  setChatUser,
  users,
  user, myGroups,fetchGroups, groupSelected,setGroupSelected
}) => {





  return (
    <div
      id="middle"
      className="menudesc"
      style={{
        backgroundColor: theme ? "#303841" : "#f7f7ff",
        overflow: "hidden",
      }}
    >
      {isSelected === "My Profile" && (
        <Profile isSelected={isSelected} theme={theme}  user={user}/>
      )}
      {isSelected === "Chats" && (
        <ChatMenu
          isSelected={isSelected}
          theme={theme}
          chatUser={user}
          groupSelected={groupSelected}
          users={[]}
          setChatBox={(e) => setChatBox(e)}
          setChatUser={(e) => setChatUser(e)}
          myGroups={myGroups}
        />
      )}
      {isSelected === "Groups" && (
        <Groups
          isSelected={isSelected}
          theme={theme}
          groupSelected={groupSelected}
          setGroupSelected={(e) => setGroupSelected(e)}
          user={user}
          myGroups ={myGroups}
          fetchGroups={fetchGroups}
          users={users}
        />
      )}
     
    </div>
  );
};

export default MenuDesc;
