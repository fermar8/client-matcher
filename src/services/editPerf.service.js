import axios from 'axios';

const API = "http://localhost:8080/user";

async function editUserPerf (datos) {
    try {
      const response = await axios({
        url: `${API}/update/${datos.userInfo.id}`,
        method: 'PUT',
        data: {
          nom: datos.nom,
          img: datos.image,
          username: datos.username,
          server: datos.server,
          rolPred: datos.rolPred,
          details: datos.details,
          name: datos.name,
        }
      })
      if (response.status === 201) {
        return response
      }
    } catch (e) {
      console.log(e)
    }
  }

export { editUserPerf }