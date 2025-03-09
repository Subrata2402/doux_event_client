import { IconButton } from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { IoMdCloseCircle } from "react-icons/io";

/**
 * Displays a custom snackbar notification with the given message.
 *
 * @param {string} message - The message to display in the snackbar.
 * @returns {void}
 */
export default function customSnackBar(message) {
  return enqueueSnackbar(message, {
    variant: 'default',
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    action: (key) => (
      <IconButton onClick={() => { closeSnackbar(key); }}>
        <IoMdCloseCircle color='#fffddd' />
      </IconButton>
    )
  });
};