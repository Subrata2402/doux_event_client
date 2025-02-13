import { IconButton } from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { IoMdCloseCircle } from "react-icons/io";

export default function customSnackBar(message) {
  return enqueueSnackbar(message, {
    variant: 'default',
    autoHideDuration: 3000,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    action: (key) => (
    <IconButton onClick={() => { closeSnackbar(key); }}>
      <IoMdCloseCircle color='#fffddd' /> 
    </IconButton>
    )
  });
};