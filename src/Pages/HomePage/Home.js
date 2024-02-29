import { useEffect } from "react";
import Logout from "../../Components/Auth/Logout/Logout";
import Center from "../../Components/Utils/Center";
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
