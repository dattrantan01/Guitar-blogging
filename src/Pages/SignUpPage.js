import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import IconEyeClose from "../Icon/IconEyeClose";
import IconEyeOpen from "../Icon/IconEyeOpen";

const SignUpPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  /* background-color: ${(props) => props.theme.primary}; */
  .logo {
    margin: 0 auto;
    width: 140px;
    height: 140px;
  }
  .heading {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { handleSubmit, control, formState, watch } = useForm({});
  const onSubmit = () => {};
  return (
    <SignUpPageStyle>
      <div className="container">
        <img src="guitar.svg" alt="guitar" className="logo" />
        <h1 className="heading">Guitar blogging</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label htmlFor="fullname" className="label">
              Fullname
            </Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email" className="label">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Input
              type={togglePassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {togglePassword ? (
                <IconEyeOpen
                  className="input-icon"
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              ) : (
                <IconEyeClose
                  className="input-icon"
                  onClick={() => setTogglePassword(true)}
                ></IconEyeClose>
              )}
            </Input>
          </Field>
        </form>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;
