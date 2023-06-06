import { FaCodiepie } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import { BiAnalyse, BiArch, BiArchiveIn } from "react-icons/bi";

const featureDataFamily = [
  {
    title: "Comprehensive Coverage",
    description:
      "We understand that your family's needs are unique. That's why our family life insurance policies offer comprehensive coverage for every member of your household.",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <RiShieldUserLine />,
  },
  {
    title: "Flexible Solutions",
    description:
      "Our life insurance plans offer the flexibility to adjust coverage as your circumstances change. ",
    button: {
      text: "2 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <FaCodiepie />,
  },
  {
    title: "Unparalleled Support",
    description:
      "We don't just sell policies—we build relationships. Our dedicated team of experts is committed to providing you with personalized guidance and support.",
    button: {
      text: "3 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <BiArchiveIn />,
  },
  {
    title: "Feature 4",
    description:
      "We offer robust liability insurance options, including general liability, professional liability, and product liability coverage.",
    button: {
      text: "6 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <BiArch />,
  },
  {
    title: "Feature 5",
    description:
      "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    button: {
      text: "9 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <BiAnalyse />,
  },
  {
    title: "Feature 6",
    description:
      "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <BiAnalyse />,
  },
  {
    title: "Feature 7",
    description:
      "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <FaCodiepie />,
  },
  {
    title: "Feature 8",
    description:
      "veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <RiShieldUserLine />,
  },
];

export default featureDataFamily;
