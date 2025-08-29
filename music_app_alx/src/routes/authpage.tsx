import React from "react";
import CustomInput from "../components/custominput";
import Button from "../components/button";
import authimage from "../assets/images/authimage.png";
import { redirectToAuthCodeFlow, spotifyLogin } from "../script";

const AuthPage = () => {
  return (
    <div className="w-full h-full flex">
      <img
        src={authimage}
        alt="Auth"
        className="w-full h-full object-cover lg:flex hidden"
      />
      <div className="flex flex-col w-full h-full">
        <form className="flex flex-col gap-6 m-auto w-3/4 text-[#9CB2BA]">
          <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>
          {/* <CustomInput placeholder="Username or Email" type="text" />
          <CustomInput placeholder="Password" type="password" /> */}
          {/* <p className="text-base text-left cursor-pointer">Forgot Password?</p> */}
          <Button
            text="Login with Spotify"
            onClick={(e) => {
              e.preventDefault();
              console.log("Work");
              spotifyLogin();
            }}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
