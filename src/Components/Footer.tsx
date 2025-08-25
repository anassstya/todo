import React from "react";
import {Container} from "react-bootstrap";
import "../styles/App.scss"


export default function Footer(){
    return(
        <Container fluid className="footer shadow-md text-center p-3">
            <p className="footer__text">Сделано с &#9829;</p>
            <ul className="footer__items">
                <li>Github</li>
                <li>Telegram</li>
                <li>Mail</li>
            </ul>
        </Container>
    )
}