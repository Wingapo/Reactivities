import {Box, Container, CssBaseline} from "@mui/material";
import Navbar from "./Navbar.tsx";
import {Outlet, useLocation} from "react-router";
import "./styles.css";
import HomePage from "../../features/home/HomePage.tsx";

const App = () => {
  const {pathname} = useLocation();

  return (
    <Box sx={{bgcolor: '#eee', minHeight: '100vh'}}>
      <CssBaseline />
      {pathname === '/' ? <HomePage /> : (
        <>
          <Navbar />
          <Container maxWidth={false} sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
};

export default App;
