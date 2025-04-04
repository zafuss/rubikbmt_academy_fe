import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import levelReducer from "./level.reducer";
import cubeSkillReducer from "./cubeSkill.reducer";
import cubeSubjectReducer from "./cubeSubject.reducer";
const rootReducer = combineReducers({
  userReducer,
  levelReducer,
  cubeSkillReducer,
  cubeSubjectReducer
});

export default rootReducer;
