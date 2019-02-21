import React, { Component } from 'react'

import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';


export default class EditPage extends Component {


    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleChange = (e) => {


        this.setState({[e.target.id]:e.target.value})

    }





    render() {
        console.log('EDITPAGE PROPS: ', this.props);
        const { isAuthenticated, currentPage: {name, text, section, to}, handleChange } = this.props || "";
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
    <FormGroup>
        <Label for="exampleSelectMulti">Tags (select one or multiple)</Label>
        <Input type="select" name="selectMulti" id="tags" multiple>
        <option>Branding</option>
        <option>Fine Art</option>
        <option>Illustration</option>
        <option>Logo</option>
        <option>Posters</option>
        <option>Print Design</option>
        </Input>
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

    {/*  <FormGroup>
    <Label for="captions">{files.length ?` Insert Captions` : ''}</Label>
    
*/}
    {/* {files.map((file,i)=> (
        <Row key ={i}>
            <Col sm={12} md={6} style={{wordWrap:'flex-wrap'}}><Label>{`${file.name.substr(0,8)}...${file.name.substr(file.name.length-3, file.name.length)}`}</Label></Col>
            <Col sm={12} md={6}><Button onSubmit={(e)=>e.preventDefault()} onClick={()=>this.deleteFile(i)}>Delete</Button></Col>
            <Col sm={12} md={6}>
                <img src={URL.createObjectURL(file)} />
            </Col>

            <Col sm={12} md={6}>
                <Input type="textarea" id={`caption${i}`} value={this.state.captions[i]} onChange={this.handleCaption}  />
            </Col>
        </Row>

        ))
    } */}
    {/* </FormGroup>
*/}

    <FormGroup>
        <legend>Image display options</legend>
        <FormGroup check>
        <Label check>
            <Input type="checkbox"  value={this.state.slideshow} onClick={()=>this.setState({slideshow: !this.state.slideshow})}/>{' '}
            Slideshow
        </Label>
        </FormGroup>
    </FormGroup>
    
    <Button onClick={this.handleSubmit}>Submit</Button>
    </Form>














            </div>
        )
    }
}