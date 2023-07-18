import { FaCodiepie } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import { BiAnalyse, BiArch, BiArchiveIn } from "react-icons/bi";

const fetureDataBusiness = [
  {
    title: "Comprehensive Coverage",
    description:
      "Our life insurance policies for individuals offer extensive coverage, ensuring financial protection for your loved ones. We understand the importance of safeguarding their future and providing peace of mind policies.",
    button: {
      text: "4 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <RiShieldUserLine />,
  },
  {
    title: "Customized Solutions",
    description:
      "We believe in tailoring life insurance to fit your specific needs and circumstances. Our agents work closely with you to understand your financial goals and design a policy aligning with your requirements.",
    button: {
      text: "2 categories",
      onClick: () => console.log("triggered"),
    },
    icon: <FaCodiepie />,
  },
  {
    title: "Flexible Premiums and Benefits",
    description:
      "We offer flexible premium options that fit within your budget while providing the desired level of coverage. Additionally, our policies come with a range of benefits such as cash value accumulation, the ability to access funds when needed, and the option to customize beneficiaries. ",
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
