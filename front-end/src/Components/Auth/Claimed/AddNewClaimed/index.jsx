import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { setClaimedDeal } from '../../../../store/reducer/claimed';
// #F4EEFF #DCD6F7 #A6B1E1 #424874

function AddNewClaimed(props) {

    const dispatch = useDispatch();

    // input 
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSave = async () => {
        if (props.dealId !== null && props.Currency !== null && props.dealId !== undefined && props.Currency !== undefined) {
            const success = await dispatch(setClaimedDeal(props.dealId, props.Currency, amount));
            if (success) {
                handleClose()
            }
        } else {
            console.error("dealId and Currency must be defined and not null");
        }
    };

    return (
        <>
            <Button variant="light" style={{ backgroundColor: '#424874', color:"#fff" }} onClick={handleShow} >
                Claimed
            </Button>

            <Modal show={show} onHide={handleClose}  >
                <Modal.Header closeButton>
                    <Modal.Title>Claimed a Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                autoFocus
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddNewClaimed;


