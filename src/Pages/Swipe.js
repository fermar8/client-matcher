import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import imgPerfil from './../images/img-perfil.png';
import { DarkButton } from './../Components/DarkButton';
import { RedButton } from './../Components/RedButton';
import api from '../services/api-lol';
import './../styles/swipe.css';


function Swipe(props) {

const [ user, setUser ] = useState(props.user)
const [ summonerNames, setSummonerNames ] = useState([{}]);
const [ currentSummoner, setCurrentSummoner ] = useState([])
const [ quedanSummoners, setQuedanSummoners ] = useState(true);
const [ loading, setLoading ] = useState(0);


const getSummoners= async()=>{
    setLoading(1);
    await fetch('users.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        let list = myJson;
        list = list.sort(() => Math.random() - 0.5)
        setSummonerNames(list);
        

        loadData(list);
      }); 
}

async function loadData(list) {
    const res = await api.get(`/summoner/${list[0].summonerName}`)
    .then(res => {
     setCurrentSummoner(res.data)
    })
    .catch(e => alert("Error al buscar summoner"))
    
    if (res && res.data) {
        setCurrentSummoner(res.data)
    }
    setLoading(0);
}

useEffect(()=>{
    getSummoners();
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
  }, [])

let rankedMatchesToRender;
if (currentSummoner.rankedData) {
    rankedMatchesToRender = currentSummoner.rankedData.map(el => {
    let color = (el.wins / (el.wins + el.losses )*100) > 50 ? "winrate-green" : "winrate-red";
        return (
            <div>
                <p>{el.queueType.slice(7,11)}</p>
                <p>{el.wins + el.losses} Games</p>
                <p className={color}>{(el.wins / (el.wins + el.losses )*100).toFixed(1)}% winrate</p>
            </div>
        )
    })
} else {
        return <><p>No ranked matches</p></>
}


const handleClick = () => {
if (summonerNames.length === 1) {
    setQuedanSummoners(false)
} else {
    let newArr = summonerNames.slice(1);
    setSummonerNames(newArr)
    loadData(newArr);
    }
}

    return (
        <Container className="swipe-container" fluid={true}>

        {!loading ? 
        (
        <>
        <Row className="swipe-header">
            <Col xs="12" className="swipe-params">
                <i className="fas fa-times"></i>
                <p>League of Legends - Por defecto</p>
                <i className="fas fa-cog"></i>
            </Col>
            <Col xs="12">
                <hr></hr>
            </Col>
        </Row>
        <Row>
            <Col xs="12" className="swipe-perfil">
                <img alt="perfil" src={imgPerfil}></img>
                <div>
                    <p className="nom">{summonerNames[0].summonerName}</p>
                    <p className="mess">"{summonerNames[0].message}"</p>
                </div>
            </Col>
            <Col xs="12">
                <hr></hr>
            </Col>
        </Row>
        <Row>
            <Col xs="12" className="swipe-swipe">
                <div>
                    <img alt="perfil" src={imgPerfil}></img>
                    <img alt="perfil" src={imgPerfil}></img>
                    <img alt="perfil" src={imgPerfil}></img>
                </div>
                <div className="swipe-btns">
                    <DarkButton onClick={handleClick} className="btn">Siguiente</DarkButton>
                    <RedButton onClick={handleClick} className="btn">Like</RedButton>
                </div>
                <p style={{fontSize: "15px"}}>Summoner information:</p>
                <div className="swipe-info">
                    <img alt="perfil" src={`https://cdn.communitydragon.org/11.9.1/profile-icon/${currentSummoner.profileIconId}`}></img>
                        {rankedMatchesToRender}
                    <div>
                        <p style={{fontSize: "15px"}}>&nbsp;</p>
                        <p>icon</p>
                        <p>Position</p>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className="swipe-change" xs="12">
                <button style={{borderTopLeftRadius: "10px"}} type="button">Estadísticas</button>
                <button type="button">Campeones</button>
                <button style={{borderTopRightRadius: "10px"}} type="button">Historial</button>
            </Col>
            <p></p>
        </Row>
        <Row>
            {quedanSummoners ? 
            <Col>
                <p style={{color: "#fafafa"}}>{summonerNames[0].summonerName}</p>
            </Col>
            : 
            <Col>
                <p style={{color: "#fafafa"}}>Lo sentimos, no hay más posibles matches en este momento.</p>
            </Col>
            }
        </Row>
        </>
        )
    :
    <p>Buscando posibles matches, por favor espere...</p>
    }
        </Container>
    )
}

export default withAuth(Swipe);
