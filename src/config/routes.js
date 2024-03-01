import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import PublicKeyRequest from "../components/PublicUserKeyRequest/PublicKeyRequest";
import OwnerHome from "../Pages/HomePage/Dashboards/OwnerDashboard";
import CompanyHome from "../Pages/HomePage/Dashboards/CompanyDashboard";
import Profile from "../Pages/ProfilePage/Profile";

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
    component: NotFoundPage,
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
    name: "Profile Page",
    protected: false,
  },
];

export default routes;
