import { useEffect } from "react";
import Logout from "../components/auth/Logout/Logout";
import Center from "../components/utils/Center";
import Profile from "./Profile/Profile";

const Home = (props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
      <Profile />
      <Logout />
    </Center>
  );
};

export default Home;
