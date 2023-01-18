import axios from "axios";
import {
  EVENT_ACTION_DELETE_TYPES,
  EVENT_ACTION_SUBMIT_TYPES,
  EVENT_ACTION_TYPES,
  EVENT_ACTION_UPDATE_TYPES,
  EVENT_INVITES_ACTION_TYPES,
  EVENT_INVITE_ACTION_TYPES,
  EVENT_INVITE_DELETE_ACTION_TYPES,
  EVENT_INVITE_LIST_COUNT_ACTION_TYPES,
  EVENT_LIST_SINGLE_TYPES,
  SUBMIT_INVITE_EVENT_ACTION_TYPES,
} from "constants/redux-constants";
import ENDPOINTS from "constants/endpoints";

export const listEvents = () => async (dispatch: any) => {
  try {
    dispatch({
      type: EVENT_ACTION_TYPES.EVENT_LIST_REQUEST,
    });
    const { data } = await axios.get(ENDPOINTS.EVENTS);
    dispatch({
      type: EVENT_ACTION_TYPES.EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EVENT_ACTION_TYPES.EVENT_LIST_FAIL,
      payload:
        error?.response! && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEventInviteDetails = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: EVENT_INVITE_ACTION_TYPES.EVENT_INVITE_LIST_REQUEST,
    });
    const { data } = await axios.get(ENDPOINTS.EVENT_INVITE.replace(":id", id));
    dispatch({
      type: EVENT_INVITE_ACTION_TYPES.EVENT_INVITE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EVENT_INVITE_ACTION_TYPES.EVENT_INVITE_LIST_FAIL,
      payload:
        error?.response! && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSingleEvent = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: EVENT_LIST_SINGLE_TYPES.EVENT_LIST_SINGLE_REQUEST,
    });
    const { data } = await axios.get(ENDPOINTS.EVENT_SINGLE.replace(":id", id));
    dispatch({
      type: EVENT_LIST_SINGLE_TYPES.EVENT_LIST_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EVENT_LIST_SINGLE_TYPES.EVENT_LIST_SINGLE_FAIL,
      payload:
        error?.response! && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEventInvites = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: EVENT_INVITES_ACTION_TYPES.EVENT_INVITES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(ENDPOINTS.ADMIN_EVENT_INVITES, config);

    dispatch({
      type: EVENT_INVITES_ACTION_TYPES.EVENT_INVITES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EVENT_INVITES_ACTION_TYPES.EVENT_INVITES_LIST_FAIL,
      payload:
        error?.response! && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEventInvite =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: EVENT_INVITE_DELETE_ACTION_TYPES.EVENT_INVITE_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(ENDPOINTS.EVENT_INVITE.replace(":id", id), config);

      dispatch({
        type: EVENT_INVITE_DELETE_ACTION_TYPES.EVENT_INVITE_DELETE_SUCCESS,
      });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EVENT_INVITE_DELETE_ACTION_TYPES.EVENT_INVITE_DELETE_SUCCESS,
        payload: message,
      });
    }
  };

export const submitInvite =
  (
    referenceId: string,
    eventId: string,
    date: string,
    fullName: string,
    mobileNumber: string,
    emailAddress: string,
    agentNumber: string,
    invitee: string,
    remarks: string
  ) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: SUBMIT_INVITE_EVENT_ACTION_TYPES.SUBMIT_INVITE_EVENT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        ENDPOINTS.EVENT_INVITE_SUBMIT,
        {
          referenceId,
          eventId,
          date,
          fullName,
          mobileNumber,
          emailAddress,
          agentNumber,
          invitee,
          remarks,
        },
        config
      );

      dispatch({
        type: SUBMIT_INVITE_EVENT_ACTION_TYPES.SUBMIT_INVITE_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SUBMIT_INVITE_EVENT_ACTION_TYPES.SUBMIT_INVITE_EVENT_FAIL,
        payload:
          error?.response! && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createEvent =
  (
    title: string,
    description: string,
    event_date: string,
    variant: string,
    image: any,
    ticket: any
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: EVENT_ACTION_SUBMIT_TYPES.EVENT_LIST_SUBMIT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        ENDPOINTS.ADD_EVENT,
        {
          title,
          description,
          event_date,
          variant,
          image,
          ticket,
        },
        config
      );

      dispatch({
        type: EVENT_ACTION_SUBMIT_TYPES.EVENT_LIST_SUBMIT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: EVENT_ACTION_SUBMIT_TYPES.EVENT_LIST_SUBMIT_FAIL,
        payload:
          error?.response! && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEvent =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: EVENT_ACTION_DELETE_TYPES.EVENT_LIST_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(ENDPOINTS.EVENT_SINGLE.replace(":id", id), config);

      dispatch({
        type: EVENT_ACTION_DELETE_TYPES.EVENT_LIST_DELETE_SUCCESS,
      });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EVENT_ACTION_DELETE_TYPES.EVENT_LIST_DELETE_FAIL,
        payload: message,
      });
    }
  };

export const updateEvent =
  (
    id: string,
    title: string,
    description: string,
    event_date: string,
    variant: string,
    image: any,
    ticket: any
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: EVENT_ACTION_UPDATE_TYPES.EVENT_LIST_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        ENDPOINTS.UPDATE_EVENT,
        {
          id,
          title,
          description,
          event_date,
          variant,
          image,
          ticket,
        },
        config
      );

      dispatch({
        type: EVENT_ACTION_UPDATE_TYPES.EVENT_LIST_UPDATE_SUCCESS,
        payload: data,
      });
      // dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: EVENT_ACTION_UPDATE_TYPES.EVENT_LIST_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const listEventInvitesByEventId =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: EVENT_INVITE_LIST_COUNT_ACTION_TYPES.EVENT_INVITE_LIST_COUNT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        ENDPOINTS.EVENT_INVITE_BY_EVENT_ID,
        config
      );

      dispatch({
        type: EVENT_INVITE_LIST_COUNT_ACTION_TYPES.EVENT_INVITE_LIST_COUNT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: EVENT_INVITE_LIST_COUNT_ACTION_TYPES.EVENT_INVITE_LIST_COUNT_FAIL,
        payload:
          error?.response! && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
