import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import allUserReducer from "./allUserReducer";
import allNewsReducer from "./allNewsReducer";
import allBlogReducer from "./allBlogReducer";
import allSampleProjectReducer from "./allSampleProjectReducer";
import allRolesReducer from "./allRolesReducer";

const myReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  allUsers: allUserReducer,
  allNews: allNewsReducer,
  allBlog: allBlogReducer,
  allSampleProject: allSampleProjectReducer,
  allRoles: allRolesReducer,
});

export default myReducer;