import React from 'react';
import Carousel from 'nuka-carousel';


export default class NukaSlider extends React.Component {

  
  render() {
    return (
      <div className="">
        <Carousel 
          renderBottomCenterControls = {
            this.props.items.length > 20 ? null :
            Carousel.defaultProps.renderBottomCenterControls
          }
          wrapAround = {true}
        >
        {/* {console.log(Carousel.defaultProps.renderBottomCenterControls)} */}

          {this.props.items.map( (item, i) =>  (
            <div className="carousel-width">
                  <img key={item.file} 
                       src={`https://s3.amazonaws.com/www.domdecarlo.com/files/gimgs/${item.file}`}
                       onLoad={() => 
                        window.dispatchEvent(new Event('resize'))
                       }
                  />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}