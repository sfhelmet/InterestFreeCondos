import { useEffect } from "react";
import Logout from "../../components/Auth/Logout/Logout";
import Center from "../../components/Utils/Center";
import Profile from "../ProfilePage/Profile";

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
