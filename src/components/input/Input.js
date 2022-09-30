import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyle = styled.div`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    border: 1px solid transparent;
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name = "",
  type = "text",
  icon,
  control,
  children,
  ...props
}) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });
  return (
    <InputStyle hasIcon={children ? true : false}>
      <input id={name} type={type} className="input" {...field} {...props} />
      {children}
    </InputStyle>
  );
};

export default Input;
