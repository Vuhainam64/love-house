import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import allUserReducer from "./allUserReducer";
import allNewsReducer from "./allNewsReducer";
import allBlogReducer from "./allBlogReducer";
import allSampleProjectReducer from "./allSampleProjectReducer";

const myReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  allUsers: allUserReducer,
  allNews: allNewsReducer,
  allBlog: allBlogReducer,
  allSampleProject: allSampleProjectReducer,
});

export default myReducer;