import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import lolImg from './../images/lol-img.png';
import { withAuth } from './../context/auth-context';
import { RedButton } from './../Components/RedButton';

import { getUserInfo } from './../services/user.service';

import NavBar from './../Components/NavBar';
import './../styles/landing.css';

function Landing(props) {

const [ user, setUser ] = useState(props.user)
const [ userInfo, setUserInfo ] = useState([{}])

let fetchData = useCallback(async (id) => {
    const result = await getUserInfo(id);
    console.log('result', result)
    const body = await result.data;
    setUserInfo(body)
}, [])

useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser)

    if (currentUser != null) {
      setUser(currentUser)
    }

    fetchData(currentUser.id);
}, [])

let sinModoMessage;
if (userInfo.flex === false && userInfo.clash === false && userInfo.duo === false && userInfo.otro) {
    sinModoMessage = "Sin modo seleccionado. "
}
let flexMessage;
if (userInfo.flex) {
    flexMessage = "Flex | "
}
let duoMessage;
if (userInfo.duo) {
    duoMessage = "Duo | "
}
let clashMessage;
if (userInfo.clash) {
    clashMessage = "Clash | "
}
let otroMessage;
if (userInfo.otro) {
    otroMessage = "Modos alternativos | "
}
let sinMoodMessage;
if (userInfo.champs === false  && userInfo.tryHard === false && userInfo.otps === false) {
    sinMoodMessage = "Sin mood seleccionado. "
}
let tryhardMessage;
if (userInfo.tryHard) {
    tryhardMessage = "Tryhard | "
}
let champsMessage;
if (userInfo.champs) {
    champsMessage = "Probar champs | "
}
let otpsMessage;
if (userInfo.otps) {
    otpsMessage = "OTPs | "
}
let sinRolMessage;
if (!userInfo.top && !userInfo.jungle && !userInfo.mid && !userInfo.bot && !userInfo.supp && !userInfo.fill) {
    sinRolMessage = "Sin rol seleccionado. "
}
let topMessage;
if (userInfo.top) {
    topMessage = "Top | "
}
let jungleMessage;
if (userInfo.jungle) {
    jungleMessage = "Jungle | "
}
let midMessage;
if (userInfo.mid) {
    midMessage = "Mid | "
}
let botMessage;
if (userInfo.bot) {
    botMessage = "Bot | "
}
let suppMessage;
if (userInfo.supp) {
    suppMessage = "Supp | "
}
let fillMessage;
if (userInfo.fill) {
    fillMessage = "Fill | "
}



    return (
        <Container fluid={true} className="landing-container">
            <Row>
                <Col xs="12" className="landing-flex">
                        <button className="landing-explora-btn">
                            <span className="landing-explora-text">Explora</span> 
                            <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i> 
                        </button>

                        <p className="landing-buscando">Actualmente buscando:</p>

                        <div className="landing-div">
                            <img className="landing-img" src={lolImg} alt="imagen-lol"></img>
                            <div>
                                <p className="landing-lol">League of Legends</p>
                                <div className="landing-modo-div">
                                    <p className="landing-modo-sel">Modos: {duoMessage}{flexMessage}{clashMessage}{otroMessage}{sinModoMessage}</p>
                                    <p className="landing-modo-sel">Mood: {tryhardMessage}{otpsMessage}{champsMessage}{sinMoodMessage}</p>
                                    <p className="landing-modo-sel">Roles: {topMessage}{jungleMessage}{midMessage}{botMessage}{suppMessage}{fillMessage}{sinRolMessage}</p>
                                </div>
                            </div>
                        </div>

                        <p className="landing-info">Hemos añadido estas categorías de acuerdo a tus parámetros de búsqueda.</p>
                        <p className="landing-edita">Edita tus parametros aquí</p>

                        <Link className="landing-link-modo" to={'/modo'}><RedButton className="landing-redbtn">Modificar preferencias</RedButton></Link>
                </Col>
            </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(Landing)
