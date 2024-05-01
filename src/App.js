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
    <div style={{margin:"0 1rem 0 1rem", paddingTop:"env(safe-area-inset-top"}}>
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
