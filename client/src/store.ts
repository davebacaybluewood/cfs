import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createEventReducer,
  eventDeleteReducer,
  eventInviteDeleteReducer,
  eventInviteDetailsReducer,
  eventInvitesListReducer,
  eventListReducer,
  eventListSingleReducer,
  eventUpdateReducer,
} from "redux/reducers/eventReducers";
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "redux/reducers/userReducers";
import { contactListReducer } from "redux/reducers/contactReducers";
import { inquiryListReducer } from "redux/reducers/inquiryReducers";
import {
  agentListReducer,
  agentListSingleReducer,
  createAgentReducer,
} from "redux/reducers/agentReducers";
import { achivementReducers } from "redux/reducers/achievementReducers";
import { rewardReducers } from "redux/reducers/rewardReducers";

const reducer = combineReducers({
  eventList: eventListReducer,
  eventInviteDetails: eventInviteDetailsReducer,

  /* Admin Reducers */
  userLogin: userLoginReducer,
  eventInvitesList: eventInvitesListReducer,
  eventInvitesDelete: eventInviteDeleteReducer,
  contactList: contactListReducer,
  inquiryList: inquiryListReducer,
  createEvent: createEventReducer,
  deleteEveent: eventDeleteReducer,
  updateEvent: eventUpdateReducer,
  eventSingleDetails: eventListSingleReducer,
  userAdminList: userListReducer,
  userAdminRegister: userRegisterReducer,
  agentList: agentListReducer,
  agentSingle: agentListSingleReducer,
  agentAdd: createAgentReducer,
  achievements: achivementReducers,
  rewards: rewardReducers,
});

export type RootState = ReturnType<typeof reducer>;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
