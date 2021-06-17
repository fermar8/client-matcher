import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import NavBar from './../Components/NavBar';
import NavBarS from './../Components/NavBarSuperior';
import SearchBar from './../Components/SearchBar';
import UserList from './../Components/UserList';
import './../styles/matches.css';

function Matches() {

    const [ input, setInput ] = useState("");
    const [ userListDefault, setUserListDefault ] = useState();
    const [ userList, setUserList ] = useState();

    const getSummoners= async()=>{
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
              setUserList(myJson)
              setUserListDefault(myJson)
          }); 
    }

    const updateInput = async (input) => {
        const filtered = userListDefault.filter(user => {
        return user.summonerName.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setUserList(filtered);
  }

    useEffect(() => { getSummoners() }, [])

    return (
        <Container fluid={true} className="matches-container">
            <NavBarS></NavBarS>
            <Row>
                <Col xs="12" className="matches-flex">
                    <div>
                        <h2>Matches</h2>
                    </div>
                </Col>
                    <SearchBar 
                        input={input}
                        updateInput={updateInput}
                    />
                    <UserList userList={userList}/>
    
            </Row>
            <NavBar/>
        </Container>
    )
}

export default Matches;
