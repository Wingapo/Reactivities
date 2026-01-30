import {useLocation} from "react-router";
import {Divider, Paper, Typography} from "@mui/material";

const ServerError = () => {
  const { state } = useLocation();

  console.log(state);

  return (
    <Paper>
      {state.error ? (
        <>
          <Typography gutterBottom variant="h3" sx={{px: 4, pt: 2}} color="secondary">
            {state.error.title || 'There has been an error'}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{p: 4}}>
            {state.error.detail || 'Internal server error'}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Server error</Typography>
      )}
    </Paper>
  );
};

export default ServerError;
