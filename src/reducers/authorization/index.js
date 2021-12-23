import { combineReducers } from 'redux'
import authorized from './authorized'

///// create combine for this folder
const app = combineReducers({
  authorized,
});

///// export combine
export default app

///// export simple variables
export const isAuthorized = state => state.authorization.authorized;
