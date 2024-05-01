import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/Utils/Center";
import AuthChecker from "./components/Auth/AuthChecker";
import { AuthenticatedUserProvider } from "./contexts/AuthenticatedUserContext";
import NexusNavbar from "./components/Navigation/Navbar";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    auth.onAuthStateChanged( async (user) => {
      if (user) {
        const userTypeSnapshot = await getUserType();
        if(userTypeSnapshot.docs.length > 1){
          const userType = userTypeSnapshot.docs[0].data().userType;
          setNavConfig(navigation(userType));
          console.info("User detected.");
        } else {
          console.info("Something went wrong when fetching user data");
        }
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
                      { route.hasNav ? <NexusNavbar /> : <></> }
                      <route.component />
                    </AuthChecker>
                  ) : (
                    <>
                    { route.hasNav ? <NexusNavbar /> : <></> }
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
