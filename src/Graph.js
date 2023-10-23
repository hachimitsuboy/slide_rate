import React from 'react';
import './Graph.css';

const LINE_LENGTH = 11;

const Graph = ({ start, end, value }) => {
  const percentageStart = (start / (LINE_LENGTH - 1)) * 100;
  const percentageWidth = ((end - start + 1) / (LINE_LENGTH - 1)) * 100;

  // valueに基づいて丸い点の基本的な位置を計算
  const circleMarkerBasePosition =
    value > 250 && value < 350 ? Math.floor((value - 250) / 10) : 4;

  // valueに基づいて領域内の位置を計算
  const circleMarkerOffset = value > 250 && value < 350 ? value % 10 : 4;

  console.log('circleMarkerBasePosition: ', circleMarkerBasePosition);
  console.log('cicleMarkerOffset: ', circleMarkerOffset);

  return (
    <div className="shapes-container">
      {/* 赤色の長方形 */}
      <div
        className="green-highlight"
        style={{
          left: `${percentageStart}%`,
          width: `${percentageWidth}%`
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
      {circleMarkerBasePosition >= 0 &&
        circleMarkerBasePosition < LINE_LENGTH && (
          <div
            className="circle-marker"
            style={{
              left: `calc(${
                (circleMarkerBasePosition / (LINE_LENGTH - 1)) * 100
              }% + ${
                (circleMarkerOffset / 10) * ((1 / (LINE_LENGTH - 1)) * 100)
              }%)`
            }}
          ></div>
        )}
    </div>
  );
};

export default Graph;
