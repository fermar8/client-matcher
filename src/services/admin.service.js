import axios from 'axios';

const API = 'http://localhost:8080';



async function getReports() {
    try {
        const response = await axios ({
            url: `${API}/reportes/all`,
            method: 'GET',
        })
        if (response.status === 200) {
        console.log(response)
        return response
        }
    } catch (e) {
        console.log(e)
    }
}

async function patchReports(datos) {
    try {
        const response = await axios ({
            url: `${API}/reportes/${datos.id}`,
            method: 'PATCH',
            data: {
                user_id: datos.usuario,
                user_id_reported: datos.reportado,
                motiu: datos.motivo,
                comentari: datos.comentario,
                prova: datos.prueba,
                estat: datos.estado,
                data: datos.fecha,
                resposta: datos.respuesta,
            }
        });
        if (response.status === 200) {
        return response
        }
    } catch (e) {
        console.log(e)
    }
}

async function deleteUsers(id) {
    try {
        const response = await axios ({
            url: `${API}/user/${id}`,
            method: 'DELETE',
        });
        if (response.status === 200 ) {
        return response
        }
    } catch (e) {
        console.log(e)
    }
}

export {getReports, patchReports, deleteUsers}