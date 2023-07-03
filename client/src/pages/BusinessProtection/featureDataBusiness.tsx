import { FaCodiepie } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import { BiAnalyse, BiArch, BiArchiveIn } from "react-icons/bi";

const fetureDataBusiness = [
  {
    title: "Business Asset Coverage",
    description:
      "With CFS, you can confidently focus on growing your business, knowing that your investments are safeguarded.",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <RiShieldUserLine />,
  },
  {
    title: "Business Continuity",
    description:
      "Get protected from lost income and essential expenses during unforeseen events like natural disasters, equipment breakdowns, or supply chain disruptions.",
    button: {
      text: "2 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <FaCodiepie />,
  },
  {
    title: "Liability Protection",
    description:
      "We offer robust liability insurance options, including general liability, professional liability, and product liability coverage.",
    button: {
      text: "3 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <BiArchiveIn />,
  },
  // {
  //   title: "Feature 4",
  //   description:
  //     "We offer robust liability insurance options, including general liability, professional liability, and product liability coverage.",
  //   button: {
  //     text: "6 categories",
  //     onClick: () => console.log("triggered"),
  //   },
  //   icon: <BiArch />,
  // },
  // {
  //   title: "Feature 5",
  //   description:
  //     "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  //   button: {
  //     text: "9 categories",
  //     onClick: () => console.log("triggered"),
  //   },
  //   icon: <BiAnalyse />,
  // },
  // {
  //   title: "Feature 6",
  //   description:
  //     "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  //   button: {
  //     text: "4 categories",
  //     onClick: () => console.log("triggered"),
  //   },
  //   icon: <BiAnalyse />,
  // },
  // {
  //   title: "Feature 7",
  //   description:
  //     "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  //   button: {
  //     text: "4 categories",
  //     onClick: () => console.log("triggered"),
  //   },
  //   icon: <FaCodiepie />,
  // },
  // {
  //   title: "Feature 8",
  //   description:
  //     "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  //   button: {
  //     text: "4 categories",
  //     onClick: () => console.log("triggered"),
  //   },
  //   icon: <RiShieldUserLine />,
  // for future dev use},
];

export default fetureDataBusiness;
