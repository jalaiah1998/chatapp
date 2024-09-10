import React from "react";

const SidebarIcon = ({ icon, setIsSelected, theme, isSelected, arr }) => {
  const iconColor = isSelected === arr ? "#7269ef" : theme ? "#a6b0cf" : "grey";
  const bgColor = theme ? "#3e4a56" : "#f7f7ff";

  return (
    <div
      className=" icons"
      onClick={setIsSelected}
      style={{
        backgroundColor: isSelected === arr ? bgColor : "",
        fontSize: arr === "logo" ? "32px" : "",
        color: arr === "logo" ? "#7269ef" : iconColor,
      }}
    >
      {icon}
    </div>
  );
};

export default SidebarIcon;
