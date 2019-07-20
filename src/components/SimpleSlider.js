import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: this.props.items.length < 15 ? true : false,
      infinite: false,
      speed: 350,
      lazyload: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      animate: true,
      initialSlide: 0,
      className:'slider-width'
    };
    return (
      <div>
        <Slider {...settings}>
        {this.props.items.map((item, i) =>  (
          <div>
                <p>{item.caption !== 'null' ? item.caption : ''}</p>
                <img key={item.file} src={`https://s3.amazonaws.com/www.domdecarlo.com2/public/files/gimgs/${item.file}`}
                onLoad={()=>window.dispatchEvent(new Event('resize'))}/>
          </div>
        ))}
        </Slider>
      </div>
    );
  }
}