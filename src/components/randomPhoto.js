import React, { Component } from 'react'
import { Storage } from 'aws-amplify'
import Draggable from 'react-draggable'
var AWS = require('aws-sdk');
var s3 = new AWS.S3();


const AWS_S3 = new AWS.S3({
    accessKeyId: 'AKIAJDSAPBOWXVZNZV3A',
    region: 'us-east-1',
    secretAccessKey: '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',
});
export default class RandomPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zIndex: 0,
            click: -1,
            width: 0,
            height: 0,
            script_images: []

        };
        this.onClick = this.onClick.bind(this);
        this.newPicture = this.newPicture.bind(this);
        
    }

    newPicture() {
        const { zIndex } = this.state;
        this.setState({zIndex: zIndex+1})
    }

    onStart(e) {
        e.preventDefault();
    }

    onClick(val) {
        this.setState({click: val})
    }

    componentDidMount() {
        console.log('mount')
        
        this.getScriptImages();

        this.newPicture();

        requestAnimationFrame(() => { // requestAnimationFrame necessary for setInterval to work properly on Firefox. 
                this.interval = setInterval(()=>this.newPicture(), 5000)
            })
        this.handleWindow(window.innerWidth, window.innerHeight)


       

    }

    handleWindow = (width, height) => {
            
            this.setState({
                width, 
                height,
            })
            this.handleCoords(width, height);
    }

    handleCoords = (width, height) => {
        this.setState({
            left: Array.apply(null, Array(101)).map(()=> {
                if (width > 600) {
                    return Math.random()*(width/2)+300;
                } else {
                    return Math.random()*(width/2);
                }
            }),
            top: Array.apply(null, Array(101)).map(()=>{
                if (height < 850) {
                    return  Math.random()*(height-500) + 350
                } else {
                    return Math.random()*height/3;
                }
            })
        })
    }


    getScriptImages = () => {
        

        const listAllKeys = (params, out = []) => new Promise((resolve, reject) => {
            AWS_S3.listObjectsV2(params).promise()
              .then(({Contents, IsTruncated, NextContinuationToken}) => {
                out.push(...Contents);
                !IsTruncated ? resolve(out) : resolve(listAllKeys(Object.assign(params, {ContinuationToken: NextContinuationToken}), out));
              })
              .catch(reject);
          });
          
        listAllKeys({Bucket: 'www.domdecarlo.com2', Prefix: 'public/files/script_images/art/'})
            .then(res=> {
                console.log(res)
                const script_images = res.map(obj=> obj.Key).filter(key=>!(key.includes('~')))
                this.setState({script_images})
                console.log(script_images)
            })
            .catch(e=>console.log(e));

    }


    render() {
        const { zIndex , click, left, top , width } = this.state;
        const { script_images } = this.state || [];
        return (
            <div onClick={this.newPicture} className="random-photo">
            
                <div>
                    <div className="center-twenties">
                            <img src={`https://s3.amazonaws.com/www.domdecarlo.com2/public/files/gimgs/1_background_twenties.jpg`} />
                    </div>
                    <Draggable onStart={this.onStart} >
                    <div className="front-page-text"><h4>Welcome to my portfolio site. Click and drag to look at my pictures.</h4></div>
                    </Draggable>
                    
                        {script_images.map((img, i) => {
                            return (
                                    <Draggable onStart={this.onStart} onDrag = {()=>this.onClick(i)} key={i}>
                                        <div className="draggable-content"
                                            style={{
                                            'position': 'fixed',
                                            zIndex: `${click === i ? zIndex+2 : i}`,
                                            'left':`${width > 0 ? left[i] : 500}px`,
                                            'top':`${width > 0 ? top[i] : 500}px`,
                                            'height': 'auto'
                                            }} 
                                            key={i+1} 
                                            className={zIndex > i ? `img display` : `img nodisplay`}>
                                            <img src={`https://s3.amazonaws.com/www.domdecarlo.com2/${img}`} key={i+2} />
                                        </div>
                                    </Draggable>
                            )
                        })}
                </div>
            
            </div>
        )
    }
}

