import './App.css';

import Measure from './Measure';
import { useSpeechRecognition } from 'react-speech-recognition';

export const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser dosen't support speach recognition.</span>;
  }

  return (
    <>
      <Measure
        transcript={transcript}
        listening={listening}
        resetTranscript={resetTranscript}
      />
      
    </>
  );
};

export default App;
