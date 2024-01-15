import { LeadChannelData } from "admin/api/channelServices/channelModels";
import { createContext, useMemo, useState } from "react";

type ChannelsType = {
  channels: LeadChannelData[] | undefined;
  setChannels: React.Dispatch<
    React.SetStateAction<LeadChannelData[] | undefined>
  >;
};
export const ChannelContext = createContext<ChannelsType>({
  channels: undefined,
  setChannels: () => {},
});

export const ChannelProvider: React.FC<{
  children: JSX.Element | React.ReactNode;
}> = ({ children }) => {
  const [channels, setChannels] = useState<LeadChannelData[] | undefined>();

  const memoized = useMemo(
    () => ({
      channels,
      setChannels,
    }),
    [channels, setChannels]
  );

  return (
    <ChannelContext.Provider value={memoized}>
      {children}
    </ChannelContext.Provider>
  );
};
