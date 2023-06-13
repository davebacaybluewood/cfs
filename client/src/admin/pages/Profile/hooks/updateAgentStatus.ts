import { AgentStatuses } from "admin/pages/Agents/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";

const updateAgentStatus = (agentId: string, status: AgentStatuses) => {
  axios
    .put(
      ENDPOINTS.AGENT_UPDATE_STATUS.replace(":agentId", agentId),
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }
    )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateAgentStatus;
