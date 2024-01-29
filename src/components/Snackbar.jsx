/** @format */
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
export default function SnackbarModal({ message,open,color }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity={color}>
            {message}
          </Alert>
        </Stack>
      </Snackbar>
    </div>
  );
}
