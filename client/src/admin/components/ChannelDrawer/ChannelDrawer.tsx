import React, { useContext, useEffect, useState } from "react";
import { Drawer, DrawerProps } from "@mui/material";
import { Form, Formik } from "formik";
import { string } from "yup";
import { FaPlus } from "react-icons/fa";
import FormikTextInput from "library/Formik/FormikInput";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "admin/context/UserProvider";
import agent from "admin/api/agent";
import DrawerConfirmation from "./DrawerConfirmation";
import Spinner from "library/Spinner/Spinner";
import generateRandomChars from "helpers/generateRandomChars";
import DrawerLoading from "./DrawerLoading";
import "./ChannelDrawer.scss";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import { toast } from "react-toastify";
import { ChannelData } from "admin/api/channelServices/channelModels";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import {
  SubscriberMainData,
  SubscribersData,
} from "admin/models/subscriberModel";

interface IField {
  name: string;
  label: string;
  initialValue: any;
  type: any;
  id: string;
  isNew?: boolean;
}

interface ChannelDrawerProps extends DrawerProps {
  title: string;
  children?: React.ReactNode | JSX.Element;
  subtitle: string;
  onClose: () => void;
  type?: "DYNAMIC" | "ALL";
  leadUserGuid?: string;
  channels?: never[] | string[];
}
const ChannelDrawer: React.FC<ChannelDrawerProps> = (props) => {
  const [activeChannel, setActiveChannel] = useState({
    title: "",
    id: "",
  });
  const [drawerConfirmationOpen, setDrawerConfirmationOpen] = useState(false);
  const [channels, setChannels] = useState<IField[]>([]);
  const [isLoading, setIsLoading] = useState({
    channelLoading: false,
    drawerLoading: false,
  });
  const userCtx = useContext(UserContext);
  const userGuid = userCtx?.user?.userGuid;

  const initialValues = Object.fromEntries(
    channels.map((field) => [field.name, field.initialValue])
  );
  const [addedChannels, setAddedChannels] = useState<string[]>();

  useEffect(() => {
    setAddedChannels(props.channels);
  }, [props.channels]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading({
        channelLoading: true,
        drawerLoading: isLoading.drawerLoading,
      });
      const data = await agent.Channels.getAllChannelsByUserGuid(
        userGuid ?? ""
      );

      const filteredChannels = data?.map((channel) => {
        return {
          name: channel.name,
          label: channel.name,
          initialValue: channel.name,
          type: string().required(),
          id: channel._id,
        };
      });
      setChannels(filteredChannels ?? []);
      setIsLoading({
        channelLoading: false,
        drawerLoading: isLoading.drawerLoading,
      });
    };

    getData();
  }, [userGuid]);

  const addAnotherChannelHandler = (id: string) => {
    const newData: IField[] = [
      {
        id: id,
        initialValue: "",
        label: id,
        name: id,
        type: string().required(),
        isNew: true,
      },
    ];
    setChannels([...channels, ...newData]);
  };

  const removeChannel = (id: string, title: string, isNew: boolean) => {
    if (isNew) {
      setChannels((prevState) => {
        return prevState.filter((data) => data.id !== id);
      });
    } else {
      setActiveChannel({
        id,
        title,
      });
      setDrawerConfirmationOpen(true);
    }
  };

  /** For deleting the channel from the DB */
  const deleteChannel = async (channelId: string) => {
    setIsLoading({
      channelLoading: false,
      drawerLoading: true,
    });
    try {
      await agent.Channels.deleteChannel(channelId);
    } finally {
      setChannels((prevState) =>
        prevState.filter((data) => data.id !== channelId)
      );
      setIsLoading({
        channelLoading: false,
        drawerLoading: false,
      });
      // toast.success("Channel Deleted");
      return true;
    }
  };

  const addChannel = async (channelName: string, channelId: string) => {
    const newChannel = [
      {
        name: channelName,
        displayOrder: 0,
        hierarchyCode: "", // TODO: In next stories
        userGuid,
      },
    ];

    setIsLoading({
      channelLoading: false,
      drawerLoading: true,
    });

    try {
      const data = await agent.Channels.createChannel(
        newChannel,
        userGuid ?? ""
      );

      setChannels((prevState) => {
        return prevState.map((el) =>
          el.id === channelId
            ? {
                ...el,
                label: channelName,
                id: (data ?? [])[0]._id,
                initialValue: channelName,
                isNew: false,
                name: channelName,
                type: string().required(),
              }
            : el
        );
      });
      // toast.success("Channel Created");
      return true;
    } catch (error) {
      toast.error("Channel name already existing");
    } finally {
      setIsLoading({
        channelLoading: false,
        drawerLoading: false,
      });
    }
  };

  const updateChannel = async (channelName: string, channelId: string) => {
    setIsLoading({
      channelLoading: false,
      drawerLoading: true,
    });

    try {
      const data = await agent.Channels.updateChannel(
        channelId,
        channelName ?? ""
      );

      setChannels((prevState) => {
        return prevState.map((el) =>
          el.id === channelId
            ? {
                ...el,
                label: channelName,
                id: data?._id ?? "",
                initialValue: channelName,
                isNew: false,
                name: channelName,
                type: string().required(),
              }
            : el
        );
      });
      // toast.success("Channel Updated");
      return true;
    } finally {
      setIsLoading({
        channelLoading: false,
        drawerLoading: false,
      });
    }
  };

  const updateLeadChannelLead = async (
    leadUserGuid: string,
    channels: string[] | undefined,
    newChannelName: string,
    type: "ADD" | "REMOVE"
  ) => {
    setIsLoading({
      channelLoading: false,
      drawerLoading: true,
    });

    try {
      const newChannelData = [...(channels ?? []), newChannelName];
      const removedChannelData = channels?.filter(
        (data) => data !== newChannelName
      );
      const modifiedChannelData =
        type === "ADD" ? newChannelData : removedChannelData ?? [];

      await agent.Channels.updateLeadChannelLead(
        leadUserGuid ?? "",
        modifiedChannelData
      );
      setAddedChannels(modifiedChannelData);
      return true;
    } finally {
      setIsLoading({
        channelLoading: false,
        drawerLoading: false,
      });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      className="channel-drawer"
      PaperProps={{
        sx: { width: "400px" },
      }}
    >
      <div className="drawer-container">
        <div className="drawer-captions">
          <h2>{props.title}</h2>
          <p>{props.subtitle}</p>
        </div>

        {isLoading.channelLoading ? (
          <Spinner variant="relative" />
        ) : (
          <div className="dynamic-textbox">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => console.log({ values })}
            >
              {({ values, errors, touched }) => {
                return (
                  <Form>
                    <div>
                      <div className="fields-container">
                        <NoInformationToDisplay
                          message="No information to display"
                          title="No existing channel"
                          showNoInfo={!channels.length}
                        >
                          <React.Fragment>
                            {channels?.map((data, index) => (
                              <div key={index}>
                                <div className="input-holder">
                                  <div className="input-container">
                                    {props.type === "DYNAMIC" ? (
                                      <p style={{ fontSize: 15 }}>
                                        {data.label}
                                      </p>
                                    ) : (
                                      <FormikTextInput
                                        name={data.name}
                                        key={index}
                                        placeholder="Enter your channel name here"
                                        variant="outlined"
                                        value={data.initialValue}
                                        error={
                                          !!(
                                            touched[data.name] &&
                                            errors[data.name]
                                          )
                                        }
                                        noErrorText={true}
                                        onBlur={(e) => {
                                          if (data.isNew && e.target.value) {
                                            addChannel(e.target.value, data.id);
                                          }

                                          if (!data.isNew && e.target.value) {
                                            updateChannel(
                                              e.target.value,
                                              data.id
                                            );
                                          }
                                        }}
                                      />
                                    )}
                                    {!!(
                                      touched[data.name] && errors[data.name]
                                    ) && (
                                      <p className="form-error">
                                        Field is required.
                                      </p>
                                    )}
                                  </div>

                                  {props.type === "DYNAMIC" ? (
                                    <React.Fragment>
                                      {addedChannels?.includes(data.label) ? (
                                        <button
                                          onClick={() => {
                                            updateLeadChannelLead(
                                              props.leadUserGuid ?? "",
                                              addedChannels,
                                              data.label,
                                              "REMOVE"
                                            );
                                          }}
                                        >
                                          <FiMinusCircle />
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            updateLeadChannelLead(
                                              props.leadUserGuid ?? "",
                                              addedChannels,
                                              data.label,
                                              "ADD"
                                            );
                                          }}
                                        >
                                          <FiPlusCircle
                                            style={{ color: "#1565d8" }}
                                          />
                                        </button>
                                      )}
                                    </React.Fragment>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        removeChannel(
                                          data.id,
                                          data.name,
                                          data.isNew ?? false
                                        );
                                      }}
                                    >
                                      <MdDeleteOutline />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </React.Fragment>
                        </NoInformationToDisplay>
                      </div>
                      {props.type === "ALL" && (
                        <div className="add-field-container">
                          <button
                            type="button"
                            onClick={() =>
                              addAnotherChannelHandler(generateRandomChars(5))
                            }
                          >
                            <span>Add another channel </span>
                            <FaPlus />
                          </button>
                        </div>
                      )}
                      <div className="drawer-action-buttons">
                        <button
                          type="button"
                          onClick={(reason) => props.onClose()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
      <DrawerLoading open={isLoading.drawerLoading} />
      <DrawerConfirmation
        title={`Are you sure you want to delete this ${activeChannel.title}?`}
        open={drawerConfirmationOpen}
        handlers={{
          no: () => {
            setActiveChannel({
              id: "",
              title: "",
            });
            setDrawerConfirmationOpen(false);
          },
          yes: () => {
            deleteChannel(activeChannel.id);
            if (!isLoading.drawerLoading) {
              setDrawerConfirmationOpen(false);
            }
          },
        }}
      />
    </Drawer>
  );
};

ChannelDrawer.defaultProps = {
  type: "ALL",
};

export default ChannelDrawer;
