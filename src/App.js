import './App.css';

import Measure from './Measure';

export const App = () => {
  const slideTextLengths = [300, 200, 400];
  return (
    <div style={{ height: '500px', width: '800px' }}>
      <Measure slideTextLengths={slideTextLengths} />
    </div>
  );
};

export default App;
