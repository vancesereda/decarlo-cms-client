import React, { Component } from 'react'
import alphasort from 'alphanum-sort'
import { Storage } from 'aws-amplify';
import { Input, FormGroup, Form, Label} from 'reactstrap'
import SimpleSlider from './SimpleSlider'



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
        
        return (
        <div> {slideshow === 'true' ? <SimpleSlider items={items}/> : <ImageMap items={items}/> } </div>
        )

        

    }
}


