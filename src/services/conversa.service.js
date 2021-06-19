import axios from 'axios';

const API = "http://localhost:8080/conversa";
const API2 = "http://localhost:8080/message";

async function getAllConverses(id) {
  try {
    const response = await axios({
      url: `${API}/all/${id}`,
      method: 'GET',
    })
    if (response.status === 200) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}

async function getAllMessages(id) {
  try {
    const response = await axios({
      url: `${API2}/all/${id}`,
      method: 'GET',
    })
    if (response.status === 200) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}

async function postMessage(data) {
  try {
    const response = await axios({
      url: `${API2}/create/${data.conversation.id}`,
      method: 'POST',
      data: ({
        user_id_emisor: data.conversation.id,
        user_id_receptor: data.receiverId,
        message_txt: data.message,

      })
    })
    if (response.status === 200) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}


export { getAllConverses, getAllMessages, postMessage }