import React from 'react';
import { Row, Col } from 'reactstrap';
import imgPerfil from './../images/img-perfil.png';
import { Link } from 'react-router-dom';
import './../styles/matches.css';

const UserList = ({converses=[]}) => {
  return (
    <>
    { converses.map((data,index) => {
        if (data) {
          return (
            <Link style={{textDecoration: "none", color: "#fafafa"}} 
            to={{
              pathname: `/chat/${data.id}`,
              dades: data}}>
              <Row>
                <Col key={data.id}>
                  <div style={{display: "flex", margin: "8px 0 8px 0"}}>
                    <img src={imgPerfil} alt="profile-pic"></img>
                  <div style={{marginLeft: "8px"}}>
                    <p className="matches-nom">{data.nom}</p>
                    <p className="matches-data">Añadido el 5 de Junio de 2020</p>
                  </div>
                  </div>
                </Col>	
              </Row>

            </Link>
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default UserList