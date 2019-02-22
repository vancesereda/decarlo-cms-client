import React, { Component } from 'react'
import { API, Storage } from 'aws-amplify'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import s3Upload from '../libs/awsLib'




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
        this.state = {}
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

        const length = Object.keys(this.state).length
        const entries = Object.entries(this.state)
        const body = {...this.state}

        
        

        if (body.length) {
            
            
            API.put("pages", `/pages/${this.props.match.params}`, { body })
            




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
            }
        } else {
            const tags = [];
            tags.push(e.target.id)
            this.setState({tags})
        }

    }





    render() {
        const { isAuthenticated, currentPage: { tags, name, text, section, to, slideshow, attachments } , currentPage } = this.props || "";
        console.log('this.state: ', this.state, `\n`, 'this.props:  ', this.props)
        console.log(Object.entries(this.state))

        return (
    <div>
    <h1>Edit Page</h1>

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
        {tagsList.map((tag, i)=>
            <Col xs={6} key={i}>
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" id={tag} onChange={this.handleTags}/>
                    {tag}
                    </Label>
                </FormGroup>
            </Col>)
        }
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
                <Input type="textarea" id={`caption${i}`} value={caption!=='null' && this.state.caption ? caption : this.state.captions[i]} onChange={this.handleCaption}  />
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