import React, { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import Graph from './Graph';

const Measure = ({ slideTextLengths }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordsPerMinute, setWordsPerMinute] = useState(null);
  const [textFlag, setTextFlag] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [areaCount, setAreaCount] = useState(0);

  const initialSlideTimings = slideTextLengths.map(
    (length) => (length / 300) * 60
  );
  const [slideTimings, setSlideTimings] = useState(initialSlideTimings);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setAreaCount(areaCount + 1);
        if (startTime === null) {
          resetTranscript();
          setWordsPerMinute(null);
          setStartTime(Date.now());
          SpeechRecognition.startListening({ continuous: true });
          setTextFlag(!textFlag);
        } else if (endTime === null) {
          setEndTime(Date.now());
          SpeechRecognition.stopListening();
          setTextFlag(!textFlag);
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      const difference = endTime - startTime;
      const seconds = Math.floor(difference / 1000);
      console.log('経過時間： ', seconds);
      const actualWordsPerMinute = (transcript.length / seconds) * 60;
      setWordsPerMinute(actualWordsPerMinute);
      const overtime = seconds - slideTimings[currentSlide];

      const remainingSlides = slideTextLengths.length - (currentSlide + 1);
      if (remainingSlides > 0) {
        const distributedOvertime = overtime / remainingSlides;

        const updatedTimings = slideTimings.map((timing, index) => {
          if (index <= currentSlide) {
            return timing;
          }
          return timing - distributedOvertime;
        });
        setSlideTimings(updatedTimings);
      }

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
      {wordsPerMinute !== null && <p>一分間に: {wordsPerMinute} 文字ペース</p>}
      <p>{transcript}</p>
      <Graph
        slideTiming={slideTimings[currentSlide]}
        slideTextLength={slideTextLengths[currentSlide]}
        actualWordsPerMinute={wordsPerMinute}
        areaCount={areaCount}
      />
    </div>
  );
};

export default Measure;
