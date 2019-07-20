import React, { Component } from 'react';
import CustomNavbar from './CustomNavbar'
import { Container, Row, Col } from 'reactstrap'
import '../css/layout.css'
import 'bootstrap/dist/css/bootstrap.css';
import Contact from './Contact'



const Layout = ( props ) => (


    <Container className="main-container">
          
          <Row>

            <CustomNavbar pages={props.pages ? props.pages : []} 
            handleLogout={props.handleLogout} 
            childProps={props.childProps}/>

            <Col sm={{size: 7}} className="page-detail">

              <span className="sm-scrn">
                <div className="page">
                    {props.children}
                </div>
              </span>
              


              <span className="lg-scrn">
                <div >
                    {props.children}
                </div>
                <Contact />
              
              </span>
            </Col>
          </Row>


    </Container>
)


export default Layout;












