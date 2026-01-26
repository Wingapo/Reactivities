import {Box, Container, CssBaseline} from "@mui/material";
import Navbar from "./Navbar.tsx";
import {Outlet} from "react-router";

const App = () => {
  return (
    <Box sx={{bgcolor: '#eee', minHeight: '100vh'}}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default App;
