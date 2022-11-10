import React from "react";

const Toggle = (props) => {
  const { checked, onClick, ...rest } = props;
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[100px] h-[52px] relative cursor-pointer rounded-full p-1 transition-all ${
          checked ? "bg-green-400" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-11 h-11 bg-white rounded-full inline-block ${
            checked ? "translate-x-[48px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
