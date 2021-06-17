import axios from "axios";


class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:8080/api/auth/"
    })
  }
  login(username, password) {
  const pr = this.auth
  .post("/signin", { username, password })
  .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(JSON.stringify(response.data))

        }
      });
  console.log("pr", pr)
  return pr
  }

  logout() {
    const pr = localStorage.removeItem("user");
    return pr;
  }

  register(nom, username, password) {
   /* return axios.post(API_URL + "signup", {
      nom,
      username,
      password
    });*/
  }

getCurrentUser() {
    const pr = JSON.parse(localStorage.getItem('user'));
    console.log(pr)
    return pr;
  }
}

const authService = new AuthService();

export default authService;