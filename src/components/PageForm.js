import React from 'react';



const PageForm = (props) => (


    <Form onSubmit={props.handleSubmit}>
    <FormGroup>
      <Label for="exampleEmail">Page Name</Label>
      <Input type="text" name="email" id="name" placeholder="Name" onChange={props.handleChange}/>
    </FormGroup>


    <FormGroup>
      <Label for="examplePassword">Page URL (decarlo.design/url)</Label>
      <Input type="text" name="password" id="to" placeholder="example - daily-photos" onChange={props.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="exampleSelect">Select Year</Label>
      <Input type="select" name="select" id="section" onChange={props.handleChange}>
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
        placeholder="<p>Placeholder Text</p>" onChange={props.handleChange}/>
      <br/>
      {/* <Button outline color="primary" onClick={(e)=>e.preventDefault()}> Preview HTML</Button> */}
    </FormGroup>


    {/* FILE UPLOAD */}
    <FormGroup>
      <Label for="file">Files</Label>
      <Input type="file" name="file" id="file" multiple onChange={props.handleFileSubmitChange}/>
      
    </FormGroup>


    {/* CAPTIONS */}

    <FormGroup>
    <Label for="captions">{files.length ?` Insert Captions` : ''}</Label>
    

    {files.map((file,i)=> (
        <Row key ={i}>
            <Col sm={12} md={6} style={{wordWrap:'flex-wrap'}}><Label>{`${file.name.substr(0,8)}...${file.name.substr(file.name.length-3, file.name.length)}`}</Label></Col>
            <Col sm={12} md={6}><Button onSubmit={(e)=>e.preventDefault()} onClick={()=>props.deleteFile(i)}>Delete</Button></Col>
            <Col sm={12} md={6}>
                <img src={URL.createObjectURL(file)} />
            </Col>

            <Col sm={12} md={6}>
                <Input type="textarea" id={`caption${i}`} value={props.captions[i]} onChange={props.handleCaption}  />
            </Col>
        </Row>

        ))
    }
    </FormGroup>


    <FormGroup>
      <legend>Image display options</legend>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"  value={props.slideshow} onClick={()=>props.setState({slideshow: !props.slideshow})}/>{' '}
          Slideshow
        </Label>
      </FormGroup>
    </FormGroup>
    
    <Button onClick={props.handleSubmit}>Submit</Button>
  </Form>





)