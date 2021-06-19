import React, { useEffect, useState, useCallback} from 'react'
import { Container, Row, Col } from 'reactstrap';
import NavBar  from './../Components/NavBar';
import SearchBar from './../Components/SearchBar';
import UserList from './../Components/UserList';
import { getAllConverses } from '../services/conversa.service';
import { getUserInfo } from '../services/user.service';
import { getAllUsers } from '../services/user.service';
import './../styles/matches.css';


function Matches() {

    const [ input, setInput ] = useState("");
    const [ userInfo, setUserInfo ] = useState();
    const [ user, setUser ] = useState();
    const [ converses, setConverses] = useState("");
    const [ userListDefault, setUserListDefault ] = useState();
    const [ userList, setUserList ] = useState();

    let fetchUserData = useCallback(async (id) => {
        const result = await getUserInfo(id);
        const body = await result.data;
        const result2 = await getAllUsers();
        const body2 = await result2.data;
        const result3 = await getAllConverses(id);
        const body3 = await result3.data;
        setConverses(body3)
        setUserInfo(body);
        const filterUserOut = body2.filter(el => el.id !== body.id);
        setUserListDefault(filterUserOut)
    }, [])

    const updateInput = async (input) => {
        const filtered = userListDefault.filter(user => {
        return user.name.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setUserList(filtered);
  }

    useEffect(() => { 
        let currentUser = JSON.parse(localStorage.getItem('user'));

        if (currentUser != null) {
        setUser(currentUser)
        }
            fetchUserData(currentUser.id) 
     }, [])

    return (
        <Container fluid={true} className="matches-container">
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
