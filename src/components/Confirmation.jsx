
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';
import { Button } from '@mui/material';

/**
 * Confirmation component renders a modal dialog for user confirmation.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.show - Determines if the modal is visible.
 * @param {function} props.handleClose - Function to handle closing the modal.
 * @param {function} props.onConfirm - Function to handle the confirmation action.
 * @param {string} [props.title] - Optional title for the confirmation modal.
 * @param {string} props.message - The message to display in the confirmation modal.
 *
 * @returns {JSX.Element} The rendered Confirmation component.
 */
function Confirmation(props) {
  const { show, handleClose, onConfirm } = props;

  const handleConfirm = () => {
    onConfirm();
    props.handleClose();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <div className="d-flex flex-column gap-2 p-4">
        <div className="text-center fw-bold fs-3">
          {props.title || "Confirmation"}
        </div>
        <hr />
        <div className="fs-5">
          {parse(props.message)}
        </div>
        <hr />
        <div className="d-flex justify-content-end gap-3">
          <Button variant="contained" style={{backgroundColor: "var(--button-color)"}} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Confirmation;