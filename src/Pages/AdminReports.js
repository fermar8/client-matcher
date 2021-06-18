import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import '../styles/admin.css';

import AReportEdit from '../Components/A-ReportEdit';
import AUserDelete from '../Components/A-UserDelete';
import NavBar from './../Components/NavBar';
import NavBarS from './../Components/NavBarSuperior';

import { getReports } from '../services/admin.service';

function AdminReports() {

    const [llista, setLlista] = useState([]);
    const [reportSel, setReportSel] = useState([]);
    const [showEdita, setShowEdita] = useState(false);
    const [showBorra, setShowBorra] = useState(false);

    let fetchData = useCallback(async () => {
        const result = await getReports();
        const body = await result.data
        console.log('body', body)
        setLlista(body);
        
    }, [])


    useEffect(() => {
        fetchData();
        console.log('llista', llista)
    }, [])


    function editaReporte(e) {
        console.log(llista, e);
        let reporte = llista.filter(el => el.id == e);
        console.log("reporte", reporte)
        setReportSel(reporte);
        setShowEdita(!showEdita);
    }




    return (
        <Container>
            <NavBarS></NavBarS>
            <Row className="principal">
                <Col xl='12'>

                    <h1>Reportes</h1>
                    <hr></hr>     
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Usuario</th>
                                <th>Reportado</th>
                                <th>Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {llista.map((al) => {
                            return (
                                <tbody key={al.id}>
                                    <tr>
                                        <td>{al.id}</td>
                                        <td>{al.userId}</td>
                                        <td>{al.userId_reported}</td>
                                        <td>{al.solucionado}</td>
                                        <td><input type="checkbox" /></td>
                                        <td><Button color="primary" onClick={() => editaReporte(al.id)}>Edita</Button></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>

                    {showEdita ?
                        <AReportEdit fetchData={fetchData} setShowEdita={setShowEdita} showEdita={showEdita} reportesSel={reportSel} llista={llista} />
                         : null
                    }

                    {showBorra ?
                        <AUserDelete fetchData={fetchData} setShowBorra={setShowBorra} showBorra={showBorra} reportesSel={reportSel} /> : null}
                </Col>
            </Row>
        </Container>
    )

}


export default AdminReports