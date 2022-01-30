import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";

//sometime this not working [isAuth] when tested isAuth state the state change not captured but the state is change so there is a delay
// like
// false
// user is in the auth
// false
// import { useAuthState } from "react-firebase-hooks/auth";
// so created a custom hook to listen for the state to change

export function useAuthState() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("user added to local", authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        console.log("user removed from localStorage");
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => listener();
  }, [auth]);

  return { user };
}
