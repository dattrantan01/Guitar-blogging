import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useAuth } from "../contexts/auth-context";
import IconEyeClose from "../Icon/IconEyeClose";
import IconEyeOpen from "../Icon/IconEyeOpen";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-blog/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";

const SignInStyle = styled.div`
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
  .button-container {
    width: 50%;
    margin: 0 auto;
  }
  .account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "your password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isValid, errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleNavigate = useNavigate();
  const onSubmit = async (value) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, value.email, value.password);
    handleNavigate("/");
  };

  useEffect(() => {
    if (userInfo?.email) handleNavigate("/");
  }, [userInfo, handleNavigate]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  return (
    <SignInStyle>
      <div className="container">
        <img src="guitar.svg" alt="guitar" className="logo" />
        <h1 className="heading">Guitar blogging</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="account">
            Don't have an account? <NavLink to={"/sign-up"}>Sign up</NavLink>
          </div>
          <div className="button-container">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign In
              {/* <LoadingSpinner></LoadingSpinner> */}
            </Button>
          </div>
        </form>
      </div>
    </SignInStyle>
  );
};

export default SignInPage;
