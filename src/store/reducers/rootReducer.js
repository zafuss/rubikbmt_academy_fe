import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import levelReducer from "./level.reducer";
import cubeSkillReducer from "./cubeSkill.reducer";
import cubeSubjectReducer from "./cubeSubject.reducer";
import courseReducer from "./course.reducer";
const rootReducer = combineReducers({
  userReducer,
  levelReducer,
  cubeSkillReducer,
  cubeSubjectReducer,
  courseReducer
});

export default rootReducer;
