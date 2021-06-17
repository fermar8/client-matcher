import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, FormGroup, Label, Input} from 'reactstrap';
import '../styles/admin.css';

import AReportEdit from '../Components/A-ReportEdit';
import AUserDelete from '../Components/A-UserDelete';

import { getReports } from '../services/admin.service';

function AdminReports() {

const [ llista, setLlista ] = useState([]);
const [ reportSel, setReportSel ] = useState([]);
const [ showEdita, setShowEdita ] = useState(false);
const [ showBorra, setShowBorra ] = useState(false);

let fetchData = useCallback(async () => {
    const result = await getReports();
    const body = await result.data
    setLlista(body);
}, []) 


useEffect(() => {
    fetchData();
}, [fetchData]) 


function editaReporte(e) {
    let reporte = llista.filter(el => el.id.toString() === e.target.value);
    setReportSel(reporte);
    setShowEdita(!showEdita);
}




    return (
     <div className="principal">
        <h1>Reportes</h1>
     <Table responsive>
        <thead>
            <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Reportado</th>
                <th>Fecha</th>
                <th>Estado</th>
            </tr>
        </thead>
        {llista.map((al) => {
        return (
         <tbody key={al.id}>
            <tr>
                <td>{al.id}</td>
                <td>{al.user_account_id}</td>
                <td>{al.user_account_id_reported}</td>
                <td>{al.data}</td>
                <td><Input type="checkbox" /></td>
                <td><Button color="primary" value={al.id} onClick={(e) => editaReporte (e)}>Edita</Button></td>
            </tr>
        </tbody>
            )
        })}        
     </Table>

    {showEdita ? 
    <AReportEdit fetchData={fetchData} setShowEdita={setShowEdita} showEdita={showEdita} reportSel={reportSel} llista={llista}/> : null
    }

    {showBorra ? 
    <AUserDelete fetchData={fetchData} setShowBorra={setShowBorra} showBorra={showBorra} reportSel={reportSel}/> : null }

     </div>
    )
    
}


export default AdminReports