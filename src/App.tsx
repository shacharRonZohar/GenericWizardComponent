import './App.css';
import { GenericWizard } from './components/GenericWizard/GenericWizard';
import { mockQuestions } from './util/mockData';

function App() {
  return (
    <GenericWizard
      initialQuestions={mockQuestions}
      onComplete={() => {
        console.log('onComplete');
      }}
      startingQuestionIndex={0}
    />
  );
}

export default App;
