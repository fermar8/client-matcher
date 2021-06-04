import React, { useState, useRef } from 'react'
import { Form, FormGroup, Label, 
    Container, Row, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RedButton } from './../Components/RedButton';
import './../styles/modo.css';

function Modo() {

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


    const inputDuo = useRef();
    const inputFlex = useRef();
    const inputClash = useRef();
    const inputOtro = useRef();

    const input4fun = useRef();
    const inputTryhard = useRef();
    const inputProbar = useRef();
    const inputOtps = useRef();

    const inputTop = useRef();
    const inputJungle = useRef();
    const inputMid = useRef();
    const inputBot = useRef();
    const inputSupp = useRef();
    const inputFill = useRef();

    const inputSi = useRef();
    const inputNo = useRef();

const handleClick = (e) => {
    if (e.target.value === "inputDuo") {
    setDuoCheck(!duoCheck);
    inputDuo.current.click();
    };

    if (e.target.value === "inputFlex") {
        setFlexCheck(!flexCheck);
        inputFlex.current.click();
    };

    if (e.target.value === "inputClash") {
        setClashCheck(!clashCheck);
        inputClash.current.click();
    };
    if (e.target.value === "inputOtro") {
        setOtroCheck(!otroCheck);
        inputOtro.current.click();
    }
    if (e.target.value === "input4fun") {
        setForFunCheck(!forFunCheck);
        input4fun.current.click();
    }
    if (e.target.value === "inputTryhard") {
        setTryhardCheck(!tryhardCheck);
        inputTryhard.current.click();
    }
    if (e.target.value === "inputProbar") {
        setProbarCheck(!probarCheck);
        inputProbar.current.click();
    }
    if (e.target.value === "inputOtps") {
        setOtpsCheck(!otpsCheck);
        inputOtps.current.click();
    }
    if (e.target.value === "inputTop") {
        setTopCheck(!topCheck);
        inputTop.current.click();
    }
    if (e.target.value === "inputJungle") {
        setJungleCheck(!jungleCheck);
        inputJungle.current.click();
    }
    if (e.target.value === "inputMid") {
        setMidCheck(!midCheck);
        inputMid.current.click();
    }
    if (e.target.value === "inputBot") {
        setBotCheck(!botCheck);
        inputBot.current.click();
    }
    if (e.target.value === "inputSupp") {
        setSuppCheck(!suppCheck);
        inputSupp.current.click();
    }
    if (e.target.value === "inputFill") {
        setFillCheck(!fillCheck);
        inputFill.current.click();
    }
    if (e.target.value === "inputSi") {
        setSiCheck(!siCheck);
        inputSi.current.click();
    }
    if (e.target.value === "inputNo") {
        setNoCheck(!noCheck);
        inputNo.current.click();
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
                        <input className="modo-input" type="checkbox" ref={inputDuo}/>
                    </Label>

                    <Label for="flex">
                        <button className={flexCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputFlex" onClick={handleClick}>Flex</button>
                        <input className="modo-input" type="checkbox" ref={inputFlex}/>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="clash">
                        <button className={clashCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputClash" onClick={handleClick}>Clash</button>
                        <input className="modo-input" type="checkbox" ref={inputClash}/>
                    </Label>

                    <Label for="otro">
                        <button className={otroCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputOtro" onClick={handleClick}>Otro</button>
                        <input className="modo-input" type="checkbox" ref={inputOtro}/>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 2 ? 
                <>
                    <FormGroup className="modo-modo">
                    <Label for="4fun">
                        <button className={forFunCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="input4fun" onClick={handleClick}>4fun</button>
                        <input className="modo-input" type="checkbox" ref={input4fun}/>
                    </Label>

                    <Label for="tryhard">
                        <button className={tryhardCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputTryhard" onClick={handleClick}>Tryhard</button>
                        <input className="modo-input" type="checkbox" ref={inputTryhard}/>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="probar">
                        <button className={probarCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputProbar" onClick={handleClick}>Probar champs</button>
                        <input className="modo-input" type="checkbox" ref={inputProbar}/>
                    </Label>

                    <Label for="otps">
                        <button className={otpsCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputOtps" onClick={handleClick}>OTP's</button>
                        <input className="modo-input" type="checkbox" ref={inputOtps}/>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 3 ? 
                <>
                <FormGroup className="modo-modo">
                    <Label for="top">
                        <button className={topCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputTop" onClick={handleClick}>Top</button>
                        <input className="modo-input" type="checkbox" ref={inputTop}/>
                    </Label>

                    <Label for="jungle">
                        <button className={jungleCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputJungle" onClick={handleClick}>Jungle</button>
                        <input className="modo-input" type="checkbox" ref={inputJungle}/>
                    </Label>
                </FormGroup>

                <FormGroup className="modo-modo">
                    <Label for="mid">
                        <button className={midCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputMid" onClick={handleClick}>Mid</button>
                        <input className="modo-input" type="checkbox" ref={inputMid}/>
                    </Label>

                    <Label for="bot">
                        <button className={botCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputBot" onClick={handleClick}>Bot</button>
                        <input className="modo-input" type="checkbox" ref={inputBot}/>
                    </Label>
                </FormGroup> 

                <FormGroup className="modo-modo">
                    <Label for="supp">
                        <button className={suppCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputSupp" onClick={handleClick}>Supp</button>
                        <input className="modo-input" type="checkbox" ref={inputSupp}/>
                    </Label>

                    <Label for="fill">
                        <button className={fillCheck ? "modo-btn-sel" : "modo-btn"} type="button" value="inputFill" onClick={handleClick}>Fill</button>
                        <input className="modo-input" type="checkbox" ref={inputFill}/>
                    </Label>
                </FormGroup> 
                </>
                : null }

                {page === 4 ? 
                <FormGroup>
                    <Label className="modo-4text" for="mi-champ">Quiero jugar:</Label>
                    <Input className="modo-4input" type="text"></Input>

                    <Label className="modo-4text" for="team-champ">Prefiero que mis compañer@s jueguen:</Label>
                    <Input className="modo-4input" type="text"></Input>

                    <p className="modo-rango">Solo quiero ver compañeros de mi rango o superior</p>
                    
                <div className="modo-sino">
                    <Label for="mid">
                        <button className={siCheck ? "btn-sel" : "btn-sino"} type="button" value="inputSi" onClick={handleClick}>Sí</button>
                        <input className="modo-input" type="checkbox" ref={inputSi}/>
                    </Label>

                    <Label for="bot">
                        <button className={noCheck ? "btn-sel" : "btn-sino"} type="button" value="inputNo" onClick={handleClick}>No</button>
                        <input className="modo-input" type="checkbox" ref={inputNo}/>
                    </Label>
                </div>

                <div className="modo-buscar">
                <RedButton>Buscar</RedButton>
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

export default Modo
