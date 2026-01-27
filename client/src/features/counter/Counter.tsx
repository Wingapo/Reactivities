import {observer} from "mobx-react-lite";
import {Box, Button, ButtonGroup, List, ListItemText, Paper, Typography} from "@mui/material";
import useStore from "../../lib/hooks/useStore.ts";

const Counter = observer(() => {
  const {counterStore} = useStore();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box sx={{width: '60%'}}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6">The count is: {counterStore.count}</Typography>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button variant="contained" color="success" onClick={counterStore.increment}>Increment</Button>
          <Button variant="contained" color="error" onClick={counterStore.decrement}>Decrement</Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{width: '40%', p: 4}}>
        <Typography variant="h5">Counter events: {counterStore.eventCount}</Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <ListItemText key={index}>{event}</ListItemText>
          ))}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;
