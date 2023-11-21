import './App.css';

import Measure from './Measure';

export const App = () => {
  const slideTextLengths = [175, 425, 425];
  return (
    <div style={{ height: '500px', width: '800px' }}>
      <Measure slideTextLengths={slideTextLengths} />
    </div>
  );
};

export default App;
