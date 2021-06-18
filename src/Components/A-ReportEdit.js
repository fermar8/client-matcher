import React, { useState, useEffect } from 'react';
import {
    Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form, FormGroup, Label,
    Input
} from 'reactstrap';
import './../App.css';


import { patchReports } from '../services/admin.service';
import AUserDelete from '../Components/A-UserDelete';

function AReportEdit(props) {
    console.log("props", props)

    const id = props.reportesSel[0].id

    const [modal, setModal] = useState(true);

    const [usuario, setUser] = useState();
    const [reportado, setReported] = useState();
    const [motivo, setMotivo] = useState();
    const [comentario, setComentario] = useState();
    const [prueba, setPrueba] = useState();
    const [estado, setEstado] = useState();
    const [fecha, setFecha] = useState();
    const [respuesta, setRespuesta] = useState();

    function canviarData(datas) {
        let strToArray = datas.split('');
        let handleDate = strToArray.splice(0, 10);
        return handleDate.join('');
    }

    /*
    comentari: "Exemple2"
id: 2
motiu: "Exemple2"
prova: "Exemple2"
solucionado: null
userId: 4
userId_reported: 5
*/
    useEffect(() => {
        if (props.reportesSel.length) {
            console.log("arribades:", props.reportesSel[0])
            setModal(props.showEdita);
            setUser(props.reportesSel[0].userId);
            setReported(props.reportesSel[0].userId_reported);
            setMotivo(props.reportesSel[0].motiu);
            setComentario(props.reportesSel[0].comentari);
            setPrueba(props.reportesSel[0].prova);
            setEstado(props.reportesSel[0].solucionado);
            setRespuesta(props.reportesSel[0].resposta);
        }


    }, [props.reportesSel, props.showEdita, id])

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

        <Modal isOpen={modal} toggle={(modal) => handleTornar(modal)}>
            <ModalHeader>Editar Reporte</ModalHeader>
            <ModalBody>
                <Form style={{ marginTop: "20px" }}>
                    <FormGroup>
                        <Label>Usuario</Label>
                        <Input
                            placeholder={usuario}
                            value={usuario}
                            onChange={(e) => setUser(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Reportado</Label>
                        <Input
                            placeholder={reportado}
                            value={reportado}
                            onChange={(e) => setReported(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Motivo</Label>
                        <Input
                            placeholder={motivo}
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Comentario</Label>
                        <Input
                            placeholder={comentario}
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Pruebas</Label>
                        <Input
                            placeholder={prueba}
                            value={prueba}
                            onChange={(e) => setPrueba(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input
                            placeholder={estado}
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha</Label>
                        <Input
                            placeholder={fecha}
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Respuesta</Label>
                        <Input
                            placeholder={respuesta}
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)} >
                        </Input>
                    </FormGroup>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => AUserDelete(e)}>Banear</Button>
                        <Button color="success" onClick={(e) => guardaReporte(e)}>Guardar</Button>
                        <Button color="secondary" onClick={(modal) => handleTornar(modal)}>Tornar</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AReportEdit