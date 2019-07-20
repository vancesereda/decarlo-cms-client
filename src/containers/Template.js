import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import '../css/Template.css';
import Parser from 'html-react-parser';
import ContentMap from '../components/ContentMap'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import EditPage from './EditPage'
var alphasort = require('alphanum-sort')

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.state = {
            currentPage: [],
            edit: false,
        };
    }


    componentDidMount() {
    }

    getNote() {
        console.log(this.props)
        return API.get(`pages`, `/pages/${this.props.match.params.to}`);
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
        const { text, className, name, setNumber, slideshow} =  currentPage || "";
        // if (setNumber === '31') {
        //     const {caption, file} = attachments;
        //     sort(captions);
        //     attachments = {}
        // }



        const { edit } = this.state;
        const { attachments, tags } = currentPage || [];

        
        
        return (

            <div>
                                     

            {currentPage && !edit
        
                ?
                
                <div>
                    
                    <h1>{className ==='tags' ? '' : name}</h1>
                    {text !== 'null' ? Parser(`${text}`): ''}
                    {isAuthenticated ? <Button color="primary" outline 
                                        style={{margin: '0px 0px 10px 25px', float: 'right'}} onClick={()=>this.setState({edit:!edit})}>

                                            {!edit ? `Edit Page` : `Save`}

                                        </Button>: '' }
                    <ContentMap 
                        items={setNumber === '31' ? attachments.sort(function(a,b) {return (a.file > b.file) ? 1 : ((b.file > a.file) ? -1 : 0);}).reverse(): attachments}
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

