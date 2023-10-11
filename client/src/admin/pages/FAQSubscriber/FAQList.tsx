import { List, ListItem, ListItemText } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "points", headerName: "Points", flex: 1 },
  { field: "dateEarned", headerName: "Date Earned", flex: 1 },
  { field: "dateExpired", headerName: "Date of Expiry", flex: 1 },
];

const POINTS_EXPIRY = [
  {
    id: 1,
    points: 100,
    dateEarned: "February 14, 2023",
    dateExpired: "February 14, 2024",
  },
  {
    id: 2,
    points: 100,
    dateEarned: "July 25, 2023",
    dateExpired: "July 25, 2024",
  },
  {
    id: 3,
    points: 100,
    dateEarned: "December 30, 2023",
    dateExpired: "December 30, 2024",
  },
];

const WAYS_TO_EARN = [
  {
    id: 1,
    desc: "Earn 100 points when you initially subscribe to the My CFS Rewards program.",
  },
  {
    id: 2,
    desc: "Earn 100 points when someone becomes a subscriber to the My CFS Rewards program via the link you shared.",
  },
  {
    id: 3,
    desc: "Earn 100 points when you register for a CFS event.",
  },
  {
    id: 4,
    desc: "Earn 100 points when someone from your network registers for a CFS event via the link you shared.",
  },
  {
    id: 5,
    desc: "Earn 100 points when you are the first person who submits a valid bug report through the Support page.",
  },
];

const SUBSCRIBER_FAQ = [
  {
    id: "faq1",
    title: "What is the CFS My Rewards Program?",
    description:
      "The CFS My Rewards program is one of CFS's initiatives designed to incentivize individuals aiming to earn rewards by sharing CFS content within their network.",
  },

  {
    id: "faq2",
    title: "How do I participate in the rewards program?",
    description:
      "To participate in the rewards program, you need to register as a subscriber in the CFS My Rewards program.",
  },

  {
    id: "faq3",
    title: "How do I earn points in the rewards program?",
    description: (
      <>
        <p>You can earn points in five different ways:</p>
        <List sx={{ listStyle: "decimal", pl: 4 }}>
          {WAYS_TO_EARN.map((w) => {
            return (
              <>
                <ListItem key={w.id} sx={{ display: "list-item" }}>
                  <ListItemText disableTypography primary={w.desc} />
                </ListItem>
              </>
            );
          })}
        </List>
      </>
    ),
  },
  {
    id: "faq4",
    title: "How do I earn points when I share content?",
    description:
      "You can earn points from the content you share when the recipient registers as a subscriber or participates in the event.",
  },

  {
    id: "faq5",
    title:
      "Are there specific content or events eligible for points, or can I earn points for any event?",
    description:
      "You can earn points for all content and events found in the CFS My Rewards dashboard.",
  },

  {
    id: "faq6",
    title: "Is there a limit to the number of points I can earn?",
    description: "No, there is no limit to the number of points you can earn.",
  },

  {
    id: "faq7",
    title: "What can I redeem my points for?",
    description:
      "You can redeem rewards available in the rewards catalog. located within the CFS My Rewards.",
  },
  {
    id: "faq8",
    title: "How can I check my points balance?",
    description:
      "You can check your points and points transactions on the CFS My Rewards dashboard.",
  },

  {
    id: "faq9",
    title: "Do my points expire?",
    description: (
      <>
        <p>Points earned will expire one year after they are earned</p>
        <DataGrid
          rows={POINTS_EXPIRY || []}
          columns={columns}
          hideFooter
          autoHeight
          disableRowSelectionOnClick
          className="reward-history-table"
        />
      </>
    ),
  },
  {
    id: "faq10",
    title: "Can I transfer my points to someone else?",
    description:
      "No, points cannot be transferred to others. However, you may claim a reward and ship it to a different address.",
  },
  {
    id: "faq11",
    title:
      "What happens if I cancel my event registration? Do I lose my points?",
    description:
      "Yes, points will be deducted if you cancel your event registration or do not attend the event.",
  },
  {
    id: "faq12",
    title:
      "How long does it take for points to appear in my account after I register for an event or share content?",
    description:
      "The points will automatically be added in the dashboard once the method of earning has been validated by the system.",
  },
  {
    id: "faq13",
    title: "Can I participate in the rewards program if I'm not a subscriber?",
    description:
      "No, only registered subscribers can participate in earning rewards, raffles, and other members-only campaigns.",
  },

  {
    id: "faq14",
    title:
      "How can I contact customer support if I have questions about the rewards program?",
    description: (
      <p>
        You may raise your concern via the support page or email.
        <Link to="/portal/raise-support">Support Page</Link>,
      </p>
    ),
  },

  {
    id: "faq15",
    title: "Are there any terms and conditions I should be aware of?",
    description: (
      <p>
        Yes, you may read the Terms and Conditions <Link to="#">here</Link>
      </p>
    ),
  },
  {
    id: "faq16",
    title:
      "What happens if there are changes or updates to the rewards program?",
    description:
      "CFS will keep all subscribers informed about any changes or updates to the program's mechanics, including modifications to the terms and conditions.",
  },

  {
    id: "faq17",
    title: "Can I provide feedback or suggestions for the rewards program?",
    description: (
      <p>
        "Yes, the CFS My Rewards program is open for recommendations and
        suggestions. You can submit your ideas on the{" "}
        <Link to="/portal/raise-support">Support Page</Link>,
      </p>
    ),
  },
  {
    id: "faq18",
    title:
      "How can I unsubscribe from the rewards program if I no longer wish to participate?",
    description: (
      <p>
        You may follow these steps to <Link to="#">unsubscribe</Link>.
      </p>
    ),
  },
];

export { SUBSCRIBER_FAQ };
