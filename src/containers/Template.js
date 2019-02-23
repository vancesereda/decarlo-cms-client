import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import '../css/Template.css';
import Parser from 'html-react-parser';
import ContentMap from '../components/ContentMap'
import alphasort from 'alphanum-sort'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import EditPage from './EditPage'

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.state = {
            currentPage: [],
            edit: false,
        };
    }


    getNote() {
        console.log(this.props)
        return API.get("pages", `/pages/${this.props.match.params.to}`);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
        console.log(e.target.value)
    }

    toggleEdit = () => {
        this.setState({edit:!this.state.edit})
    }



    render() {
        const { pages, match: { params: { to } }, childProps: { isAuthenticated }} = this.props || "";
        const currentPage = pages.filter(p=>p.to===to)[0];
        
        const { text, className, name, setNumber, slideshow, attachments } =  currentPage || "";
        const { edit } = this.state;
        console.log(edit)
        return (

            <div>
                                     

            {currentPage && !edit
        
                ?
                
                <div>
                    
                    <h1 style={{display: 'inline'}}>{className ==='tags' ? '' : name}</h1>
                    {isAuthenticated ? <Button color="primary" outline 
                                        style={{margin: '0px 0px 10px 25px'}} onClick={()=>this.setState({edit:!edit})}>

                                            {!edit ? `Edit Page` : `Save`}

                                        </Button>: '' }
                    {text !== 'null' ? Parser(`${text}`): ''}
                    <ContentMap 
                        items={attachments==='null' ? [] : attachments}
                        setNumber={setNumber}
                        slideshow={slideshow}
                    />

                </div>
                
                : 
                
                 edit ? <EditPage currentPage = {currentPage} isAuthenticated={isAuthenticated} toggleEdit={this.toggleEdit}/> : ''
            }
            </div>


         
        )
    }
}

