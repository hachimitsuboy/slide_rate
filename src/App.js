import './App.css';

import Measure from './Measure';

export const App = () => {
  const slideTextLengths = [200, 300, 400];
  return (
    <div style={{ height: '500px', width: '800px' }}>
      <Measure slideTextLengths={slideTextLengths} />
    </div>
  );
};

export default App;
