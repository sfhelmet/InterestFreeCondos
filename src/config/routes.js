import Login from "../pages/LoginPage/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import UserKeyRegistration from "../components/UserKeyRegistration/UserKeyRegistration";
import OwnerHome from "../pages/HomePage/Dashboards/CondoOwner/OwnerHome";
import PropertyFilesView from "../pages/Management/PropertyFilesView";
import GenerateTokenForm from "../components/NexusButton/GenerateFormToken";
import PropertyCreation from "../pages/PropertyCreation/PropertyCreation";
import FinancialPage from "../pages/FinancialPage/FinancialPage";
import ReservationPage from "../pages/ReservationPage/ReservationPage"
import RequestSubmission from "../pages/Requests/Submissions/RequestSubmission";
import RequestHandling from "../pages/Requests/Handling/RequestHandling";
import Profile from "../pages/ProfilePage/Profile";

const routes = [
  {
    path: "",
    component: UserKeyRegistration,
    name: "Authenticated Limited Home Page",
    protected: true,
    hasNav: true
  },
  {
    path: "/",
    component: UserKeyRegistration,
    name: "Authenticated Limited Home Page",
    protected: true,
    hasNav: true
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
    hasNav: true
  },
  {
    path: "*",
    component: NotFoundPage,
    name: "Not Found",
    protected: false,
  },
  {
    path: "/public-home", // For users to input their keys provided from the company
    component: UserKeyRegistration,
    name: "Public Key Request",
    protected: true,
  },
  {
    path: "/owner-home",
    component: OwnerHome,
    name: "Owner Home",
    protected: false,
    hasNav: true
  },
  {
    path: "/token", //For companies to generate keys/tokens for renters / condo owners
    component: GenerateTokenForm,
    name: "Generate Token",
    protected: false,
    hasNav: true
  },
  {
    path: "/property-creation",
    component: PropertyCreation,
    name: "Property Creation",
    protected: false,
    hasNav: true
  },
  {
    path: "/financials",
    component: FinancialPage,
    name: "Financial Page",
    protected: false,
    hasNav: true
  },
  {
    path: "/reservations",
    component: ReservationPage,
    name: "Reservation Page",
    protected: false,
    hasNav: true
  },
  {
    path: "/request-submission",
    component: RequestSubmission,
    name: "Request Submission Page",
    protected: true,
    hasNav: true
  },
  {
    path: "/request-handling",
    component: RequestHandling,
    name: "Request Handling Page",
    protected: false,
    hasNav: true
  },
  {
    path: "/profile",
    component: Profile,
    name: "User Profile Page",
    protected: true,
    hasNav: true
  },
];

export default routes;
