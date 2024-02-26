import agent from "admin/api/agent";
import { useEffect, useState } from "react";
import { Contacts } from "admin/models/contactsModel";

const useFetchContacts = (userGuid: string) => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contacts[]>([]);

  useEffect(() => {
    const fetchContacts = () => {
      if (!userGuid) return;

      setLoading(true);
      agent.Contacts.getMailingList(userGuid)
        .then((res) => {
          setContacts(res);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    };

    if (userGuid) fetchContacts();
  }, [userGuid]);

  return {
    loading: loading,
    contacts: contacts,
  };
};

export default useFetchContacts;
