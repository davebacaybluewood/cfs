import { SubscribersData } from "admin/models/subscriberModel";
import { createContext, useMemo, useState } from "react";

type LeadsType = {
  leads: SubscribersData[] | undefined;
  setLeads: React.Dispatch<React.SetStateAction<SubscribersData[] | undefined>>;
};
export const LeadsContext = createContext<LeadsType>({
  leads: undefined,
  setLeads: () => {},
});

export const LeadsProvider: React.FC<{
  children: JSX.Element | React.ReactNode;
}> = ({ children }) => {
  const [leads, setLeads] = useState<SubscribersData[] | undefined>();

  const memoized = useMemo(
    () => ({
      setLeads,
      leads,
    }),
    [setLeads, leads]
  );

  return (
    <LeadsContext.Provider value={memoized}>{children}</LeadsContext.Provider>
  );
};
