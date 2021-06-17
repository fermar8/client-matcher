import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody,
        ModalFooter, Alert, Button } from 'reactstrap';
import './../App.css';


import { deleteUsers } from '../services/admin.service';

function AUserDelete(props) {
    
const id = props.reportedSel[0].user_account_id_reported

const [ modal, setModal ] = useState(true)

const [ nom, setNom ] = useState();
const [ cognom, setCognom ] = useState();

useEffect(() => {
    setModal(props.showBorra);
    setNom(props.userSel[0].nom);
    setCognom(props.userSel[0].cognom);

}, [props.userSel, props.showBorra, id])

async function borrarUser(e) {
    e.preventDefault();
    await deleteUsers(id);
    props.fetchData();
    props.setShowBorra(false);
}

const handleTornar = (modal) => {
    props.setShowBorra(false);
    setModal(!modal);
}

    return (

      <Modal isOpen={modal} toggle={(modal) => handleTornar (modal)}>
        <ModalHeader>Borrar Usuario</ModalHeader>
        <ModalBody>
          <Alert>¿Estas seguro que quieres borrar a {nom} {cognom}?</Alert>
            <ModalFooter>
            <Button color="danger" onClick={(e) => borrarUser (e)}>Borrar</Button>
            <Button color="secondary" onClick={(modal) => handleTornar (modal)}>Volver</Button>
            </ModalFooter>
        </ModalBody>
     </Modal>    
        )
}

export default AUserDelete