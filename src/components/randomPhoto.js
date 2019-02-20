import React, { Component } from 'react'
import { Storage } from 'aws-amplify'
import Draggable from 'react-draggable'

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
        
        this.getScriptImages();

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
                    return Math.random()*height/1.5;
                }
            })
        })
    }


    getScriptImages = () => {
        
        Storage.list(`files/script_images/art/`).then(res=>{
            
            const script_images = res.map((obj,i)=>obj.key).filter(key=>!(key.includes('~')))
            this.setState({ script_images })
            return script_images;

        }).catch(e=>console.log(e))
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
                    <div className="front-page-text"><strong>Click and drag the images that appear.</strong></div>
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
                                            <img src={`https://s3.amazonaws.com/www.domdecarlo.com2/public/${img}`} key={i+2} />
                                        </div>
                                    </Draggable>
                            )
                        })}
                </div>
            
            </div>
        )
    }
}

