import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import { Button, Form, FormGroup, Label, Input, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'




class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            open: false
        };
      }
    
      validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
      handleSubmit = event => {
        event.preventDefault();
      }
    


    handleSubmit = async event => {
        event.preventDefault();
        try {
            this.setState({isLoading: true})
            await Auth.signIn(this.state.email, this.state.password);
            this.props.childProps.userHasAuthenticated(true);
            this.toggle();
            this.props.childProps.history.push('/');
            this.setState({isLoading: false})
            
        } catch (e) {
            alert(e.message);
            
        }
    }

    toggle = () => {
        const { open } = this.state;
        this.setState({open:!open})
    }

    render() {
        const { open, email, password } = this.state;
        const { childProps: { isAuthenticated, history } } = this.props;
        console.log(this.props)
        return (
            <div>
                {open ?
                    <NavItem>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2">
                                <Label for="exampleEmail" className="mr-sm-2" onClick={this.toggle}>@&nbsp;</Label>
                                <Input value={email} onChange={this.handleChange} type="email" name="email" id="email" placeholder="email" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2"  >
                                <Label for="examplePassword" className="mr-sm-2" >p&nbsp;&nbsp;&nbsp;</Label>
                                <Input value={password} onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
                            </FormGroup>
                                
                            
                        </Form> 
                        <Button onClick={this.handleSubmit} style={{float:'left', display: 'block'}}>Submit</Button><br/><br/>
                    </NavItem>
                :   
                    isAuthenticated 
                        ?
                        <div>
                        <NavItem onClick={this.props.handleLogout} style={{'cursor':'pointer'}} >Log out</NavItem>
                        
                        <Link to={`new`} style={{color: `${history.location.pathname==='/new' ? `blue` : `black`}`}} >
                                Create New
                        </Link>
                        
                        
                        </div>
                        :
                        <NavItem onClick={this.toggle} style={{'cursor':'pointer'}}>Log in</NavItem>
                }




            </div>
        )
    }

}





export default Login;