import {Button, Paper, Typography} from "@mui/material";
import {SearchOff} from "@mui/icons-material";
import {Link} from "react-router";

const NotFound = () => {
  return (
    <Paper
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SearchOff sx={{fontSize: 100}} color="primary" />
      <Typography variant="h3" gutterBottom>Oops - we could not find what you are looking for</Typography>
      <Button component={Link} to="/activities" fullWidth>Return to the activities page</Button>
    </Paper>
  );
};

export default NotFound;
