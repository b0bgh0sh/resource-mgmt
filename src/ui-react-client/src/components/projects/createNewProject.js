
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ProjectForm from './projectForm';


function CreateProject () {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
               + New
            </Button>
            <FillProjectForm show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

function FillProjectForm(props) {


    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title>Create a project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div>
                       <ProjectForm/>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                {/*<Button variant="primary" onClick={props.handleSave}>*/}
                    {/*Save Changes*/}
                {/*</Button>*/}
            </Modal.Footer>
        </Modal>
    );
}



export default CreateProject;