import {Grid} from '@mui/material';
import ActivityList from "./ActivityList.tsx";
import ActivityDetail from "./ActivityDetail.tsx";
import ActivityForm from "./ActivityForm.tsx";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | null;
  handleSelectActivity: (id: string) => void;
  handleDeselectActivity: () => void;
  isEditMode: boolean;
  handleOpenForm: (id?: string) => void;
  handleCloseForm: () => void;
  handleFormSubmit: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectActivity,
  handleDeselectActivity,
  isEditMode,
  handleOpenForm,
  handleCloseForm,
  handleFormSubmit,
  handleDeleteActivity,
}: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !isEditMode && (
          <ActivityDetail
            activity={selectedActivity}
            handleDeselectActivity={handleDeselectActivity}
            handleOpenForm={handleOpenForm}
          />
        )}
        {isEditMode && (
          <ActivityForm
            handleCloseForm={handleCloseForm}
            activity={selectedActivity}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ActivityDashboard;
