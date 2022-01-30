import { createContext } from "react";
import { useAuthState } from "../hooks/use-auth";

export const UserContext = createContext();
const UserProvider = (props) => {
  const { user } = useAuthState();
  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
