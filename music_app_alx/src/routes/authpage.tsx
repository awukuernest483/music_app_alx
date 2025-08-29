import React from "react";
import CustomInput from "../components/custominput";
import Button from "../components/button";
import authimage from "../assets/images/authback.jpg";
import { redirectToAuthCodeFlow, spotifyLogin } from "../script";
import logo from "../assets/logo.svg";

const AuthPage = () => {
  return (
    <div className="w-full h-full flex ">
      <img
        src={authimage}
        alt="Auth"
        className="w-1/2 h-full object-cover lg:flex hidden"
      />
      <div className="flex flex-col w-full h-full flex-1">
        <form className="flex flex-col gap-20 m-auto w-3/4 text-[#9CB2BA]">
          <div className="items-center justify-center flex-col flex">
            <img src={logo} className="h-30 mt-20 mb-20" />

            <p className="font-bold text-4xl text-center text-white">
              Feel the Beat, Live the Moment
            </p>
            <p className="text-white/50 text-xl text-center text-wrap">
              Your music, your vibe. Discover, stream, and groove anywhere.
            </p>
          </div>

          {/* <CustomInput placeholder="Username or Email" type="text" />
          <CustomInput placeholder="Password" type="password" /> */}
          {/* <p className="text-base text-left cursor-pointer">Forgot Password?</p> */}
          <div className=" w-full items-center flex justify-center">
            <Button
              textcolor="text-white"
              color="bg-[#1DB954]"
              text="Login with Spotify"
              onClick={(e) => {
                e.preventDefault();
                console.log("Work");
                spotifyLogin();
              }}
              type="submit"
              imgpath="sksk"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
