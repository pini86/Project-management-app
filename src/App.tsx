import { Provider } from 'react-redux';
import TestAuth from './testAuth/TestAuth';
import TestAuth2 from './testAuth/TestAuth2';
import { store } from './store/Index';

const App = () => (
  <Provider store={store}>
    <TestAuth />
    <TestAuth2 />
  </Provider>
);

export default App;

// TestAuth & TestAuth2 only for example for use api
