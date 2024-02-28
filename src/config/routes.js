import Home from "../screens/Home";
import PropertyFilesView from "../screens/PropertyFilesView"
import Login from "../screens/Login";
import NotFound from "../components/NotFound/NotFound";

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
    component: NotFound,
    name: "Not Found",
    protected: false,
  },
];

export default routes;
