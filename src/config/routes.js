import Home from "../screens/Home";
import Login from "../screens/Login";
import NotFound from "../components/NotFound/NotFound";
import PublicKeyRequest from "../components/PublicUserKeyRequest/PublicKeyRequest";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "*",
    component: NotFound,
    name: "Not Found",
    protected: false,
  },
  {
    path: "/public-home",
    component: PublicKeyRequest,
    name: "Public Key Request",
    protected: false,
  },
];

export default routes;
