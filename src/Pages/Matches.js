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
    const [ converses, setConverses] = useState([{}]);
    const [ userListDefault, setUserListDefault ] = useState([{}]);
    const [ userList, setUserList ] = useState([{}]);

async function filterConverses (id, users, converses) {
    const filterConversesIds = converses.map((el) => {
        if (el.user_Id_segon === id) {
            return el.user_Id_creador
        } else if (el.user_Id_creador === id) {
            return el.user_Id_segon
        }
    })

    const filterConverses = users.map((el) => {
        if (filterConversesIds.includes(el.id) ) {
            return el
        }
    })

    const filterUndefined = filterConverses.filter(el => el != undefined)
    const conversacions = converses;

    conversacions.sort(function(a, b) { 
        return a.user_Id_creador - b.user_Id_creador  ||  a.user_Id_segon - b.user_Id_segon
    });
    filterUndefined.sort(function(a, b) { 
        return a.id - b.id
    });

    conversacions.forEach(el => {
    for (let i = 0; i < filterUndefined.length; i++) {
         if (filterUndefined[i].id === el.user_Id_creador) {
                 el.nom = filterUndefined[i].nom
            } else if  (filterUndefined[i].id === el.user_Id_segon) {
                el.nom = filterUndefined[i].nom
       }
     }
    })

    setConverses(conversacions);
    setUserList(filterUndefined)
    setUserListDefault(filterUndefined);
}

    let fetchUserData = useCallback(async (id) => {
        const result = await getUserInfo(id);
        const body = await result.data;
        const result2 = await getAllUsers();
        const body2 = await result2.data;
        const result3 = await getAllConverses(id);
        const body3 = await result3.data;
        setUserInfo(body);
        const filterUserOut = body2.filter(el => el.id !== body.id);
        filterConverses(id, filterUserOut, body3)
    }, [])

    const updateInput = async (input) => {
        const filtered = converses.filter(user => {
        return user.nom.toLowerCase().includes(input.toLowerCase())
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
                    <UserList converses={converses} />
    
            </Row>
            <NavBar/>
        </Container>
    )
}

export default Matches;
