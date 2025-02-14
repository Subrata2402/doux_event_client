
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';
import { Button } from '@mui/material';

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