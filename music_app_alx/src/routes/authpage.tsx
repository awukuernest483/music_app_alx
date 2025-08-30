import authimage from "../assets/images/authback.jpg";
import logo from "../assets/logo.svg";
import Button from "../components/button";
import { spotifyLogin } from "../script";

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
            <img src={logo} className="h-30  mb-20 " />

            <p className="font-bold md:text-4xl text-lg text-center text-white">
              Feel the Beat, Live the Moment
            </p>
            <p className="text-white/50 md:text-xl text-sm text-center text-wrap">
              Your music, your vibe. Discover, stream, and groove anywhere.
            </p>
          </div>

          <div className=" w-full items-center flex justify-center">
            <Button
              textcolor="text-white"
              color="bg-[#1DB954]"
              text="Login with Spotify"
              onClick={(e) => {
                e.preventDefault();
                console.log("cvldjfmld.");
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
