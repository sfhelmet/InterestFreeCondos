import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import PublicKeyRequest from "../components/PublicUserKeyRequest/PublicKeyRequest";
import OwnerHome from "../Pages/HomePage/Dashboards/CondoOwner/OwnerHome";
import PropertyFilesView from "../Pages/Management/PropertyFilesView"

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
    path: "/property-files",
    component: PropertyFilesView,
    name: "Property Files Management",
    protected: true,
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
];

export default routes;
