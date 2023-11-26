import './App.css';

import Measure from './Measure';

export const App = () => {
  const slideTextLengths = [
    173, 425, 425, 214, 511, 369, 362, 480, 180, 310, 357, 337, 373
  ];
  return (
    <div style={{ height: '500px', width: '800px' }}>
      <Measure slideTextLengths={slideTextLengths} />
    </div>
  );
};

export default App;
