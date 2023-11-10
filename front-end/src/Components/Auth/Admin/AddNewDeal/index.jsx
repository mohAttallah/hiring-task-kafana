import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addNewDeal } from '../../../../store/reducer/deals';
import { useDispatch } from 'react-redux';
function AddNewDeal() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Status: 'Active',
        Amount: 0,
        Currency: 'JOD',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        // Check if any required field is empty
        return Object.values(formData).every((value) => value !== '');
    };

    const handleSubmit = () => {
        if (!isFormValid()) {
            alert('Please fill in all required fields.');

            return;
        }
        const success = dispatch(addNewDeal(formData))
        if (success) {
            handleClose();
        } else {
            console.log('there is somthing worng')
        }
    };

    return (
        <>
            <Button variant="variant" style={{ backgroundColor: '#424874', color: "#fff" }} onClick={handleShow}>
                Add New Deal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="Status"
                                value={formData.Status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="In Active">In Active</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Amount"
                                name="Amount"
                                value={formData.Amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCurrency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Currency"
                                name="Currency"
                                value={formData.Currency}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewDeal;




