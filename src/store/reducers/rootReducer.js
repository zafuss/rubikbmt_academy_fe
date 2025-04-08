import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import levelReducer from "./level.reducer";
import cubeSkillReducer from "./cubeSkill.reducer";
import cubeSubjectReducer from "./cubeSubject.reducer";
import courseReducer from "./course.reducer";
import courseDetailReducer from "./courseDetail.reducer";
import sessionReducer from "./session.reducer";
const rootReducer = combineReducers({
  userReducer,
  levelReducer,
  cubeSkillReducer,
  cubeSubjectReducer,
  courseReducer,
  courseDetailReducer,
  sessionReducer,
});

export default rootReducer;
