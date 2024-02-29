import Home from "../screens/Home";
import Login from "../screens/Login";
import NotFound from "../components/NotFound/NotFound";
import PublicKeyRequest from "../components/PublicUserKeyRequest/PublicKeyRequest";
import CompanyHome from "../components/HomePages/Dashboards/CompanyDashboard";
import OwnerHome from "../components/HomePages/Dashboards/OwnerDashboard";
import Profile from "../screens/Profile";

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
  {
    path: "/owner-home",
    component: OwnerHome,
    name: "Owner Home",
    protected: false,
  },
  {
    path: "/company-home",
    component: CompanyHome,
    name: "Company Home",
    protected: false,
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
    protected: false,
  },
];

export default routes;
