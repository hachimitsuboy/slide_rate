import React, { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import Graph from './Graph';

const Measure = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordsPerMinute, setWordsPerMinute] = useState(null);
  const [textFlag, setTextFlag] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (startTime === null) {
          // 最初のEnterキーが押されたとき
          resetTranscript();
          setWordsPerMinute(null);
          setStartTime(Date.now());
          SpeechRecognition.startListening({ continuous: true });
          setTextFlag(!textFlag);
        } else if (endTime === null) {
          // 2回目のEnterキーが押されたとき
          setEndTime(Date.now());
          SpeechRecognition.stopListening();
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
      const seconds = Math.floor(difference / 1000);
      const lengthPerSecond = transcript.length / seconds;
      const lenghtPerMinute = lengthPerSecond * 60;
      setWordsPerMinute(lenghtPerMinute);
      setStartTime(null); // 計測終了後、再度計測できるように初期化
      setEndTime(null);

      console.log('文字数: ', transcript.length);
      console.log('秒数: ', seconds);
      console.log('ミリ秒数: ', difference);
    }
  }, [startTime, endTime]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser dosen't support speach recognition.</span>;
  }

  return (
    <div>
      <p>
        {textFlag
          ? 'エンターキーを押して計測開始'
          : 'もう一度エンターキーを押して計測終了'}
      </p>
      {wordsPerMinute !== null && <p>一分間に: {wordsPerMinute} 文字ペース</p>}
      <Graph start={4} end={5} result={wordsPerMinute} />
    </div>
  );
};

export default Measure;
