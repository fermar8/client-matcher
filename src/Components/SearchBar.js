import React from 'react';
import { Col, Input } from 'reactstrap';

const SearchBar = ({input, updateInput}) => {
  const BarStyling = {
    fontFamily: "DIN", 
    background:"inherit", 
    border: "none", 
    color: "#fafafa"};
  return (
    <>
    <Col xs="12">
     <div style={
        {display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        border:"1px solid #979797",
        borderRadius: "20px",
        height: "45px",
        margin: "20px 0 20px 0",
        width: "100%",
        padding: "8px"}}>

        <Input 
        type="text"
        style={BarStyling}
        key="random1"
        value={input}
        placeholder="Busca conversació"
        onChange={(e) => updateInput(e.target.value)}
        />

        <i style={{textAlign: "center", color: "#FF4655", padding: "8px"}}className="fas fa-search"></i>

        </div>
    </Col>
    
    </>
        
  );
}

export default SearchBar