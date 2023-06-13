import { ROLES } from "admin/constants/constants";
import { AgentStatuses } from "admin/pages/Agents/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import {
  ADD_AGENT_ACTION_TYPES,
  AGENT_ACTION_TYPES,
  SINGLE_AGENT_ACTION_TYPES,
} from "constants/redux-constants";
import errorMessage from "./helpers/errorMessage";
import userInfoConfig from "./helpers/userInfoConfig";

export const listAgents =
  (role: string, status?: AgentStatuses) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: AGENT_ACTION_TYPES.AGENT_ACTION_GET_REQUEST,
      });

      const queryStatus = `?status=${status ? status : ""}`;

      const { data } = await axios.get(
        ENDPOINTS.AGENTS + queryStatus,
        userInfoConfig(getState)
      );

      dispatch({
        type: AGENT_ACTION_TYPES.AGENT_ACTION_GET_SUCCESS,
        payload: role === ROLES.ROLE_MASTER_ADMIN ? data : data,
      });
    } catch (error: any) {
      dispatch({
        type: AGENT_ACTION_TYPES.AGENT_ACTION_GET_FAIL,
        payload: errorMessage(error),
      });
    }
  };

export const listSingleAgent =
  (id: string, isAdmin: boolean = false) =>
  async (dispatch: any) => {
    try {
      const query = isAdmin ? `?role=${ROLES.ROLE_MASTER_ADMIN}` : "";
      dispatch({
        type: SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_REQUEST,
      });
      const { data } = await axios.get(
        ENDPOINTS.AGENT_BY_ID.replace(":id", id) + query
      );

      dispatch({
        type: SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SINGLE_AGENT_ACTION_TYPES.SINGLE_AGENT_ACTION_GET_FAIL,
        payload: errorMessage(error),
      });
    }
  };

export const createAgent =
  (
    firstName: string,
    lastName: string,
    state: string,
    licenseNumber: string,
    position: string,
    bio: string,
    avatar: string,
    phoneNumber: string,
    emailAddress: string,
    address: string,
    twitter: string,
    instagram: string,
    linkedIn: string,
    facebook: string,
    password: string,
    telNumber: string,
    role: string,
    languages: string[],
    specialties: string[]
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        ENDPOINTS.AGENTS,
        {
          firstName,
          lastName,
          state,
          licenseNumber,
          title: position,
          bio,
          avatar,
          phoneNumber,
          emailAddress,
          address,
          twitter,
          instagram,
          linkedIn,
          facebook,
          password,
          telNumber,
          role,
          languages,
          specialties,
        },
        config
      );

      dispatch({
        type: ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADD_AGENT_ACTION_TYPES.ADD_AGENT_ACTION_FAIL,
        payload: errorMessage(error),
      });
    }
  };
