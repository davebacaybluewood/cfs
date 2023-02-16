import { ROLES } from "AdminNew/constants/constants";
import { AgentStatuses } from "AdminNew/pages/Agents/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import {
  ADD_AGENT_ACTION_TYPES,
  AGENT_ACTION_TYPES,
  SINGLE_AGENT_ACTION_TYPES,
} from "constants/redux-constants";
import errorMessage from "./helpers/errorMessage";
import userInfoConfig from "./helpers/userInfoConfig";

const tempAgents = [
  {
    _id: "639ce4ff061e6ed3a75acf51",
    name: "Dave Spencer Bacay",
    avatar:
      "https://res.cloudinary.com/dkjjkr88j/image/upload/v1671226622/agent-avatars/b2b87c85df106e756462bedc3dd1b666_agaa6t.jpg",
    title: "Financial Agent",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    phoneNumber: "+1 (702) 900-5666",
    emailAddress: "spencerbacay@testdata.com",
    address: "Cavite, Philippines",
    calendlyLink: "https://calendly.com/gocfs/30min",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedIn: "https://linkedin.com",
    facebook: "https://facebook.com",
    testimonials: [],
    createdAt: "2022-12-16T21:37:03.324Z",
    updatedAt: "2022-12-16T21:37:03.324Z",
    __v: 0,
  },
  {
    _id: "639ce505061e6ed3a75acf54",
    name: "John Doe",
    avatar:
      "https://res.cloudinary.com/dkjjkr88j/image/upload/v1671226628/agent-avatars/7b288bb1d6fe914247f9334ef598e6ee_n1puun.jpg",
    title: "Financial Agent",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    phoneNumber: "+1 (702) 900-5666",
    emailAddress: "spencerbacay@testdata.com",
    address: "Cavite, Philippines",
    calendlyLink: "https://calendly.com/gocfs/30min",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedIn: "https://linkedin.com",
    facebook: "https://facebook.com",
    testimonials: [],
    createdAt: "2022-12-16T21:37:09.538Z",
    updatedAt: "2022-12-16T21:37:09.538Z",
    __v: 0,
  },
];
export const listAgents =
  (role: string, status?: AgentStatuses) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: AGENT_ACTION_TYPES.AGENT_ACTION_GET_REQUEST,
      });

      const queryStatus = `?status=${status ? status : ""}`;
      console.log(ENDPOINTS.AGENTS + queryStatus);

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
    fullName: string,
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
          fullName,
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
