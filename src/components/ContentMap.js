import React, { Component } from 'react'
import alphasort from 'alphanum-sort'
import NukaSlider from './NukaSlider';
import { Storage } from 'aws-amplify';
import { Input, FormGroup, Form, Label} from 'reactstrap'



const ImageMap = ({items}) => {
    return items.map((item, i) => (
                <div key={i}>
                    <img src={`https://s3.amazonaws.com/www.domdecarlo.com/files/gimgs/${item.file}`} />
                    {item.caption === "undefined" ? item.caption : ''}
                </div>
            ))
}



export default class ContentMap extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { items, slideshow, setNumber } = this.props;
        
        if (slideshow === 'true') {
            if (setNumber === `31`) { //daily photos set is #31
                return (
                    <div>
                        <NukaSlider items={items} />
                    </div>
                )
            } else {
                return (
                    <div>
                        <span className="lg-scrn">
                            <NukaSlider items={items} />
                        </span>
                        <span className="sm-scrn">
                            <ImageMap items={items} />
                        </span>
                    </div>

                )
            }
        } else if (setNumber.length) {
            return (
            <ImageMap items={items} />
            )
        } else {
            return (<div></div>)
        } 
    }
}


