import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import '../css/Template.css';
import Parser from 'html-react-parser';
import ContentMap from '../components/ContentMap'
import alphasort from 'alphanum-sort'

import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';

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

    handleChange(e) {
        this.setState({
            [e.target.id]:e.target.value
        })
        console.log(e.target.value)
    }



    render() {
        const { pages, match: { params: { to } }, childProps: { isAuthenticated } } = this.props || "";
        const currentPage = pages.filter(p=>p.to===to)[0];
        console.log('currentPage: ', currentPage)
        const { text, className, name, setNumber, slideshow, attachments } =  currentPage || "";
        const { edit } = this.state;
        return (
          

            <div>


            {currentPage && !edit

                ?
                
                <div>
                
                    <h1 style={{display: 'inline'}}>{className ==='tags' ? '' : name}</h1>
                    {isAuthenticated ? <Button color="primary" outline 
                                        style={{margin: '0px 0px 10px 25px'}}
                                        onClick={()=>this.setState({edit: !edit})}>Edit Page</Button>: '' }
                    {text !== 'null' ? Parser(`${text}`): ''}
                    <ContentMap 
                        items={attachments==='null' ? [] : attachments}
                        setNumber={setNumber}
                        slideshow={slideshow}
                    />

                </div>
                
                : 
                
                ''
            }
            </div>


         
        )
    }
}

