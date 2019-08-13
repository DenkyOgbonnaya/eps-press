import React from 'react';
import {Container, Row, Col} from 'reactstrap';

const About = () => {
    return (
        <div className='about-container'> 
        <Container> 
            <Row>
                <Col>
            <h3>ABOUT EPS-PRESS </h3>
            <p>EPS-PRESS is the official interactive blogging platform of the <strong>Environmental Protection 
                and Sanitation </strong>  club Lafia. EPS is a Community Development Service (CDS) club which is
                one of the four Cardinal Programs of the National Youth Service Corps (NYSC) in which Corps 
                members contribute positively to the development of their host community through out
                the period of National Service . </p>
                <h4>Misson and Objectives </h4> 
                <ul> 
                    <li>To promote and sustian a healthy environment </li>
                    <li>To create awareness on sustianable environment and regeneration </li>
                    <li>To sensitize locals on the significants of a clean environment </li>
                </ul>
                <h4>Activities </h4>
                <ul> 
                    <li>Tree planting </li>
                    <li>Sanitation and Sensitization </li>
                    <li>Drainage control </li>
                    <li>Aforestation </li>

                </ul>
            <p>This platform is primarily an interactive medium for promoting a clean and healthy environment, promoting the activities,
                contributions and accomplishments of the EPS club in community development service, and an informational channel for personal and
                professional development. </p>
            <h4> Partners </h4>
            EPS club is in partnership with the following agencies.
            <ul> 
                <li>National Environmental Standards and Regulations Enforcement Agency(NESREA) </li>
            </ul>
            <h3>How to contact us </h3>
            <p>If you have any information, suggestion or enquiery, you can contact the EPS CDS club Lafia on any of the 
            following contact medium below; </p>
            <ul> 
                <li>Whatsapp </li>
                <li> Twitter</li>
                <li>FaceBook </li>
            </ul>
        </Col>
        </Row>
        </Container>
        </div>
    )
}

export default About;