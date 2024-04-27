import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth, db } from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/Utils/Center";
import AuthChecker from "./components/Auth/AuthChecker";
import { AuthenticatedUserProvider } from "./contexts/AuthenticatedUserContext";
import NexusNavbar from "./components/Navigation/Navbar";
import * as Navigations from './navlinks'

import { collection, getDocs, query, where } from "firebase/firestore" 

function App() {
  const [loading, setLoading] = useState(true);
  const [navConfig, setNavConfig] = useState([]);

  const getUserType = () => {
      let uid = auth.currentUser.uid;
        
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where('userID', '==', uid));

      return getDocs(userQuery);
  }

  const navigation = (userType) => {
    switch (userType) {
        case "RENTAL": 
            return Navigations.rental;
        case "OWNER":
            return Navigations.owner;
        case "MANAGEMENT": 
            return Navigations.management;
        case "EMPLOYEE":
            return Navigations.employee;
        default:
          return [];
    }
  }

  useEffect( () => {
    auth.onAuthStateChanged( async (user) => {
      if (user) {
        const userTypeSnapshot = await getUserType();
        const userType = userTypeSnapshot.docs[0].data().userType;
        setNavConfig(navigation(userType));
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Center>
        <CircularProgress />
      </Center>
    );

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthenticatedUserProvider>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthChecker>
                      { route.hasNav ? <NexusNavbar links={navConfig} /> : <></> }
                      <route.component />
                    </AuthChecker>
                  ) : (
                    <>
                    { route.hasNav ? <NexusNavbar links={navConfig} /> : <></> }
                    <route.component />
                    </>
                  )
                }
              />
            ))}
          </Routes>
        </AuthenticatedUserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
