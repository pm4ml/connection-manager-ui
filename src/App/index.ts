import App from './App';
import loadEnvironments from './ConnectionWizard/Environments/hocs/loadEnvironments';
import reducer from './reducers';

export default loadEnvironments(App);
export { reducer };
