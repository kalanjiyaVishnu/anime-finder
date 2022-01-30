import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useLocation } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import OnePunchMan from "./one.jpg";
const Register = () => {
  useEffect(() => {
    document.head.title = "register";
  }, []);
  const { user } = useContext(UserContext);
  const loc = useLocation();
  return (
    <main className="h-screen  min-h-screen container md:max-w-screen-2xl w-5/6 mx-auto overflow-scroll py-4 text-gray-800">
      <h1 className="font-bold text-2xl ">
        <img src="https://img.icons8.com/pastel-glyph/64/000000/warning-triangle.png" />
        sideEffects
      </h1>
      <div className="w-full h-full flex flex-col justify-center items-center -mt-32">
        <h1 className="font-semibold text-3xl text-gray-800 mb-3">Sign In</h1>
        <div className="flex items-center justify-center z-50 space-x-2">
          <div
            className="py-2 px-4 rounded-md bg-gray-800
          text-white-light text-center font-medium cursor-pointer"
            onClick={async () => {
              await signInWithPopup(auth, new GoogleAuthProvider());
            }}
          >
            sigin in with
          </div>
          <div className="w-8 h-8">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              className="object-contain"
            />
          </div>
        </div>

        {/* <button
          onClick={() => {
            signOut(auth);
            console.log("user fucking left");
            localStorage.clear();
          }}
        >
          sign0ut
        </button>  */}
        {user && <div>{user.displayName}</div>}

        <img
          src={OnePunchMan}
          className="w-screen h-screen absolute inset-0 opacity-10 -z-0 object-cover"
          alt=""
        />
      </div>
    </main>
  );
};
export default Register;
