import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody,
        ModalFooter, Button, Form, FormGroup, Label, 
        Input } from 'reactstrap';
import './../App.css';


import { patchReports } from '../services/admin.service';
import AUserDelete from '../Components/A-UserDelete';

function AReportEdit(props) {
    
const id = props.reportedSel[0].id

const [ modal, setModal ] = useState(true);

const [ usuario, setUser ] = useState();
const [ reportado, setReported ] = useState();
const [ motivo, setMotivo ] = useState();
const [ comentario, setComentario ] = useState();
const [ prueba, setPrueba ] = useState();
const [ estado, setEstado ] = useState();
const [ fecha, setFecha ] = useState();
const [ respuesta, setRespuesta ] = useState();

function canviarData(data) {
    let strToArray = data.split('');
    let handleDate = strToArray.splice(0, 10);
    return handleDate.join('');
}

useEffect(() => {
    setModal(props.showEdita);
    setUser(props.reportedSel[0].user_account_id);
    setReported(props.reportedSel[0].user_account_id_reported);
    setMotivo(props.reportedSel[0].motiu);
    setComentario(props.reportedSel[0].comentari);
    setPrueba(props.reportedSel[0].prova);
    setEstado(props.reportedSel[0].estat);
    setFecha(canviarData(props.reportedSel[0].data));
    setRespuesta(props.reportedSel[0].resposta);

}, [props.reportedSel, props.showEdita, id])

async function guardaReporte(e) {
    e.preventDefault();
    await patchReports({
      id,
      usuario,
      reportado,
      motivo,
      comentario,
      prueba,
      estado,
      fecha,
      respuesta
    });
    props.fetchData();
    props.setShowEdita(false);
}

const handleTornar = (modal) => {
    props.setShowEdita(false);
    setModal(!modal);
}

    return (

        <Modal isOpen={modal} toggle={(modal) => handleTornar (modal)}>
        <ModalHeader>Editar Reporte</ModalHeader>
        <ModalBody>
        <Form style={{marginTop: "20px"}}>
            <FormGroup>
                <Label>Usuario</Label>
                <Input 
                placeholder={usuario}
                value={usuario}
                onChange={(e)=> setUser(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Reportado</Label>
                <Input 
                placeholder={reportado}
                value={reportado}
                onChange={(e)=> setReported(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Motivo</Label>
                <Input 
                placeholder={motivo}
                value={motivo}
                onChange={(e)=> setMotivo(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Comentario</Label>
                <Input 
                placeholder={comentario}
                value={comentario}
                onChange={(e)=> setComentario(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Pruebas</Label>
                <Input 
                placeholder={prueba}
                value={prueba}
                onChange={(e)=> setPrueba(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Estado</Label>
                <Input 
                placeholder={estado}
                value={estado}
                onChange={(e)=> setEstado(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Fecha</Label>
                <Input 
                placeholder={fecha}
                value={fecha}
                onChange={(e)=> setFecha(e.target.value)} >
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Respuesta</Label>
                <Input 
                placeholder={respuesta}
                value={respuesta}
                onChange={(e)=> setRespuesta(e.target.value)} >
                </Input>
            </FormGroup>
            <ModalFooter>
            <Button color="danger" onClick={(e) => AUserDelete (e)}>Banear</Button>
            <Button color="success" onClick={(e) => guardaReporte (e)}>Guardar</Button>
            <Button color="secondary" onClick={(modal) => handleTornar (modal)}>Tornar</Button>
            </ModalFooter>
         </Form>
        </ModalBody>
     </Modal>    
        )
}

export default AReportEdit