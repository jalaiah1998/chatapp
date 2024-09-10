import React from "react";

const Message = ({ content, left, sentAt, user, theme, chatUser, likes, onLike }) => {
  const sentDate = new Date(sentAt);

  return (
    <div
      className="mb-4 w-100 d-flex"
      style={{ justifyContent: left ? "flex-start" : "flex-end" }}
    >
      <div className="d-flex" style={{ flexDirection: left ? "row" : "row-reverse" }}>
        <div className="d-flex">
          <div className="d-flex flex-column justify-content-end">
            <img
              className="rounded-circle"
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUfHOObCMLKoXllPHh-neVeHGtYnkkiZWfg&s'
              alt=""
              style={{ width: "30.19px", height: "30.19px" }}
            />
          </div>
        </div>
        <div className="d-flex flex-column px-3">
          <div
            className="px-3 py-2 d-flex flex-column"
            style={{
              backgroundColor: left ? "#7269ef" : theme ? "rgb(54 64 74)" : "#f5f7fb",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              <div>{content}</div>
            </div>
            <div
              className="w-100 d-flex justify-content-end"
              style={{
                fontSize: "13px",
                paddingTop: "5px",
                color: left ? "#ffffff80" : theme ? "#abb4d2" : "#7a7f9a",
              }}
            >
              {sentDate.getHours().toString().padStart(2, "0")}:
              {sentDate.getMinutes().toString().padStart(2, "0")}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontSize: "13px" }}>
              {left ? chatUser?.username : user?.username}
            </div>
            {left && (
              <button
                onClick={onLike}
                style={{
                  border: "none",
                  background: "none",
                  color: theme ? "#eff2f7" : "#343a40",
                  cursor: "pointer",
                }}
              >
                ❤️ {likes.length}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
