
'use client'

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PirceSlider = () => {
  const [price, setPrice] = useState([0, 500]);

  const handleOnChange = (value) => {
    setPrice(value);
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price[0]}</span>-
          <span className="js-upper mx-1">${price[1]}</span>
        </div>
      </div>

      <div className="px-5">
        <Slider
          range
          min={0}
          max={2000}
          value={price}
          onChange={handleOnChange}
          trackStyle={[{ backgroundColor: '#036', height: 6 }]}
          handleStyle={[
            { borderColor: '#036', height: 20, width: 20, backgroundColor: '#036' },
            { borderColor: '#036', height: 20, width: 20, backgroundColor: '#036' }
          ]}
          railStyle={{ backgroundColor: '#ddd', height: 6 }}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
