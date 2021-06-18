import React, { useState, useEffect, useCallback } from 'react';
import { Form, FormGroup, Label, 
    Container, Row, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';

import { getUserInfo, editUserInfo } from '../services/user.service';


import Select from 'react-select';
import { RedButton } from './../Components/RedButton';
import './../styles/modo.css';

function Modo(props) {

    const [ user, setUser ] = useState(props.user);
    const [ userInfo, setUserInfo ] = useState([{}])

    const [ champs, setChamps ] = useState([]);
    const [ myChamps, setMyChamps ] = useState([]);
    const [ prefChamps, setPrefChamps ] = useState([]);

    const [ page, setPage ] = useState(1);

    const [ duoCheck, setDuoCheck ] = useState(false);
    const [ flexCheck, setFlexCheck ] = useState(false);
    const [ clashCheck, setClashCheck ] = useState(false);
    const [ otroCheck, setOtroCheck ] = useState(false);

    const [ forFunCheck, setForFunCheck ] = useState(false);
    const [ tryhardCheck, setTryhardCheck ] = useState(false);
    const [ probarCheck, setProbarCheck ] = useState(false);
    const [ otpsCheck, setOtpsCheck ] = useState(false);

    const [ topCheck, setTopCheck ] = useState(false);
    const [ jungleCheck, setJungleCheck ] = useState(false);
    const [ midCheck, setMidCheck ] = useState(false);
    const [ botCheck, setBotCheck ] = useState(false);
    const [ suppCheck, setSuppCheck ] = useState(false);
    const [ fillCheck, setFillCheck ] = useState(false);

    const [ siCheck, setSiCheck ] = useState(false);
    const [ noCheck, setNoCheck ] = useState(false);


let fetchData = useCallback(async (id) => {
    const result = await getUserInfo(id);
    const body = await result.data;
    setDuoCheck(body.duo);
    setFlexCheck(body.flex);
    setClashCheck(body.clash);
    setOtroCheck(body.otro);
    //setForFunCheck(body.forFun)
    setTryhardCheck(body.tryHard);
    //setProbarCheck(body.probar);
    setOtpsCheck(body.otps);
    setTopCheck(body.top);
    setJungleCheck(body.jungle);
    setMidCheck(body.mid);
    setBotCheck(body.bot);
    setSuppCheck(body.supp);
    setFillCheck(body.fill)
    setUserInfo(body)
}, [])

async function editPreferences (e) {
    await editUserInfo({
        userInfo,
        duoCheck,
        flexCheck,
        clashCheck,
        otroCheck,
        forFunCheck,
        tryhardCheck,
        otpsCheck,
        probarCheck,
        topCheck,
        jungleCheck,
        midCheck,
        botCheck,
        suppCheck,
        fillCheck
    })

}

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

useEffect(()=>{
    getChamps()
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
    fetchData(currentUser.id);
    
},[])


const handleClick = (e) => {
    if (e.target.value === "inputDuo") {
    setDuoCheck(!duoCheck);
    };

    if (e.target.value === "inputFlex") {
        setFlexCheck(!flexCheck);
    };

    if (e.target.value === "inputClash") {
        setClashCheck(!clashCheck);
    };
    if (e.target.value === "inputOtro") {
        setOtroCheck(!otroCheck);
    }
    if (e.target.value === "input4fun") {
        setForFunCheck(!forFunCheck);
    }
    if (e.target.value === "inputTryhard") {
        setTryhardCheck(!tryhardCheck);
    }
    if (e.target.value === "inputProbar") {
        setProbarCheck(!probarCheck);
    }
    if (e.target.value === "inputOtps") {
        setOtpsCheck(!otpsCheck);
    }
    if (e.target.value === "inputTop") {
        setTopCheck(!topCheck);
    }
    if (e.target.value === "inputJungle") {
        setJungleCheck(!jungleCheck);
    }
    if (e.target.value === "inputMid") {
        setMidCheck(!midCheck);
    }
    if (e.target.value === "inputBot") {
        setBotCheck(!botCheck);
    }
    if (e.target.value === "inputSupp") {
        setSuppCheck(!suppCheck);
    }
    if (e.target.value === "inputFill") {
        setFillCheck(!fillCheck);
    }
    if (e.target.value === "inputSi") {
        setSiCheck(!siCheck);
    }
    if (e.target.value === "inputNo") {
        setNoCheck(!noCheck);
    }
}


    return (
        <Container fluid={true} className="modo-container">
        <Row>
            <Col xs="12" className="modo-flex">
                <div className="modo-div">
                {page ===1 ? 
                <p className="modo-text">¿Qué te apetece jugar?</p>
                : null}
                {page ===2 ? 
                <p className="modo-text">¿Cómo te apetece jugar?</p>
                : null}
                {page ===3 ? 
                <p className="modo-text">¿Qué rol quieres encontrar?</p>
                : null}
                {page ===4 ? 
                <p className="modo-text">¿Qué personajes prefieres?</p>
                : null}
                    <i style={{color: "#FF4655"}} className="fas fa-angle-down"></i>
                </div>
                
                <Link to={'/landing'}><i className="fas fa-arrow-left"></i></Link> 
                

                <button className="modo-saltar">Saltar</button>

                <Form>
                {page === 1 ? <h2 className="modo-title">Modo</h2>
                : null}
                {page === 2 ? <h2 className="modo-title">Mood</h2>
                : null}
                {page === 3 ? <h2 className="modo-title">Rol de mi compañero</h2>
                : null}
                

                {page === 1 ? 
                <>
                    <FormGroup className="modo-modo">
                    <Label for="duo">
                        <button className={duoCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputDuo" onClick={handleClick}>Duo</button>
                    </Label>

                    <Label for="flex">
                        <button className={flexCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputFlex" onClick={handleClick}>Flex</button>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="clash">
                        <button className={clashCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputClash" onClick={handleClick}>Clash</button>
                    </Label>

                    <Label for="otro">
                        <button className={otroCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputOtro" onClick={handleClick}>Otro</button>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 2 ? 
                <>
                    <FormGroup className="modo-modo">
                    <Label for="4fun">
                        <button className={forFunCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="input4fun" onClick={handleClick}>4fun</button>
                    </Label>

                    <Label for="tryhard">
                        <button className={tryhardCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputTryhard" onClick={handleClick}>Tryhard</button>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="probar">
                        <button className={probarCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputProbar" onClick={handleClick}>Probar champs</button>
                    </Label>

                    <Label for="otps">
                        <button className={otpsCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputOtps" onClick={handleClick}>OTP's</button>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 3 ? 
                <>
                <FormGroup className="modo-modo">
                    <Label for="top">
                        <button className={topCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputTop" onClick={handleClick}>Top</button>
                    </Label>

                    <Label for="jungle">
                        <button className={jungleCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputJungle" onClick={handleClick}>Jungle</button>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="mid">
                        <button className={midCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputMid" onClick={handleClick}>Mid</button>
                    </Label>

                    <Label for="bot">
                        <button className={botCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputBot" onClick={handleClick}>Bot</button>
                    </Label>
                </FormGroup> 

                <FormGroup className="modo-modo">
                    <Label for="supp">
                        <button className={suppCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputSupp" onClick={handleClick}>Supp</button>
                    </Label>

                    <Label for="fill">
                        <button className={fillCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputFill" onClick={handleClick}>Fill</button>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 4 ? 
                <FormGroup>

                    <Label className="modo-4text" for="mi-champ">Quiero jugar:</Label>
                    <Select
                        className="modo-4input"
                        isMulti
                        name="myChamps"
                        onChange={setMyChamps}
                        options={champs}
                        defaultOptions
                        placeholder={"Introduce tus campeones preferidos"}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#FF4655',
                            primary: 'black',
                            neutral0: '#fafafa',
                            neutral90: '#fafafa'
                        },
                        })}
                     />
            

                    <Label className="modo-4text" for="team-champ">Prefiero que mis compañer@s jueguen:</Label>
                    <Select
                         className="modo-4input"
                         isMulti
                         name="prefChamps"
                         onChange={setPrefChamps}
                         options={champs}
                         defaultOptions
                         placeholder={"Introduce los campeones que prefieres que tus compañeros jueguen"}
                         theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#FF4655',
                            primary: 'black',
                            neutral0: '#fafafa',
                            neutral90: '#fafafa'
                        },
                        })}
                     />

                    <p className="modo-rango">Solo quiero ver compañeros de mi rango o superior</p>
                    
                <div className="modo-sino">
                    <Label for="mid">
                        <button className={siCheck ? "btn-sel" : "btn-sino"} type="button" value="inputSi" onClick={handleClick}>Sí</button>
                    </Label>

                    <Label for="bot">
                        <button className={noCheck ? "btn-sel" : "btn-sino"} type="button" value="inputNo" onClick={handleClick}>No</button>
                    </Label>
                </div>

                <div className="modo-buscar">
                <Link to={'/swipe'}><RedButton onClick={(e) => editPreferences(e)}>Buscar</RedButton></Link>
                </div>
                    

                </FormGroup>
                : null }


                
    

                <div className="modo-btn-div">
                    <button type="button" style={{background: page === 1 ? "#FE3C46" : "#081018"}} className="change-btn" onClick={()=> setPage(1)}></button>
                    <button type="button" style={{background: page === 2 ? "#FE3C46" : "#081018"}}  className="change-btn" onClick={()=> setPage(2)}></button>
                    <button type="button" style={{background: page === 3 ? "#FE3C46" : "#081018"}}  className="change-btn" onClick={() => setPage(3)}></button>
                    <button type="button" style={{background: page === 4 ? "#FE3C46" : "#081018"}}  className="change-btn" onClick={() => setPage(4)}></button>
                </div>                     
                </Form>
                
            </Col>
        </Row>
        </Container>
    )
}

export default withAuth(Modo)
