import React from 'react';
import './Graph.css';

const LINE_LENGTH = 11;

const Graph = ({ slideTiming, slideTextLength, actualWordsPerMinute }) => {
  const idealWordsPerMinute = (slideTextLength / slideTiming) * 60;
  const lowerLimit = idealWordsPerMinute - 10;
  const upperLimit = idealWordsPerMinute + 10;

  const percentageStart = ((lowerLimit - 250) / (350 - 250)) * 100;
  const percentageEnd = ((upperLimit - 250) / (350 - 250)) * 100;

  let circleMarkerBasePosition;
  let circleMarkerStyle = {};

  if (actualWordsPerMinute < 250) {
    circleMarkerStyle = { left: '-20px' }; // ここを調整して250未満の時の位置を設定
  } else if (actualWordsPerMinute > 350) {
    circleMarkerStyle = { right: '-20px' }; // ここを調整して350以上の時の位置を設定
  } else {
    circleMarkerBasePosition = Math.floor((actualWordsPerMinute - 250) / 10);
    const circleMarkerOffset = actualWordsPerMinute % 10;
    circleMarkerStyle = {
      left: `calc(${(circleMarkerBasePosition / (LINE_LENGTH - 1)) * 100}% + ${
        (circleMarkerOffset / 10) * ((1 / (LINE_LENGTH - 1)) * 100)
      }%)`
    };
  }

  return (
    <div className="shapes-container" style={{ marginLeft: '100px' }}>
      {/* 緑色の長方形 */}
      <div
        className="green-highlight"
        style={{
          left: `${percentageStart}%`,
          width: `${percentageEnd - percentageStart}%`
        }}
      ></div>
      {/* 基本の直線 */}
      {Array.from({ length: LINE_LENGTH }).map((_, index) => (
        <div
          key={index}
          className="memory-line"
          style={{
            left: `${(index / (LINE_LENGTH - 1)) * 100}%`
          }}
        ></div>
      ))}
      {/* 丸い点 */}
      {actualWordsPerMinute !== null && (
        <div className="circle-marker" style={circleMarkerStyle}></div>
      )}
    </div>
  );
};

export default Graph;
