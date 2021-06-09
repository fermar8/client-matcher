import React, { useState, useRef, Component }  from 'react'
import { Form, FormGroup, Label, Input,
     Container, Row, Col } from 'reactstrap';
import imgPerfil from './../images/img-perfil.png';
//import { withAuth } from './../context/auth-context';
import { RedButton } from './../Components/RedButton';
import AuthService from "../services/auth.service";
import './../styles/login.css';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });


        AuthService.login(this.state.username, this.state.password).then(
            () => {
            this.props.setloguejat(true);
                this.props.history.push("/landing");
            
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
    }
    

        /*if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
              () => {
                this.props.history.push("/profile");
                window.location.reload();
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );
          } else {
            this.setState({
              loading: false
            });
          }
        }*/
  
   
    render() {
        return (
            <Container fluid={true} style={{height: "100vh", width: "100%"}}>
            <Row>
            <Col xs="12" className="login-flex">
            <h1 className="login-title">INICIA SESIÓN</h1>
            <img className="login-img" alt="foto-perfil" src={imgPerfil}></img>
            <Form onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}>
                <FormGroup>
                    <Label className="login-label">Correo electrónico</Label>
                    <Input className="login-input" type="text" value={this.state.username}
                onChange={this.onChangeUsername}
                 name="username" placeholder="Introduce tu correo electrónico"></Input>
                </FormGroup>
                <FormGroup>
                    <Label className="login-label">Contraseña</Label>
                    <Input value={this.state.password}
                onChange={this.onChangePassword}
                 className="login-input" type="password" name="password" placeholder="Introduce tu contraseña"></Input>
                </FormGroup>
                
                <FormGroup className="login-button">
                <RedButton>Inicia sesión</RedButton>
                </FormGroup>
    
            </Form>
            </Col>
            </Row>
            </Container>
        )
    }
}
    




