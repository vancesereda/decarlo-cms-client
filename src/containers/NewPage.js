import React, { Component } from 'react';
import config from '../config'
import { API } from 'aws-amplify';
import { s3Upload } from "../libs/awsLib";
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import '../css/NewPage.css'


export default class NewPage extends Component {
    
    constructor(props) {
        super(props);
    
        this.file = null;
    
        this.state = {
          isLoading: null,
          files: [],
          captions: [],
          slideshow: false,
          section: "2019",
          text: ""
        };
      }
    
    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(event.target.value)
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
    // handleFileChange = event => {
    //     this.file = event.target.files[0];
    // }

    handleSubmit = async event => {

        const { files, captions, to, text, slideshow, section , name } = this.state;
        event.preventDefault();
        files.forEach(file => {
            if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
                alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/10000} MB.`);
                return;
            }
            s3Upload(file)
        })
        console.log(this.state.section)
        

        const attachments = files.map((f,i) => {
            return {"file":`${f.name}`,
                    "caption": `${captions[i]}`}
        })

        this.setState({ attachments })


        
        this.setState({ isLoading: true });
          const body = { attachments , to,  text , slideshow , section, name }
          await API.post("pages", "/pages", { body }).then(res=>console.log(res)).catch(e=>console.log(e.response))
          this.props.history.push("/");
      }



    createNote(page) {
        return API.post("pages", "/pages", {
            body: page
        });
    }

    handleFileSubmitChange = (event) => {

        const { files, captions } = this.state;
        if (files.length && event.target.files.length < files.length) return;
        else {
            files.push(...event.target.files)
            this.setState({files})
        }


    }

    deleteFile = (i) => {
        const { files, captions } = this.state;
        files.splice(i,1);
        captions.splice(i,1);
        this.setState({files, captions})
        console.log(this.state.files, this.state.captions, files, captions)
    }


    

 



    render() {
        const { isAuthenticated } = this.props.childProps;
        const { files, attachments, captions, text} = this.state;
        return (
            <div>
            { isAuthenticated 
            ?
            <div>
            <h1>Create New Page</h1>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Page Name</Label>
              <Input type="text" name="email" id="name" placeholder="Name" onChange={this.handleChange}/>
            </FormGroup>


            <FormGroup>
              <Label for="examplePassword">Page URL (decarlo.design/url)</Label>
              <Input type="text" name="password" id="to" placeholder="example - daily-photos" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Select Year</Label>
              <Input type="select" name="select" id="section" onChange={this.handleChange}>
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
                placeholder="<p>Placeholder Text</p>" rows={text.split("\n").length||[1]} onChange={this.handleChange}/>
              <br/>
              {/* <Button outline color="primary" onClick={(e)=>e.preventDefault()}> Preview HTML</Button> */}
            </FormGroup>


            {/* FILE UPLOAD */}
            <FormGroup>
              <Label for="file">Files</Label>
              <Input type="file" name="file" id="file" multiple onChange={this.handleFileSubmitChange}/>
              
            </FormGroup>


            {/* CAPTIONS */}

            <FormGroup>
            <Label for="captions">{files.length ?` Insert Captions` : ''}</Label>
            

            {files.map((file,i)=> (
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
            }
            </FormGroup>


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
          :
          'Please log in.'
        }
        </div>
        )
    }



}

