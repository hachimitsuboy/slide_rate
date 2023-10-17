
import './App.css';

import React, { useState, useEffect } from 'react';

export const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [textFlag, setTextFlag] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (startTime === null) {
          // 最初のEnterキーが押されたとき
          setStartTime(Date.now());
          setTimeDifference(null);
          setTextFlag(!textFlag);
        } else if (endTime === null) {
          // 2回目のEnterキーが押されたとき
          setEndTime(Date.now());
          setTextFlag(!textFlag);
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      // コンポーネントがアンマウントされるときにイベントリスナーを削除
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      const difference = endTime - startTime;
      setTimeDifference(difference);
      setStartTime(null); // 計測終了後、再度計測できるように初期化
      setEndTime(null);
    }
  }, [startTime, endTime]);

  return (
    <div>
      <p>
        {textFlag
          ? 'エンターキーを押して計測開始'
          : 'もう一度エンターキーを押して計測終了'}
      </p>
      {timeDifference !== null && (
        <p>Enterキーを2回押すまでの時間: {timeDifference} ミリ秒</p>
      )}
    </div>
  );
};

export default App;
