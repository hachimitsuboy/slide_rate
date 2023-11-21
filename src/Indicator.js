import React from 'react';

const Indicator = ({ value }) => {
  let x = 300;
  let y = 120;
  const trapezoidList = [];
  for (let i = 0; i < 10; i++) {
    trapezoidList.push(`${x},${y} ${x + 30},${y - 10} ${x + 30},150 ${x},150`);
    x = x + 35;
    y = y - 10;
  }

  const getActiveCount = (value) => {
    if (value < 260) return 1;
    if (value < 270) return 2;
    if (value < 280) return 3;
    if (value < 290) return 4;
    if (value < 300) return 5;
    if (value < 310) return 6;
    if (value < 320) return 7;
    if (value < 330) return 8;
    if (value < 340) return 9;
    return 10;
  };

  const activeCount = getActiveCount(value);

  const getColor = (index) => {
    let color;
    if (value === null) {
      if (index < 6) {
        return color = 'rgba(0, 128, 0, 0.1'; // rgba for green
      } else if (index < 8) {
        return color = 'rgba(255, 165, 0, 0.1'; // rgba for orange
      } else {
        return color = 'rgba(255, 0, 0, 0.1'; // rgba for red
      }
    }
    if (index < 6) {
      color = 'rgba(0, 128, 0, '; // rgba for green
    } else if (index < 8) {
      color = 'rgba(255, 165, 0, '; // rgba for orange
    } else {
      color = 'rgba(255, 0, 0, '; // rgba for red
    }
    return color + (index < activeCount ? '1)' : '0.1)'); // Add opacity based on active state
  };

  return (
    <svg width="900" height="200" xmlns="http://www.w3.org/2000/svg">
      {trapezoidList.map((points, index) => (
        <polygon key={index} points={points} fill={getColor(index)} />
      ))}
    </svg>
  );
};

export default Indicator;
