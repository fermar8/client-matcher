import axios from 'axios';

const API = "http://localhost:8080/conversa";

async function getAllConverses(id) {
  try {
    const response = await axios({
      url: `${API}/${id}`,
      method: 'GET',
    })
    if (response.status === 200) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}


export { getAllConverses }