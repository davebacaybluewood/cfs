import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useFetchAgent from "admin/pages/Agents/hooks/useFetchAgent";
import { useEffect, useState } from "react";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { toast } from "react-toastify";
import Title from "admin/components/Title/Title";
import { Box, Paper } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { useParams } from "react-router-dom";
import Spinner from "library/Spinner/Spinner";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Profile",
    url: paths.profile,
    isActive: false,
  },
  {
    title: "Profile Settings",
    url: paths.profileSettings,
    isActive: true,
  },
];
const PawSettings = () => {
  const [displayCalendlyToggle, setDisplayCalendlyToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userGuid } = useParams();

  const { agent, loading: profileLoading } = useFetchAgent(userGuid ?? "");

  useEffect(() => {
    setDisplayCalendlyToggle(agent?.displayCalendly);
  }, [userGuid, agent]);

  const handleSwitchChange = (mode: boolean) => {
    setLoading(true);
    const data = {
      displayCalendly: !displayCalendlyToggle,
    };
    const headers = {
      Authorization: `Bearer ${getUserToken()}`,
      "Content-Type": "application/json",
    };

    axios
      .put(
        ENDPOINTS.PROFILE_SETTINGS.replace(":userGuid", userGuid ?? ""),
        data,
        { headers }
      )
      .then((response) => {
        toast.info(`Profile Updated`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        setDisplayCalendlyToggle(!displayCalendlyToggle);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={profileLoading}
      className="setting-container"
    >
      <Box>
        <Paper>
          {loading ? <Spinner variant="fixed" /> : null}
          <div className="setting">
            <Title
              title="Profile Settings"
              subtitle="Configure your profile settings."
            />
            <FormControl
              component="fieldset"
              variant="standard"
              className="toggle-settings"
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={displayCalendlyToggle}
                      onChange={() => {
                        handleSwitchChange(!displayCalendlyToggle);
                      }}
                      name="socmeds"
                    />
                  }
                  label="Calendly Section"
                />
              </FormGroup>
              {loading ? <Spinner variant="fixed" /> : null}
            </FormControl>
          </div>
        </Paper>
      </Box>
    </Wrapper>
  );
};

export default PawSettings;
