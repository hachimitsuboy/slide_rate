import React from 'react';
import './Graph.css';
import TargetArea from './TargetArea';

const LINE_LENGTH = 11;

const Graph = ({
  slideTiming,
  slideTextLength,
  actualWordsPerMinute,
  areaCount
}) => {
  const idealWordsPerMinute = (slideTextLength / slideTiming) * 60;
  const lowerLimit = idealWordsPerMinute - 10;
  // Ensure the upperLimit is at least 310 for drawing purposes
  const upperLimit = Math.max(idealWordsPerMinute + 10, 310);

  const percentageStart = ((lowerLimit - 250) / (350 - 250)) * 100;
  // Use the adjusted upperLimit for percentageEnd calculation
  const percentageEnd = ((upperLimit - 250) / (350 - 250)) * 100;

  let circleMarkerBasePosition;
  let circleMarkerStyle = {};

  if (actualWordsPerMinute < 250) {
    circleMarkerStyle = { left: '-20px' }; // Adjust this to set the position for when it's below 250
  } else if (actualWordsPerMinute > 350) {
    circleMarkerStyle = { right: '-20px' }; // Adjust this to set the position for when it's above 350
  } else {
    circleMarkerBasePosition = Math.floor((actualWordsPerMinute - 250) / 10);
    const circleMarkerOffset = actualWordsPerMinute % 10;
    circleMarkerStyle = {
      left: `calc(${(circleMarkerBasePosition / (LINE_LENGTH - 1)) * 100}% + ${
        (circleMarkerOffset / 10) * ((1 / (LINE_LENGTH - 1)) * 100)
      }%)`
    };
  }

  // Marker for the 300 words per minute pace
  const marker300wpmPosition = ((300 - 250) / (350 - 250)) * 100;

  return (
    <div className="shapes-container" style={{ marginLeft: '120px' }}>
      {/* Green rectangle */}
      <TargetArea
        percentageStart={percentageStart}
        percentageEnd={percentageEnd}
        areaCount={areaCount}
      />
      {/* Base line */}
      {Array.from({ length: LINE_LENGTH }).map((_, index) => (
        <div
          key={index}
          className="memory-line"
          style={{
            left: `${(index / (LINE_LENGTH - 1)) * 100}%`
          }}
        ></div>
      ))}
      {/* Circle marker */}
      {actualWordsPerMinute !== null && (
        <div className="circle-marker" style={circleMarkerStyle}></div>
      )}
      {/* Marker for 300 wpm */}
      <div
        className="marker-300wpm"
        style={{
          position: 'absolute',
          height: '100%',
          width: '2px',
          background: 'blue',
          left: `${marker300wpmPosition}%`
        }}
      ></div>
    </div>
  );
};

export default Graph;
