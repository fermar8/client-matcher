import axios from 'axios';

const API = "http://localhost:8080/match";

async function getAllMatches () {
  try {
    const response = await axios({
      url: `${API}/all`,
      method: 'GET',
    })
    if (response.status === 200) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}

async function putMatch (id, id2) {
  try {
    const response = await axios({
      url: `${API}/${id}/${id2}/true`,
      method: 'POST',
      data: ({
        user_Id_1: id,
        user_Id_2: id2

      })
    })
    if (response.status === 201) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}

export { getAllMatches, putMatch }