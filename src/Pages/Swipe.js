import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import { Link } from 'react-router-dom';
import { getUserInfo, getAllUsers } from './../services/user.service';
import { getAllMatches, putMatch } from '../services/matches.service';

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

import bot from './../images/ADC.png';
import supp from './../images/SUPPORT.png';
import jungle from './../images/JUNGLE.png';
import top from './../images/TOP.png';
import mid from './../images/MIDDLE.png'

import mastery1 from './../images/mastery-1.png';
import mastery2 from './../images/mastery-2.png';
import mastery3 from './../images/mastery-3.png';
import mastery4 from './../images/mastery-4.png';
import mastery5 from './../images/mastery-5.png';
import mastery6 from './../images/mastery-6.png';
import mastery7 from './../images/mastery-7.png';

import { DarkButton } from './../Components/DarkButton';
import { RedButton } from './../Components/RedButton';
import api from '../services/api-lol';
import './../styles/swipe.css';


function Swipe(props) {

const [ user, setUser ] = useState(props.user);
const [ userInfo, setUserInfo ] = useState([{}]);
const [ allUsers, setAllUsers ] = useState([{}])
const [ matches, setMatches ] = useState([{}])
const [ champs, setChamps ] = useState([]);
const [ currentSummoner, setCurrentSummoner ] = useState([])
const [ quedanSummoners, setQuedanSummoners ] = useState(true);
const [ loading, setLoading ] = useState();
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

async function filterUsers(arr, user, matches) {
    const filterUsersMood = await Promise.all(arr.map(el => {
    if (( (el.flex === user.flex) && el.flex === true) || 
        ((el.duo === user.duo) && el.duo === true) ||  
        ((el.clash === user.clash) && el.clash === true) ||
        ((el.otro === user.otro) && el.otro === true) || 
        ((el.champs === user.champs) && el.champs === true) ||
        ((el.tryHard === user.tryHard) && el.tryHard === true) ||  
        ((el.otps === user.otps) && el.otps === true)) {
            return el
        }
    }))
    const filterRoles = await Promise.all(filterUsersMood.map(el => {
    if ((user.top === true && el.rolPred === "top")  ||
        (user.jungle === true && el.rolPred === "jungle")  ||  
        (user.mid === true && el.rolPred === "mid")  || 
        (user.bot === true && el.rolPred === "bot")  || 
        (user.supp === true && el.rolPred === "supp")  || 
        (user.fill === true && el.rolPred === "fill")) {
            return el
        }
    }))
    const filterUndefined = filterRoles.filter(el => el !== undefined)
    
    if (filterUndefined.length === 0) {
        props.history.push('/noswipesleft')
    }
    const filterFirstColumn = matches.map((el) => {
        if (el.user_Id_1 === user.id) {
            return el.user_Id_2
        }
    })
    const filterUndefined2 = filterFirstColumn.filter(el => el !== undefined);

    const filterMatches = filterUndefined.map((el) => {
       if (filterUndefined2.includes(el.id) === false ) {
           return el
       }
    })
    const filterUndefined3 = filterMatches.filter(el => el !== undefined);
    console.log('filterUndefined3', filterUndefined3)
   
    if (filterUndefined3.length === 0) {
        props.history.push('/noswipesleft')
    } else {
        const randomizeArray = filterUndefined3.sort(() => Math.random() - 0.5)
        setAllUsers(randomizeArray)
        loadData(randomizeArray)
    }
}

let fetchUserData = useCallback(async (id) => {
    const result = await getUserInfo(id);
    const body = await result.data;
    const result2 = await getAllUsers();
    const body2 = await result2.data;
    const result3 = await getAllMatches();
    const body3 = await result3.data;
    setMatches(body3)
    setUserInfo(body);
    const filterUserOut = body2.filter(el => el.id !== body.id);
    filterUsers(filterUserOut, body, body3)
}, [])

async function loadData(list) {

    try {
        const res = await api.get(`/summoner/${list[0].nom}`)
        if (res && res.data) {
            setCurrentSummoner(res.data)
            setLoading(0);
        }
    } catch(e) {
        console.log(e)
    }
}


useEffect(()=>{
    getChamps();
    
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
    fetchUserData(currentUser.id);
  }, [])

const handleClickSiguiente = () => {
if (allUsers.length === 1) {
    setQuedanSummoners(false);
} else {
    setLoading(1)
    let newArr = allUsers.slice(1);
    setAllUsers(newArr)
    loadData(newArr);
    }
}

const handleClickLike = () => {
    if (allUsers.length === 1) {
    putMatch(user.id, allUsers[0].id)
    setQuedanSummoners(false);
} else {
    setLoading(1)
    putMatch(user.id, allUsers[0].id)
    let newArr = allUsers.slice(1);
    setAllUsers(newArr)
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

function getPosition(pos) {
    switch (pos) {
        case "top":
          return <img src={top} alt="elo" />;
        case "bot":
          return <img src={bot} alt="elo" />;
        case "supp":
          return <img src={supp} alt="elo" />;
        case "jungle":
          return <img src={jungle} alt="elo" />;
        case "mid":
          return <img src={mid} alt="elo" />;
        case "fill":
        return <p>Fill</p>;
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
let noRankedMessage;
if (!currentSummoner.rankedData) {
    noRankedMessage = <p>No hay datos de partidas clasificatorias para este invocador.</p>
} else {
    findRankedRating = currentSummoner.rankedData.find(el => el.queueType === "RANKED_SOLO_5x5");
    findRankedRating ? 
    findRankedRating = findRankedRating.tier : 
    noRankedMessage = <p>No hay datos de partidas clasificatorias para este invocador.</p>
}

let findPosition;
if (allUsers[0].rolPred) {
    findPosition = allUsers[0].rolPred
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


let campeonesFavoritos;
if (currentSummoner.championMastery && champs) {
    campeonesFavoritos = currentSummoner.championMastery.map((el ) => {
     let nombre = champs.find(c => c.key == el.championId);
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

        {!loading ? 
        (
        <>
        <Row className="swipe-header">
            <Col xs="12" className="swipe-params">
               <Link to={'/landing'}> <i className="fas fa-times"></i></Link>
                <p>League of Legends - Por defecto</p>
                <Link to={'/modo'}> <i className="fas fa-cog"></i></Link>
            </Col>
            <Col xs="12">
                <hr></hr>
            </Col>
        </Row>
        <Row>
            <Col xs="12" className="swipe-perfil">
                <img alt="perfil" src={imgPerfil}></img>
                <div>
                    <p className="nom">{allUsers[0].nom}</p>
                    <p className="mess">"{allUsers[0].details}"</p>
                </div>
            </Col>
            <Col xs="12">
                <hr></hr>
            </Col>
        </Row>
        <Row>
            <Col xs="12" className="swipe-swipe">
                <div style={{display: "flex"}}>
                     <p className="mess">Rol Preferido:</p> {getPosition(findPosition)}
                </div>
                <div className="swipe-btns">
                    <DarkButton onClick={handleClickSiguiente} className="btn">Siguiente</DarkButton>
                    <RedButton onClick={handleClickLike} className="btn">Like</RedButton>
                </div>
                <p style={{fontSize: "15px"}}>Información del invocador:</p>
                <div className="swipe-info">
                    <img alt="perfil" src={`https://cdn.communitydragon.org/11.9.1/profile-icon/${currentSummoner.profileIconId}`}></img>
                        {rankedLeagues}
                        {noRankedMessage}
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
        <Row>
            <Col xs="12" className="no-summoners-left">
                <p>Lo sentimos, no hay más posibles matches en este momento. Vuelve a intentarlo más tarde.</p>
                
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
        </Container>
    )
}

export default withAuth(Swipe);
