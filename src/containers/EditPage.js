import React, { Component } from 'react'
import { API, Storage } from 'aws-amplify'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import s3Upload from '../libs/awsLib'
import '../css/EditPage.css'




const tagsList = ["Branding",
    "Fine Art",
    "Illustration",
    "Logo",
    "Posters",
    "Print Design"
]

export default class EditPage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            captions: []
        }
    }

    handleChange = (e) => {

        console.log(e.target.value)
        this.setState({[e.target.id]:e.target.value})

    }

    handleCaption = (event) => {

        const current = event.target.id.split('n')[1]
        this.setState({
            [event.target.id]: event.target.value
        });
        const { captions } = this.state;
        captions[current] = event.target.value;
        this.setState({ captions }, ()=>console.log(this.state))
    }

    handleSubmit = (e) => {

        const { currentPage } = this.props;
        let body = {...this.state}
        const bodyKeys = Object.keys(body)
        if (bodyKeys.length) {
            for (let [key, value] of Object.entries(currentPage)) {
                if (bodyKeys.indexOf(key)===-1) {
                    body = {...body, [key]: value}
                }
    
            }
        console.log(body)   
            try {
                API.put("pages", `/pages/${this.props.currentPage.to}`, { body }).then(res=>console.log(res)).catch(e=>console.log(e.response))
                this.props.toggleEdit();
            }
            catch(e) {
                console.log(e.response)
            }
            
            
        } else {
            alert('Nothing was changed')
        }


    }


    handleTags = (e) => {


        if (this.state.tags) {
            const { tags } = this.state;
            if (tags.indexOf(e.target.id) < 0) {
                tags.push(e.target.id)
                this.setState({tags})
                console.log('VALUE',e.target.value)
            }
        } else {
            const tags = [];
            tags.push(e.target.id)
            this.setState({tags})
        }

    }

    deleteFile = (i) => {
        const { files, captions } = this.state;
        files.splice(i,1);
        captions.splice(i,1);
        this.setState({files, captions})
        console.log(this.state.files, this.state.captions, files, captions)
    }

    deletePage = () => {

        try {
            API.del("pages",`/pages/${this.props.currentPage.to}`)
            window.confirm('Are you sure you want to delete the page?')
            this.props.toggleEdit();
            this.props.history.push('/')
        } catch(e) {
            console.log(e)
        }
    }


    





    render() {
        const { isAuthenticated, currentPage: { tags, name, text, section, to, slideshow, attachments } , currentPage } = this.props || "";

        return (
    <div>
    <h1 style={{display: 'inline'}}>Edit Page</h1>
    <Button onClick={this.props.toggleEdit} outline style={{float: 'right'}}>Cancel</Button>

    <Form onSubmit={this.handleSubmit}>
    <FormGroup>
        <Label for="exampleEmail">Page Name</Label>
        <Input type="text" name="email" id="name" placeholder="Name" value={this.state.name ? this.state.name : name} onChange={this.handleChange}/>
    </FormGroup>


    <FormGroup>
        <Label for="examplePassword">Page URL (decarlo.design/url)</Label>
        <Input type="text" name="password" id="to" placeholder="example - daily-photos" value={this.state.to ? this.state.to : to} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
        <Label for="exampleSelect">Select Section</Label>
        <Input type="select" name="select" id="section" value={this.state.section ? this.state.section : section} onChange={this.handleChange}>
        <option>{'Dominic Decarlo'}</option>
        <option>{`Ongoing Projects`}</option>
        <option>{`2019`}</option>
        <option>{`2018`}</option>
        <option>{`2017`}</option>
        <option>{`2016`}</option>
        <option>{`2015`}</option>
        </Input>
    </FormGroup>

    <FormGroup row>
        <Col xs={12}>
            <Label for="exampleSelectMulti">Tags (select one or multiple)</Label>
        </Col>
        {tagsList.map((tag, i)=> {
            return(
            <Col xs={6} key={i}>
                <FormGroup check>
                    
                    <Input type="checkbox" id={tag} checked={tags.indexOf(tag)===0 ? true : false} onChange={this.handleTags}/>
                    <Label check>{tag}</Label>
                    
                </FormGroup>
            </Col>)
        })}
    </FormGroup>




    <FormGroup>
        <Label for="exampleText">Add text (HTML)</Label>
        <Input type="textarea" name="text" id="text" 
        placeholder="<p>Placeholder Text</p>" rows={text.split("\n").length||[1]} value={this.state.text ? this.state.text : text } onChange={this.handleChange}/>
        <br/>
        {/* <Button outline color="primary" onClick={(e)=>e.preventDefault()}> Preview HTML</Button> */}
    </FormGroup>


    {/* FILE UPLOAD */}
    <FormGroup>
        <Label for="file">Files</Label>
        <Input type="file" name="file" id="file" multiple onChange={this.handleFileSubmitChange}/>
    </FormGroup>

    


    {/* CAPTIONS */}

    
    {attachments.length ? attachments.map(({ file, caption },i)=> (
        <Row key ={i}>
            <Col sm={12} md={6} style={{wordWrap:'flex-wrap'}}><Label>{`${file.substr(0,8)}...${file.substr(file.length-3, file.length)}`}</Label></Col>
            <Col sm={12} md={6}><Button onSubmit={(e)=>e.preventDefault()} outline onClick={()=>this.deleteFile(i)}>Delete</Button></Col>
            <Col sm={12} md={6}>
                <img src={`https://s3.amazonaws.com/www.domdecarlo.com2/public/files/gimgs/${file}`} />
            </Col>

            <Col sm={12} md={6}>
                <Input type="textarea" id={`caption${i}`} value={caption !=='null' && this.state.captions.length ? caption : this.state.captions[i]} onChange={this.handleCaption}  />
            </Col>
        </Row>

        ))
    : null }  


    <FormGroup>
        <legend>Image display options</legend>
        <FormGroup check>
        <Label check>
            <Input type="checkbox"  value={this.state.slideshow ? this.state.slideshow : slideshow } onClick={()=>this.setState({slideshow: !this.state.slideshow})}/>{' '}
            Slideshow
        </Label>
        </FormGroup>
    </FormGroup>
    <Row>
        <Col xs={10}>
            <Button onClick={this.handleSubmit} color="primary" outline >Save</Button>
        </Col>
        <Col xs={2} >
            <Button onClick={this.deletePage} color="danger" outline >Delete Page</Button>
        </Col>
    </Row>
    </Form>














            </div>
        )
    }
}