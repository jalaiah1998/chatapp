import React from "react";

const Input = ({ onChange, ...props }) => {
  return (
    <div className="w-100 d-flex flex-column mb-3 ">
      <label className="mb-2" style={{ fontSize: "1rem", fontWeight: "500" }}>
        {props.label}{" "}
      </label>
      <div className="d-flex ">
        <div
          style={{
            width: "2.75rem",
            height: "2.75rem",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
            backgroundColor: "#f7f7ff",
            padding: "0.7rem 0.9rem",
            borderLeft: "solid 1px #e0eee5",
            borderTop: "solid 1px #e0eee5",
            borderBottom: "solid 1px #e0eee5",
          }}
        >
          {props.icon}
        </div>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={props.placeholder}
          style={{
            border: "solid 1px #e0eee5",
            borderRadius: "none",
            width: "100%",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            paddingLeft: "1rem",
          }}
        />
      </div>
    </div>
  );
};

export default Input;
