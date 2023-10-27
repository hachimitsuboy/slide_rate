import { useState, useEffect } from 'react';

const TargetArea = ({ percentageStart, percentageEnd, areaCount }) => {
  const [prePercentageStart, setPrePercentageStart] = useState(percentageStart);
  const [prePercentageEnd, setPrePercentageEnd] = useState(percentageEnd);

  console.log(
    'PercentageStart: ',
    percentageStart,
    'PercentageEnd: ',
    percentageEnd,
    'areaCount: ',
    areaCount
  );

  useEffect(() => {
    if (areaCount % 2 === 1) {
      setPrePercentageStart(percentageStart);
      setPrePercentageEnd(percentageEnd);
    }
  }, [areaCount, percentageStart, percentageEnd]);

  return areaCount % 2 === 1 ? (
    <div
      className="green-highlight"
      style={{
        position: 'absolute',
        height: '100%',
        background: 'green',
        left: `${percentageStart}%`,
        width: `${percentageEnd - percentageStart}%`
      }}
    ></div>
  ) : (
    <div
      className="green-highlight"
      style={{
        position: 'absolute',
        height: '100%',
        background: 'green',
        left: `${prePercentageStart}%`,
        width: `${prePercentageEnd - prePercentageStart}%`
      }}
    ></div>
  );
};

export default TargetArea;
