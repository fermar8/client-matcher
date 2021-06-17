import axios from 'axios';

const API = "http://localhost:8080/user";

async function getUserInfo (id) {
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

async function editUserInfo (datos) {
  try {
    const response = await axios({
      url: `${API}/update/preferences/${datos.userInfo.id}`,
      method: 'PUT',
      data: {
        duo: datos.duoCheck,
        flex: datos.flexCheck,
        clash: datos.clashCheck,
        otro: datos.otroCheck,
        forFun: datos.forFunCheck,
        tryHard: datos.tryhardCheck,
        otps: datos.otpsCheck,
        champs: datos.probarCheck,
        fill: datos.fillCheck,
        top: datos.topCheck,
        jungle: datos.jungleCheck,
        mid: datos.midCheck,
        bot: datos.botCheck,
        supp: datos.suppCheck,
      }
    })
    if (response.status === 201) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}



export { getUserInfo, editUserInfo }



























/*
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService(); */