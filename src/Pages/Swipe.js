import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import { Link } from 'react-router-dom';

import imgPerfil from './../images/img-perfil.png';
import emblemIron from './../images/Emblem_Iron.png';
import emblemBronze from './../images/Emblem_Bronze.png';
import emblemSilver from './../images/Emblem_Silver.png';
import emblemGold from './../images/Emblem_Gold.png';
import emblemPlatinum from './../images/Emblem_Platinum.png';
import emblemDiamond from './../images/Emblem_Diamond.png';
import emblemMaster from './../images/Emblem_Master.png';
import emblemGrandmaster from './../images/Emblem_Grandmaster.png';
import emblemChallenger from './../images/Emblem_Challenger.png';

import mastery1 from './../images/mastery-1.png';
import mastery2 from './../images/mastery-2.png';
import mastery3 from './../images/mastery-3.png';
import mastery4 from './../images/mastery-4.png';
import mastery5 from './../images/mastery-5.png';
import mastery6 from './../images/mastery-6.png';
import mastery7 from './../images/mastery-7.png';

import { DarkButton } from './../Components/DarkButton';
import { RedButton } from './../Components/RedButton';
import NavBar from './../Components/NavBar';
import NavBarS from './../Components/NavBarSuperior';
import api from '../services/api-lol';
import './../styles/swipe.css';


function Swipe(props) {

const [ user, setUser ] = useState(props.user);
const [ champs, setChamps ] = useState([]);
const [ summonerNames, setSummonerNames ] = useState([{}]);
const [ currentSummoner, setCurrentSummoner ] = useState([])
const [ quedanSummoners, setQuedanSummoners ] = useState(true);
const [ loading, setLoading ] = useState(0);
const [ showHistorial, setShowHistorial ] = useState(true)

const getChamps=()=>{
    fetch('champs.json'
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
        setChamps(myJson)
      });
}


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
    .catch(e => alert("Error al buscar invocador, por favor recarga la página"))
    
    if (res && res.data) {
        setCurrentSummoner(res.data)
    }
    setLoading(0);
}

useEffect(()=>{
    getSummoners()
    getChamps()
    
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
  }, [])

const handleClick = () => {
if (summonerNames.length === 1) {
    setQuedanSummoners(false)
} else {
    let newArr = summonerNames.slice(1);
    setSummonerNames(newArr)
    loadData(newArr);
    }
}

function getIcons(elo) {
    switch (elo) {
        case "BRONZE":
          return <img src={emblemBronze} alt="elo" />;
        case "IRON":
          return <img src={emblemIron} alt="elo" />;
        case "SILVER":
          return <img src={emblemSilver} alt="elo" />;
        case "GOLD":
          return <img src={emblemGold} alt="elo" />;
        case "PLATINUM":
          return <img src={emblemPlatinum} alt="elo" />;
        case "DIAMOND":
          return <img src={emblemDiamond} alt="elo" />;
        case "GRANDMASTER":
          return <img src={emblemGrandmaster} alt="elo" />;
        case "MASTER":
          return <img src={emblemMaster} alt="elo" />;
        case "CHALLENGER":
          return <img src={emblemChallenger} alt="elo" />;
        default: break;
      }
}

function getMasteryIcons(mastery) {
    switch (mastery) {
        case 1:
          return <img style={{width: "40px", height: "40px"}} src={mastery1} alt="mastery-icon" />;
        case 2:
          return <img style={{width: "40px", height: "40px"}} src={mastery2} alt="mastery-icon" />;
        case 3:
          return <img style={{width: "40px", height: "40px"}} src={mastery3} alt="mastery-icon" />;
        case 4:
          return <img style={{width: "40px", height: "40px"}} src={mastery4} alt="mastery-icon" />;
        case 5:
          return <img style={{width: "40px", height: "40px"}} src={mastery5} alt="mastery-icon" />;
        case 6:
          return <img style={{width: "40px", height: "40px"}} src={mastery6} alt="mastery-icon" />;
        case 7:
          return <img style={{width: "40px", height: "40px"}} src={mastery7} alt="mastery-icon" />;
        default: break;
      }
}


let findRankedRating;
if (currentSummoner.rankedData) {
    findRankedRating = currentSummoner.rankedData.find(el => el.queueType === "RANKED_SOLO_5x5");
    findRankedRating = findRankedRating.tier
}


let rankedLeagues;
if (currentSummoner.rankedData) {
    rankedLeagues = currentSummoner.rankedData.map( el => {
    let color = (el.wins / (el.wins + el.losses )*100) > 50 ? "winrate-green" : "winrate-red";
        return (
            <div key={el.gameId} className="swipe-wins">
                <p>{el.queueType.slice(7,11)}</p>
                <p>{el.wins + el.losses} Partidas</p>
                <p className={color}>{(el.wins / (el.wins + el.losses )*100).toFixed(1)}% WR</p>
            </div>
        )
    })
} else {
        return <><p></p></>
}

let matchHistory;
if (currentSummoner.allGames) {
    matchHistory = currentSummoner.allGames.map(el => {
     let winText = el[0].stats.win ? "WIN" : "LOSS";
        return (
         <Container fluid={true} className="match-container">
            <Row className="match-history">
                <Col xs="2">
                    <img style={{width: "40px", height: "40px"}} alt="champ-icon" src={`https://cdn.communitydragon.org/11.9.1/champion/${el[0].championId}/square`}></img>
                </Col>
                <Col xs="2">
                    <div className="match-kda">
                        <p>{el[0].stats.kills}/</p>
                        <p>{el[0].stats.deaths}/</p>
                        <p>{el[0].stats.assists}</p>
                    </div> 
                </Col>
                <Col xs="2">
                    <div className="match-economy">
                        <p>{el[0].stats.goldEarned}</p>
                        <i class="fas fa-coins"></i>
                    </div> 
                </Col>
                <Col xs="2">
                    <div className="match-economy">
                        <p>{el[0].stats.totalMinionsKilled}cs </p>
                    </div>
                </Col>
                <Col xs="2">
                    <div className="match-economy">
                        <p>Lvl{el[0].stats.champLevel}</p>
                    </div>
                </Col>
                <Col xs="2">
                     <div className="match-economy">
                        <p className={el[0].stats.win ? "match-result-win" : "match-result-loss"}>{winText}</p>
                    </div>
                </Col>
                
            </Row>
        </Container>
        )
    })
}

/*
async function findChamp ( champs, champId ) {
    const promises = champs.find(c => c.key == champId);
    const results = await Promise.all(promises);
    return results;
}
*/

let campeonesFavoritos;
if (currentSummoner.championMastery && champs) {
    campeonesFavoritos = currentSummoner.championMastery.map((el ) => {
     let nombre = champs.find(c => c.key == el.championId);
     console.log("nombre", nombre)
     if (!nombre ) {
         console.log(champs, el )
     }
       return (
        <Container fluid={true} className="match-container" key={el.championId}>
            <Row className="match-history">
                <Col xs="2">
                    <img style={{width: "40px", height: "40px"}} alt="champ-icon" src={`https://cdn.communitydragon.org/11.9.1/champion/${el.championId}/square`}></img>
                </Col>
                <Col xs="3">
                    <div className="match-economy">
                        <p>{nombre.label}</p>
                    </div>
                </Col>
                <Col xs="5">
                    <div className="match-economy">
                        <p>{el.championPoints} P.Maestría </p>
                    </div>
                </Col>
                <Col xs="2">
                    <div className="match-economy">
                        {getMasteryIcons(el.championLevel)}
                    </div>
                </Col>
            </Row>
        </Container>
       )
 })
}



    return (
        <Container className="swipe-container" fluid={true}>
            <NavBarS></NavBarS>
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
                <p style={{fontSize: "15px"}}>Información del invocador:</p>
                <div className="swipe-info">
                    <img alt="perfil" src={`https://cdn.communitydragon.org/11.9.1/profile-icon/${currentSummoner.profileIconId}`}></img>
                        {rankedLeagues}
                    
                        {getIcons(findRankedRating)}
                    
                </div>
            </Col>
        </Row>
        <Row>
            <Col className="swipe-change" xs="12">
                <button className={showHistorial ? "btn-sel-l" : "btn-desel-l"} type="button" onClick={() => setShowHistorial(!showHistorial)}>Historial</button>
                <button className={showHistorial ? "btn-desel-r" : "btn-sel-r"} type="button" onClick={() => setShowHistorial(!showHistorial)}>Campeones</button>
            </Col>
            <p></p>
        </Row>

        {showHistorial ? 
                    <>
                        {matchHistory}
                    </>
        : 
                    <>
                    {campeonesFavoritos}
                    </>
                
        }

        


        {quedanSummoners ? 
        null
        :
        <Row className="no-summoners-left">
            <Col xs='12 PRUEBAS'>
                <p>Lo sentimos, no hay más posibles matches en este momento. Vuelve a intentarlo más tarde</p>
            </Col>
            <Col xs='12 PRUEBAS'>
                <a href="/landing"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-undo  fa-3x"></i></a>
            </Col>
        </Row>
        }
        </>
        )
    :
    <Row>
            <Col xs="12" className="no-summoners-left">
                <p>Buscando matches, por favor espere...</p>
            </Col>
    </Row>
    }
    <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(Swipe);
