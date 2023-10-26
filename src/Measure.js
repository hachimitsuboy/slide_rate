import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Graph from './Graph';

const Measure = ({ slideTextLengths }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordsPerMinute, setWordsPerMinute] = useState(null);
  const [textFlag, setTextFlag] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideTimings = slideTextLengths.map(length => (length / 300) * 60);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (startTime === null) {
          resetTranscript();
          setWordsPerMinute(null);
          setStartTime(Date.now());
          SpeechRecognition.startListening({ continuous: true });
          setTextFlag(!textFlag);
        } else if (endTime === null) {
          setEndTime(Date.now());
          SpeechRecognition.stopListening();
          const difference = Date.now() - startTime;
          const seconds = Math.floor(difference / 1000);
          const actualWordsPerMinute = transcript.length / seconds * 60
          console.log("内容: ", transcript);
          console.log("時間: ", seconds);
          console.log("話速度: ", actualWordsPerMinute)
        
          setWordsPerMinute(actualWordsPerMinute);
          setTextFlag(!textFlag);
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [startTime, endTime, transcript]);

  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      setStartTime(null);
      setEndTime(null);
      setCurrentSlide(currentSlide + 1);
    }
  }, [startTime, endTime]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>
        {textFlag
          ? 'エンターキーを押して計測開始'
          : 'もう一度エンターキーを押して計測終了'}
      </p>
      <p>{transcript}</p>
      {wordsPerMinute !== null && <p>一分間に: {wordsPerMinute} 文字ペース</p>}
      <Graph
        slideTiming={slideTimings[currentSlide]}
        slideTextLength={slideTextLengths[currentSlide]}
        actualWordsPerMinute={wordsPerMinute}
      />
    </div>
  );
};

export default Measure;
