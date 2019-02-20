import React, { Component } from 'react';
import { Navbar, NavbarToggler, Collapse, Col, Row, Popover, PopoverBody, PopoverHeader, Button, NavItem, Nav  } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import '../css/Navbar.css'
import Draggable from 'react-draggable'
import Contact from './Contact'
import Login from '../containers/Login'


export default class CustomNavbar extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
      
                <Col md={{size: 1}} className="nav-scroll" style={{paddingLeft:'0px'}}>

                    {/* Desktop View */}
                    <span className="lg-scrn"> 
                      <Navbar color="inherit" light expand="lg" style={{paddingLeft:'0px'}}>
                        <Nav className="flex-column">
                            <OrganizedNavbar pages={this.props.pages} />
                            {this.props.pages.length ? <Login handleLogout={this.props.handleLogout} childProps={this.props.childProps}/> : ''}
                        </Nav>  
                    </Navbar>
                    </span>

                    {/* Mobile View */}
                    <span className="sm-scrn">
                        <Draggable onStart={(e)=>e.preventDefault()} onClick={(e)=>e.preventDefault()}>
                        <Button outline className="left-nav-button" onClick={this.toggle}>
                            {this.state.isOpen ? `>` : `<`}
                        </Button>
                        </Draggable>

                        <div className="left-nav" style={{'left':`${this.state.isOpen ? `0` : `100vw`}`}}>

                            <OrganizedNavbar pages={this.props.pages} /><br />
                            {this.props.pages ? <Login handleLogout={this.props.handleLogout} childProps={this.props.childProps}/> : ''}
                            <Contact />


                        </div>
                    </span>


                </Col>
                
        
        
        );
    }

}
//_this.props.userHasAuthenticated is not a function
const NavMap = ({pages}) =>  (
    <div>
    {pages.map((page) => (
      <NavItem key={page.name} className={page.className}>
    {
        page.to.includes('https') 

            ?
            <a href={page.to}>
                {page.name}
            </a>
            :
            <NavLink activeStyle={{color: "blue"}} exact to={page.to==="/"?'/':`/${page.to}`}>
                {page.name}
            </NavLink>
    }
      </NavItem>
    ))}
    </div>
)

const navObjects = [
    "Dominic Decarlo",
    "Ongoing Projects",
    "2018",
    "2017",
    "2016",
    "2015"
]


const OrganizedNavbar = ({pages}) => {
    
    return (
    <div>
        {pages.length ? navObjects.map((obj, i)=> {
            return (
            <div key={obj}>
                {i !== 0 ? <NavItem className="bold" key={i}>
                    {obj}
                </NavItem> : ''}
                <NavMap pages={pages.filter(p=>p.section===obj)} key={i+1}/>
            </div>
            )
        }): null }
    </div>)
}





