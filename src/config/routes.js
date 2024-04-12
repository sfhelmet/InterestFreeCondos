import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PublicKeyRequest from "../components/PublicUserKeyRequest/PublicKeyRequest";
import OwnerHome from "../pages/HomePage/Dashboards/CondoOwner/OwnerHome";
import PropertyFilesView from "../pages/Management/PropertyFilesView";
import GenerateTokenForm from "../components/NexusButton/GenerateFormToken";
import PropertyCreation from "../pages/PropertyCreation/PropertyCreation";
import FinancialPage from "../pages/FinancialPage/FinancialPage";
import ReservationPage from "../pages/ReservationPage/ReservationPage"
import RequestSubmission from "../pages/RequestSubmission/RequestSubmission";

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
  {
    path: "/token", //for testing
    component: GenerateTokenForm,
    name: "Generate Token",
    protected: false,
  },
  {
    path: "/property-creation",
    component: PropertyCreation,
    name: "Property Creation",
    protected: false,
  },
  {
    path: "/financials",
    component: FinancialPage,
    name: "Financial Page",
    protected: false,
  },
  {
    path: "/reservations",
    component: ReservationPage,
    name: "Reservation Page",
    protected: false
  },
  {
    path: "/request-submission",
    component: RequestSubmission,
    name: "Request Submission Page",
    protected: false
  }
];

export default routes;
