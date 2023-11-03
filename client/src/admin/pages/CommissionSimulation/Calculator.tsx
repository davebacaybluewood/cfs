import React, { useEffect, useState } from "react"
import { Box, Grid, Modal } from "@mui/material"
import FormikTextInput from "library/Formik/FormikInput"
import { Formik } from "formik"
import Select from "react-select"
import ErrorText from "pages/PortalRegistration/components/ErrorText"
import { PROFILE_ROLES } from "pages/PortalRegistration/constants"
import formatter from "helpers/currencyFormatter"
import { AiOutlineWarning } from "react-icons/ai"
import { RiErrorWarningLine } from "react-icons/ri"
import AlertMessage from "library/AlertMessage/Alert"
import Button from "library/Button/Button"
import useAccountValidation from "admin/hooks/useAccountValidation"
import nameFallback from "helpers/nameFallback"
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip"
import "./Calculator.scss"
import Badge from "library/Badge/Badge"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"

const AGENT_ROLES = [
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
    numberValue: 0.86,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
    numberValue: 0.85,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
    numberValue: 0.83,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
    numberValue: 0.81,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
    label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
    numberValue: 0.65,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
    numberValue: 0.5,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
    numberValue: 0.35,
  },
  {
    value: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
    label: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.label,
    numberValue: 0,
  },
]
const standardInputStyles = {
  fontSize: "16px",
}

const formInitialValues = {
  personal: {
    position: [
      {
        label: "",
        value: "",
        numberValue: 0,
      },
    ],
    monthlyTargetPremium: "",
  },

  spread: {
    position1: {
      label: AGENT_ROLES[0].label,
      value: AGENT_ROLES[0].value,
      numberValue: AGENT_ROLES[0].numberValue,
    },
    monthlyTargetPremium1: 0,
    numberOfPremiumMembers1: 0,
    numberOfMembers1: 0,
    numberOfDirectMembers1: 0,
    numberOfPromotedMembers1: 0,

    position2: {
      label: AGENT_ROLES[1].label,
      value: AGENT_ROLES[1].value,
      numberValue: AGENT_ROLES[1].numberValue,
    },
    monthlyTargetPremium2: 0,
    numberOfPremiumMembers2: 0,
    numberOfMembers2: 0,
    numberOfDirectMembers2: 0,
    numberOfPromotedMembers2: 0,

    position3: {
      label: AGENT_ROLES[2].label,
      value: AGENT_ROLES[2].value,
      numberValue: AGENT_ROLES[2].numberValue,
    },
    monthlyTargetPremium3: 0,
    numberOfPremiumMembers3: 0,
    numberOfMembers3: 0,
    numberOfDirectMembers3: 0,
    numberOfPromotedMembers3: 0,

    position4: {
      label: AGENT_ROLES[3].label,
      value: AGENT_ROLES[3].value,
      numberValue: AGENT_ROLES[3].numberValue,
    },
    monthlyTargetPremium4: 0,
    numberOfPremiumMembers4: 0,
    numberOfMembers4: 0,
    numberOfDirectMembers4: 0,
    numberOfPromotedMembers4: 0,

    position5: {
      label: AGENT_ROLES[4].label,
      value: AGENT_ROLES[4].value,
      numberValue: AGENT_ROLES[4].numberValue,
    },
    monthlyTargetPremium5: 0,
    numberOfPremiumMembers5: 0,
    numberOfMembers5: 0,
    numberOfDirectMembers5: 0,
    numberOfPromotedMembers5: 0,

    position6: {
      label: AGENT_ROLES[5].label,
      value: AGENT_ROLES[5].value,
      numberValue: AGENT_ROLES[5].numberValue,
    },
    monthlyTargetPremium6: 0,
    numberOfPremiumMembers6: 0,
    numberOfMembers6: 0,
    numberOfDirectMembers6: 0,
    numberOfPromotedMembers6: 0,

    position7: {
      label: AGENT_ROLES[6].label,
      value: AGENT_ROLES[6].value,
      numberValue: AGENT_ROLES[6].numberValue,
    },
    monthlyTargetPremium7: 0,
    numberOfPremiumMembers7: 0,
    numberOfMembers7: 0,
    numberOfDirectMembers7: 0,
    numberOfPromotedMembers7: 0,

    position8: {
      label: AGENT_ROLES[7].label,
      value: AGENT_ROLES[7].value,
      numberValue: AGENT_ROLES[7].numberValue,
    },
    monthlyTargetPremium8: 0,
    numberOfPremiumMembers8: 0,
    numberOfMembers8: 0,
    numberOfDirectMembers8: 0,
    numberOfPromotedMembers8: 0,
  },
  generation: {
    gen1: 0,
    numberValue1: 0.1,
    gen2: 0,
    numberValue2: 0.05,
    gen3: 0,
    numberValue3: 0.04,
    gen4: 0,
    numberValue4: 0.03,
  },
}

const Calculator: React.FC = () => {
  /* Modal styles */
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const account: any = useAccountValidation()
  // Mock Date
  const current = new Date()
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`

  const [errorMessage, setErrorMessage] = useState("")
  const [initialValues, setInitialValues] = useState(formInitialValues)

  const onChangePositionHandler = (value: any, setFieldValue: any) => {
    setFieldValue("personal.position", [value])
  }
  const [isPositionValid, setIsPositionValid] = useState(false)

  const genNum = ["1st", "2nd", "3rd", "4th"]

  const generationInitialValue = [
    {
      gen1: 0,
      gen2: 0,
      gen3: 0,
      gen4: 0,
    },
  ]

  const [generationTotal, setGenerationTotal] = useState(generationInitialValue)

  const earningsInitialValue = [
    {
      personal: 0,
      spread: 0,
      generationOverride: 0,
    },
  ]
  const [totalEarnings, setTotalEarnings] = useState(earningsInitialValue)

  useEffect(() => {
    const onCalculate = (data = initialValues) => {
      /** Personal */
      const personalNumberValue = data.personal.position[0]?.numberValue
      const personalMonthlyTargetPremium = Number(
        data.personal.monthlyTargetPremium
      )
      const personalTotal = personalMonthlyTargetPremium * personalNumberValue

      /* Spread */

      /* Position 8 */
      /*Traning Associate */
      const spreadNumberValue8 = Number(data.spread.position8.numberValue)
      const spreadMonthlyTargetPremium8 = Number(
        data.spread.monthlyTargetPremium8
      )
      const spreadNumberOfMembers8 = Number(data.spread.numberOfMembers8)
      const spreadPremiumMember8 = Number(data.spread.numberOfPremiumMembers8)
      const numberOfDirectMembers8 = Number(data.spread.numberOfDirectMembers8)
      const numberOfPromotedMembers8 = Number(
        data.spread.numberOfPromotedMembers8
      )

      /* Formula 7 */
      /* Traning Associate */

      const spread8Calculation =
        (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
        spreadPremiumMember8 *
        spreadMonthlyTargetPremium8

      const spread8Total = spread8Calculation
      console.log("spread8Total", spread8Total)

      /* Position 7 */
      /* Associate */
      const spreadNumberValue7 = Number(data.spread.position7.numberValue)
      const spreadMonthlyTargetPremium7 = Number(
        data.spread.monthlyTargetPremium7
      )
      const spreadNumberOfMembers7 = Number(data.spread.numberOfMembers7)
      const spreadPremiumMember7 = Number(data.spread.numberOfPremiumMembers7)
      const numberOfDirectMembers7 = Number(data.spread.numberOfDirectMembers7)
      const numberOfPromotedMembers7 = Number(
        data.spread.numberOfPromotedMembers7
      )

      /* Formula 7 */
      /* Associate */

      const spread7Calculation =
        (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
        spreadPremiumMember7 *
        spreadMonthlyTargetPremium7

      const spread7Total = spread7Calculation
      console.log("spread7Total", spread7Total)

      /* Position 6 */
      /* Senior Associate */
      const spreadNumberValue6 = Number(data.spread.position6.numberValue)
      const spreadMonthlyTargetPremium6 = Number(
        data.spread.monthlyTargetPremium6
      )
      const spreadNumberOfMembers6 = Number(data.spread.numberOfMembers6)
      const spreadPremiumMember6 = Number(data.spread.numberOfPremiumMembers6)
      const numberOfDirectMembers6 = Number(data.spread.numberOfDirectMembers6)
      const numberOfPromotedMembers6 = Number(
        data.spread.numberOfPromotedMembers6
      )

      /* Formula 6 */

      const spread6Calculation =
        (spreadNumberOfMembers6 + numberOfPromotedMembers6) *
        spreadPremiumMember6 *
        spreadMonthlyTargetPremium6

      const spread6Total = spread6Calculation
      console.log("spread6Total", spread6Total)

      /* Position 5 */
      /* Marketing Director */
      const spreadNumberValue5 = Number(data.spread.position5.numberValue)
      const spreadMonthlyTargetPremium5 = Number(
        data.spread.monthlyTargetPremium5
      )
      const spreadNumberOfMembers5 = Number(data.spread.numberOfMembers5)
      const spreadPremiumMember5 = Number(data.spread.numberOfPremiumMembers5)
      const numberOfDirectMembers5 = Number(data.spread.numberOfDirectMembers5)
      const numberOfPromotedMembers5 = Number(
        data.spread.numberOfPromotedMembers5
      )

      /* Position 4 */
      /*Senior Marketing Director */
      const spreadNumberValue4 = Number(data.spread.position4.numberValue)
      const spreadMonthlyTargetPremium4 = Number(
        data.spread.monthlyTargetPremium4
      )
      const spreadNumberOfMembers4 = Number(data.spread.numberOfMembers4)
      const spreadPremiumMember4 = Number(data.spread.numberOfPremiumMembers4)
      const numberOfDirectMembers4 = Number(data.spread.numberOfDirectMembers4)
      const numberOfPromotedMembers4 = Number(
        data.spread.numberOfPromotedMembers4
      )

      /* Formula 4 */
      const spread4Calculation =
        numberOfPromotedMembers4 *
        spreadPremiumMember4 *
        spreadMonthlyTargetPremium4

      const spread4Total = spread4Calculation

      console.log("spread4Total", spread4Total)

      /* Position 3 */
      /* Executive Marketing Director */
      const spreadNumberValue3 = Number(data.spread.position3.numberValue)
      const spreadMonthlyTargetPremium3 = Number(
        data.spread.monthlyTargetPremium3
      )
      const spreadNumberOfMembers3 = Number(data.spread.numberOfMembers3)
      const spreadPremiumMember3 = Number(data.spread.numberOfPremiumMembers3)
      const numberOfDirectMembers3 = Number(data.spread.numberOfDirectMembers3)
      const numberOfPromotedMembers3 = Number(
        data.spread.numberOfPromotedMembers3
      )

      /* Formula 3 */

      const spread3LessDirectMem3 =
        spreadNumberOfMembers3 - numberOfDirectMembers3

      const spread3Indirect =
        spreadMonthlyTargetPremium3 *
        spreadNumberOfMembers3 *
        spreadPremiumMember3 *
        (data.spread.position2.numberValue - spreadNumberValue3)

      const spread3Direct =
        spreadMonthlyTargetPremium3 *
        numberOfDirectMembers3 *
        spreadPremiumMember3 *
        (personalNumberValue - spreadNumberValue3)

      const spread3Total = spread3Direct + spread3Indirect

      /* Position 2 */
      /*Senior Executive Marketing Director */
      const spreadNumberValue2 = Number(data.spread.position2.numberValue)
      const spreadMonthlyTargetPremium2 = Number(
        data.spread.monthlyTargetPremium2
      )
      const spreadNumberOfMembers2 = Number(data.spread.numberOfMembers2)
      const spreadPremiumMember2 = Number(data.spread.numberOfPremiumMembers2)
      const numberOfDirectMembers2 = Number(data.spread.numberOfDirectMembers2)
      const numberOfPromotedMembers2 = Number(
        data.spread.numberOfPromotedMembers2
      )
      /* Formula 2 */

      const spread2LessDirectMem2 =
        spreadNumberOfMembers2 - numberOfDirectMembers2

      const spread2Indirect =
        spreadMonthlyTargetPremium2 *
        spreadNumberOfMembers2 *
        spreadPremiumMember2 *
        (data.spread.position1.numberValue - spreadNumberValue2)

      const spread2Direct =
        spreadMonthlyTargetPremium2 *
        numberOfDirectMembers2 *
        spreadPremiumMember2 *
        (personalNumberValue - spreadNumberValue2)

      const spread2Total = spread2Direct + spread2Indirect

      /* Position 1 */
      /* Executive Vice President */
      const spreadNumberValue1 = Number(data.spread.position1.numberValue)
      const spreadMonthlyTargetPremium1 = Number(
        data.spread.monthlyTargetPremium1
      )
      const spreadNumberOfMembers1 = Number(data.spread.numberOfMembers1)
      const spreadPremiumMember1 = Number(data.spread.numberOfPremiumMembers1)
      const numberOfDirectMembers1 = Number(data.spread.numberOfDirectMembers1)
      const numberOfPromotedMembers1 = Number(
        data.spread.numberOfPromotedMembers1
      )

      /* Formula 1 */
      const spread1LessDirectMem1 =
        spreadNumberOfMembers1 - numberOfDirectMembers1

      /** Validation */
      const isAssociate =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value

      const isSeniorAssociate =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value

      const isMarketingDirector =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value

      const isSeniorMarketingDirector =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value

      const isExecutiveMarketingDirector =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value

      const isSeniorExecutiveMarketingDirector =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value

      const isVicePresident =
        data.personal.position[0].value ===
        PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value

      let SPREAD_TOTAL: number = 0

      const EVP_AND_SEMD_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position2.numberValue
      ).toFixed(2) //1%
      const EVP_AND_EMD_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position3.numberValue
      ).toFixed(2) //3%
      const EVP_AND_SMD_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position4.numberValue
      ).toFixed(2) //5%
      const EVP_AND_MD_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position5.numberValue
      ).toFixed(2) //21%
      const EVP_AND_SA_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position6.numberValue
      ).toFixed(2) //36%
      const EVP_AND_A_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //51%
      const EVP_AND_TA_PERCENTAGE = Number(
        data.spread.position1.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //86%

      const SEMD_AND_EMD_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position3.numberValue
      ).toFixed(2) //2%
      const SEMD_AND_SMD_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position4.numberValue
      ).toFixed(2) //4%
      const SEMD_AND_MD_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position5.numberValue
      ).toFixed(2) //20%
      const SEMD_AND_SA_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position6.numberValue
      ).toFixed(2) //35%
      const SEMD_AND_A_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //50%
      const SEMD_AND_TA_PERCENTAGE = Number(
        data.spread.position2.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //85%

      const EMD_AND_SMD_PERCENTAGE = Number(
        data.spread.position3.numberValue - data.spread.position4.numberValue
      ).toFixed(2) //2%
      const EMD_AND_MD_PERCENTAGE = Number(
        data.spread.position3.numberValue - data.spread.position5.numberValue
      ).toFixed(2) //18%
      const EMD_AND_SA_PERCENTAGE = Number(
        data.spread.position3.numberValue - data.spread.position6.numberValue
      ).toFixed(2) //33%
      const EMD_AND_A_PERCENTAGE = Number(
        data.spread.position3.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //48%
      const EMD_AND_TA_PERCENTAGE = Number(
        data.spread.position3.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //83%

      const SMD_AND_MD_PERCENTAGE = Number(
        data.spread.position4.numberValue - data.spread.position5.numberValue
      ).toFixed(2) //16%
      const SMD_AND_SA_PERCENTAGE = Number(
        data.spread.position4.numberValue - data.spread.position6.numberValue
      ).toFixed(2) //31%
      const SMD_AND_A_PERCENTAGE = Number(
        data.spread.position4.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //46%
      const SMD_AND_TA_PERCENTAGE = Number(
        data.spread.position4.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //81%

      const MD_AND_SA_PERCENTAGE = Number(
        data.spread.position5.numberValue - data.spread.position6.numberValue
      ).toFixed(2) //15%
      const MD_AND_A_PERCENTAGE = Number(
        data.spread.position5.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //30%
      const MD_AND_TA_PERCENTAGE = Number(
        data.spread.position5.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //65%

      const SA_AND_A_PERCENTAGE = Number(
        data.spread.position6.numberValue - data.spread.position7.numberValue
      ).toFixed(2) //15%
      const SA_AND_TA_PERCENTAGE = Number(
        data.spread.position6.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //50%

      const A_AND_TA_PERCENTAGE = Number(
        data.spread.position7.numberValue - data.spread.position8.numberValue
      ).toFixed(2) //50%

      if (isVicePresident) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ EVP AND EMD */
        // Formula EVP AND EMD
        const spreadEVPandEMDCalculation =
          (spreadNumberOfMembers2 +
            numberOfDirectMembers2 +
            numberOfPromotedMembers2) *
          spreadPremiumMember2 *
          spreadMonthlyTargetPremium2

        const spreadEVPandEMDTotal = spreadEVPandEMDCalculation
        /* ------- END Formula EVP AND EMD */

        /** ------ EVP AND SEMD */
        // Formula EVP AND SEMD
        const spreadEVPandSEMDCalculation =
          (spreadNumberOfMembers3 + numberOfPromotedMembers3) *
          spreadPremiumMember3 *
          spreadMonthlyTargetPremium3

        const spreadEVPandSEMDTotal = spreadEVPandSEMDCalculation
        /* ------- END Formula EVP AND SEMD */

        /** ------ EVP AND SMD */
        // Formula EVP AND SMD
        const spreadEVPandSMDCalculation =
          (spreadNumberOfMembers4 + numberOfPromotedMembers4) *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4

        const spreadEVPandSMDTotal = spreadEVPandSMDCalculation
        /* ------- END Formula EVP AND SMD */

        /** ------ EVP AND MD */
        // Formula EVP AND MD
        const spreadEVPandMDCalculation =
          (spreadNumberOfMembers5 + numberOfPromotedMembers5) *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5

        const spreadEVPandMDTotal = spreadEVPandMDCalculation
        /* ------- END Formula EVP AND MD */

        /** ------ EVP AND SA */
        // Formula EVP AND SA
        const spreadEVPandSACalculation =
          (spreadNumberOfMembers6 + numberOfPromotedMembers6) *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6

        const spreadEVPandSATotal = spreadEVPandSACalculation
        /* ------- END Formula EVP AND SA */

        /** ------ EVP AND Associate */
        // Formula EVP AND Associate
        const spreadEVPandACalculation =
          (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadEVPandATotal = spreadEVPandACalculation
        /* ------- END Formula EVP AND Associate */

        /** ------ EVP AND Training Associate */
        // Formula EVP AND Training Associate
        const spreadEVPandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadEVPandTATotal = spreadEVPandTACalculation
        /* ------- END Formula EVP AND Training Associate */

        const spread1 =
          (spreadEVPandEMDTotal +
            spreadEVPandSEMDTotal +
            spreadEVPandSMDTotal +
            spreadEVPandTATotal +
            spreadEVPandATotal +
            spreadEVPandMDTotal +
            spreadEVPandSATotal) *
          Number(EVP_AND_SEMD_PERCENTAGE)

        console.log(spread1)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */

        /** ------ EMD */
        // Formula EMD
        const directEVPExecutiveMarketingDirector =
          numberOfDirectMembers4 *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4
        const directEVPExecutiveMarketingDirectorTotal =
          directEVPExecutiveMarketingDirector
        const spread2 =
          directEVPExecutiveMarketingDirectorTotal *
          Number(EVP_AND_EMD_PERCENTAGE)
        /* ------- END Formula EMD */

        /** ------ SMD */
        // Formula SMD
        const directEVPSeniorMarketingDirector =
          numberOfDirectMembers4 *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4
        const directEVPSeniorMarketingDirectorTotal =
          directEVPSeniorMarketingDirector
        const spread3 =
          directEVPSeniorMarketingDirectorTotal * Number(EVP_AND_SMD_PERCENTAGE)
        /* ------- END Formula SMD */

        /** ------ MD */
        // Formula MD
        const directEVPMarketingDirector =
          numberOfDirectMembers5 *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5
        const directEVPMarketingDirectorTotal = directEVPMarketingDirector
        const spread4 =
          directEVPMarketingDirectorTotal * Number(EVP_AND_MD_PERCENTAGE)
        /* ------- END Formula MD */

        /** ------ Senior Associate */
        // Formula Senior Associate
        const directEVPSeniorAssociate =
          numberOfDirectMembers6 *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6
        const directEVPSeniorAssociateTotal = directEVPSeniorAssociate
        const spread5 =
          directEVPSeniorAssociateTotal * Number(EVP_AND_SA_PERCENTAGE)
        /* ------- END Formula Senior Associate */

        /** ------ Associate */
        // Formula Associate
        const directEVPAssociate =
          numberOfDirectMembers7 *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7
        const directEVPAssociateTotal = directEVPAssociate
        const spread6 = directEVPAssociateTotal * Number(EVP_AND_A_PERCENTAGE)
        /* ------- END Formula Associate */

        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directEVPTrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directEVPTrainingAssociateTotal = directEVPTrainingAssociate
        const spread7 =
          directEVPTrainingAssociateTotal * Number(EVP_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        SPREAD_TOTAL =
          spread1 + spread2 + spread3 + spread4 + spread5 + spread6 + spread7

        console.log({
          spread1,
          spread2,
          spread3,
          spread4,
          spread5,
          spread6,
          spread7,
          EVP_AND_TA_PERCENTAGE,
          directEVPTrainingAssociateTotal,
          numberOfDirectMembers8,
          spreadPremiumMember8,
          spreadMonthlyTargetPremium8,
        })
      } else if (isSeniorExecutiveMarketingDirector) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ SEMD AND EMD */
        // Formula SEMD AND EMD
        const spreadSEMDandEMDCalculation =
          (spreadNumberOfMembers3 +
            numberOfDirectMembers3 +
            numberOfPromotedMembers3) *
          spreadPremiumMember3 *
          spreadMonthlyTargetPremium3

        const spreadSEMDandEMDTotal = spreadSEMDandEMDCalculation
        /* ------- END Formula SEMD AND EMD */

        /** ------ SEMD AND SMD */
        // Formula SEMD AND SMD
        const spreadSEMDandSMDCalculation =
          (spreadNumberOfMembers4 + numberOfPromotedMembers4) *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4

        const spreadSEMDandSMDTotal = spreadSEMDandSMDCalculation
        /* ------- END Formula SEMD AND SMD */

        /** ------ SEMD AND MD */
        // Formula SEMD AND MD
        const spreadSEMDandMDCalculation =
          (spreadNumberOfMembers5 + numberOfPromotedMembers5) *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5

        const spreadSEMDandMDTotal = spreadSEMDandMDCalculation
        /* ------- END Formula SEMD AND MD */

        /** ------ SEMD AND SA */
        // Formula SEMD AND SA
        const spreadSEMDandSACalculation =
          (spreadNumberOfMembers6 + numberOfPromotedMembers6) *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6

        const spreadSEMDandSATotal = spreadSEMDandSACalculation
        /* ------- END Formula SEMD AND SA */

        /** ------ SEMD AND Associate */
        // Formula SEMD AND Associate
        const spreadSEMDandACalculation =
          (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadSEMDandATotal = spreadSEMDandACalculation
        /* ------- END Formula SEMD AND Associate */

        /** ------ SEMD AND Training Associate */
        // Formula SEMD AND Training Associate
        const spreadSEMDandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadSEMDandTATotal = spreadSEMDandTACalculation
        /* ------- END Formula SEMD AND Training Associate */

        const spread1 =
          (spreadSEMDandEMDTotal +
            spreadSEMDandSMDTotal +
            spreadSEMDandTATotal +
            spreadSEMDandATotal +
            spreadSEMDandMDTotal +
            spreadSEMDandSATotal) *
          Number(SEMD_AND_EMD_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */

        /** ------ SMD */
        // Formula SMD
        const directSEMDSeniorMarketingDirector =
          numberOfDirectMembers4 *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4
        const directSEMDSeniorMarketingDirectorTotal =
          directSEMDSeniorMarketingDirector
        const spread2 =
          directSEMDSeniorMarketingDirectorTotal *
          Number(SEMD_AND_SMD_PERCENTAGE)
        /* ------- END Formula SMD */

        /** ------ MD */
        // Formula MD
        const directSEMDMarketingDirector =
          numberOfDirectMembers5 *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5
        const directSEMDMarketingDirectorTotal = directSEMDMarketingDirector
        const spread3 =
          directSEMDMarketingDirectorTotal * Number(SEMD_AND_MD_PERCENTAGE)
        /* ------- END Formula MD */

        /** ------ Senior Associate */
        // Formula Senior Associate
        const directSEMDSeniorAssociate =
          numberOfDirectMembers6 *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6
        const directSEMDSeniorAssociateTotal = directSEMDSeniorAssociate
        const spread4 =
          directSEMDSeniorAssociateTotal * Number(SEMD_AND_SA_PERCENTAGE)
        /* ------- END Formula Senior Associate */

        /** ------ Associate */
        // Formula Associate
        const directSEMDAssociate =
          numberOfDirectMembers7 *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7
        const directSEMDAssociateTotal = directSEMDAssociate
        const spread5 = directSEMDAssociateTotal * Number(SEMD_AND_A_PERCENTAGE)
        /* ------- END Formula Associate */

        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directSEMDTrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directSEMDTrainingAssociateTotal = directSEMDTrainingAssociate
        const spread6 =
          directSEMDTrainingAssociateTotal * Number(SEMD_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        SPREAD_TOTAL = spread1 + spread2 + spread3 + spread4 + spread5 + spread6
      } else if (isExecutiveMarketingDirector) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ EMD AND SMD */
        // Formula EMD AND SMD
        const spreadEMDandSMDCalculation =
          (spreadNumberOfMembers4 +
            numberOfDirectMembers4 +
            numberOfPromotedMembers4) *
          spreadPremiumMember4 *
          spreadMonthlyTargetPremium4

        const spreadEMDandSMDTotal = spreadEMDandSMDCalculation
        /* ------- END Formula EMD AND SMD */

        /** ------ EMD AND MD */
        // Formula EMD AND MD
        const spreadEMDandMDCalculation =
          (spreadNumberOfMembers5 + numberOfPromotedMembers5) *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5

        const spreadEMDandMDTotal = spreadEMDandMDCalculation
        /* ------- END Formula EMD AND MD */

        /** ------ EMD AND SA */
        // Formula EMD AND SA
        const spreadEMDandSACalculation =
          (spreadNumberOfMembers6 + numberOfPromotedMembers6) *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6

        const spreadEMDandSATotal = spreadEMDandSACalculation
        /* ------- END Formula EMD AND SA */

        /** ------ EMD AND Associate */
        // Formula EMD AND Associate
        const spreadEMDandACalculation =
          (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadEMDandATotal = spreadEMDandACalculation
        /* ------- END Formula EMD AND Associate */

        /** ------ EMD AND Training Associate */
        // Formula EMD AND Training Associate
        const spreadEMDandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadEMDandTATotal = spreadEMDandTACalculation
        /* ------- END Formula EMD AND Training Associate */

        const spread1 =
          (spreadEMDandSMDTotal +
            spreadEMDandTATotal +
            spreadEMDandATotal +
            spreadEMDandMDTotal +
            spreadEMDandSATotal) *
          Number(EMD_AND_SMD_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */

        /** ------ MD */
        // Formula MD
        const directEMDMarketingDirector =
          numberOfDirectMembers5 *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5
        const directEMDMarketingDirectorTotal = directEMDMarketingDirector
        const spread2 =
          directEMDMarketingDirectorTotal * Number(EMD_AND_MD_PERCENTAGE)
        /* ------- END Formula MD */

        /** ------ Senior Associate */
        // Formula Senior Associate
        const directEMDSeniorAssociate =
          numberOfDirectMembers6 *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6
        const directEMDSeniorAssociateTotal = directEMDSeniorAssociate
        const spread3 =
          directEMDSeniorAssociateTotal * Number(EMD_AND_SA_PERCENTAGE)
        /* ------- END Formula Senior Associate */

        /** ------ Associate */
        // Formula Associate
        const directEMDAssociate =
          numberOfDirectMembers7 *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7
        const directEMDAssociateTotal = directEMDAssociate
        const spread4 = directEMDAssociateTotal * Number(EMD_AND_A_PERCENTAGE)
        /* ------- END Formula Associate */

        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directEMDTrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directEMDTrainingAssociateTotal = directEMDTrainingAssociate
        const spread5 =
          directEMDTrainingAssociateTotal * Number(EMD_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        console.log({ spread1, spread2, spread3, spread4, spread5 })
        SPREAD_TOTAL = spread1 + spread2 + spread3 + spread4 + spread5
      } else if (isSeniorMarketingDirector) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ SMD AND MD */
        // Formula SMD AND MD
        const spreadSMDandMDCalculation =
          (spreadNumberOfMembers5 +
            numberOfDirectMembers5 +
            numberOfPromotedMembers5) *
          spreadPremiumMember5 *
          spreadMonthlyTargetPremium5

        const spreadSMDandMDTotal = spreadSMDandMDCalculation
        /* ------- END Formula SMD AND MD */

        /** ------ SMD AND SA */
        // Formula SMD AND SA
        const spreadSMDandSACalculation =
          (spreadNumberOfMembers6 + numberOfPromotedMembers6) *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6

        const spreadSMDandSATotal = spreadSMDandSACalculation
        /* ------- END Formula SMD AND SA */

        /** ------ SMD AND Associate */
        // Formula SMD AND Associate
        const spreadSMDandACalculation =
          (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadSMDandATotal = spreadSMDandACalculation
        /* ------- END Formula SMD AND Associate */

        /** ------ SMD AND Training Associate */
        // Formula SMD AND Training Associate
        const spreadSMDandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadSMDandTATotal = spreadSMDandTACalculation
        /* ------- END Formula SMD AND Training Associate */

        const spread1 =
          (spreadSMDandTATotal +
            spreadSMDandATotal +
            spreadSMDandMDTotal +
            spreadSMDandSATotal) *
          Number(SMD_AND_MD_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */

        /** ------ Senior Associate */
        // Formula Senior Associate
        const directSMDSeniorAssociate =
          numberOfDirectMembers6 *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6
        const directSMDSeniorAssociateTotal = directSMDSeniorAssociate
        const spread2 =
          directSMDSeniorAssociateTotal * Number(SMD_AND_SA_PERCENTAGE)
        /* ------- END Formula Senior Associate */

        /** ------ Associate */
        // Formula Associate
        const directSMDAssociate =
          numberOfDirectMembers7 *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7
        const directSMDAssociateTotal = directSMDAssociate
        const spread3 = directSMDAssociateTotal * Number(SMD_AND_A_PERCENTAGE)
        /* ------- END Formula Associate */

        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directSMDTrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directSMDTrainingAssociateTotal = directSMDTrainingAssociate
        const spread4 =
          directSMDTrainingAssociateTotal * Number(SMD_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        SPREAD_TOTAL = spread1 + spread2 + spread3 + spread4
      } else if (isMarketingDirector) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ MD AND SA */
        // Formula MD AND SA
        const spreadMDandSACalculation =
          (spreadNumberOfMembers6 +
            numberOfDirectMembers6 +
            numberOfPromotedMembers6) *
          spreadPremiumMember6 *
          spreadMonthlyTargetPremium6

        const spreadMDandSATotal = spreadMDandSACalculation
        /* ------- END Formula MD AND SA */

        /** ------ MD AND Associate */
        // Formula MD AND Associate
        const spreadMDandACalculation =
          (spreadNumberOfMembers7 + numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadMDandATotal = spreadMDandACalculation
        /* ------- END Formula MD AND Associate */

        /** ------ MD AND Training Associate */
        // Formula MD AND Training Associate
        const spreadMDandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadMDandTATotal = spreadMDandTACalculation
        /* ------- END Formula MD AND Training Associate */

        const spread1 =
          (spreadMDandSATotal + spreadMDandATotal + spreadMDandTATotal) *
          Number(MD_AND_SA_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */
        /** ------ Associate */
        // Formula Associate
        const directMDAssociate =
          numberOfDirectMembers7 *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7
        const directMDAssociateTotal = directMDAssociate
        const spread2 = directMDAssociateTotal * Number(MD_AND_A_PERCENTAGE)
        /* ------- END Formula Associate */

        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directMDTrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directMDTrainingAssociateTotal = directMDTrainingAssociate
        const spread3 =
          directMDTrainingAssociateTotal * Number(MD_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        SPREAD_TOTAL = spread1 + spread2 + spread3
      } else if (isSeniorAssociate) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ SA AND Associate */
        // Formula SA AND Associate
        const spreadSAandACalculation =
          (spreadNumberOfMembers7 +
            numberOfDirectMembers7 +
            numberOfPromotedMembers7) *
          spreadPremiumMember7 *
          spreadMonthlyTargetPremium7

        const spreadSAandATotal = spreadSAandACalculation
        /* ------- END Formula SA AND Associate */

        /** ------ SA AND Training Associate */
        // Formula SA AND Training Associate
        const spreadSAandTACalculation =
          (spreadNumberOfMembers8 + numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadSAandTATotal = spreadSAandTACalculation
        /* ------- END Formula SA AND Training Associate */

        const spread1 =
          (spreadSAandATotal + spreadSAandTATotal) * Number(SA_AND_A_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        /** -------------------- START OF DIRECT -----------------------------------  */
        /** ------ TrainingAssociate */
        // Formula TrainingAssociate
        const directSATrainingAssociate =
          numberOfDirectMembers8 *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8
        const directSATrainingAssociateTotal = directSATrainingAssociate
        const spread2 =
          directSATrainingAssociateTotal * Number(SA_AND_TA_PERCENTAGE)
        /* ------- END Formula TrainingAssociate */

        SPREAD_TOTAL = spread1 + spread2
      } else if (isAssociate) {
        /** -------------------- INDIRECT AND DIRECT -----------------------------------  */
        /** ------ A AND Training Associate */
        // Formula A AND Training Associate
        const spreadAandTACalculation =
          (spreadNumberOfMembers8 +
            numberOfDirectMembers8 +
            numberOfPromotedMembers8) *
          spreadPremiumMember8 *
          spreadMonthlyTargetPremium8

        const spreadAandTATotal = spreadAandTACalculation
        /* ------- END Formula A AND Training Associate */

        const spread1 = spreadAandTATotal * Number(A_AND_TA_PERCENTAGE)

        /** -------------------- END OF INDIRECT AND DIRECT -----------------------------------  */

        SPREAD_TOTAL = spread1
      }

      const earningsSetter = () => {
        setTotalEarnings((prevState) => {
          const filteredPrevState = prevState.map((data) => {
            return {
              personal: personalTotal,
              spread: 0,
              generationOverride: 0,
            }
          })
          return filteredPrevState
        })

        if (
          data.personal.position[0].numberValue >= AGENT_ROLES[3].numberValue
        ) {
          setIsPositionValid(true)
        } else {
          setIsPositionValid(false)
        }
      }

      const genEarningsSetter = () => {
        setGenerationTotal((prevState) => {
          const filteredPrevState = prevState.map((data) => {
            return {
              gen1: 0,
              gen2: 0,
              gen3: 0,
              gen4: 0,
            }
          })
          return filteredPrevState
        })

        if (
          data.personal.position[0].numberValue >= AGENT_ROLES[3].numberValue
        ) {
          setIsPositionValid(true)
        } else {
          setIsPositionValid(false)
        }
      }

      /* Validation */
      const SAvalidity =
        Number(spreadNumberOfMembers7) + Number(numberOfDirectMembers7)
      const MDvalidity =
        Number(spreadNumberOfMembers6) + Number(numberOfDirectMembers6) < 2 ||
        Number(spreadNumberOfMembers7) + Number(numberOfDirectMembers7) < 5

      const SMDvalidity =
        Number(spreadNumberOfMembers5) + Number(numberOfDirectMembers5) < 2 &&
        Number(spreadNumberOfMembers6) + Number(numberOfDirectMembers6) < 5

      const EMDvalidity =
        Number(spreadNumberOfMembers4) + Number(numberOfDirectMembers4) < 2 &&
        Number(spreadNumberOfMembers5) + Number(numberOfDirectMembers5) < 3

      const SEMDvalidity =
        Number(spreadNumberOfMembers3) + Number(numberOfDirectMembers3) < 2 &&
        Number(spreadNumberOfMembers4) + Number(numberOfDirectMembers4) < 4

      const EVPvalidity =
        Number(spreadNumberOfMembers2) + Number(numberOfDirectMembers2) < 2 &&
        Number(spreadNumberOfMembers4) + Number(numberOfDirectMembers4) < 6

      /** Generation Overrride */

      /* Generation 1 Formula*/
      const genValue1 = data.generation.numberValue1
      const genTotalVol1 =
        // Formula Associate
        isAssociate
          ? numberOfPromotedMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            (spreadNumberOfMembers8 + numberOfDirectMembers8) *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8
          : // Formula SA
          isSeniorAssociate
          ? numberOfPromotedMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            (spreadNumberOfMembers7 + numberOfDirectMembers7) *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula MD
          isMarketingDirector
          ? numberOfPromotedMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            (spreadNumberOfMembers6 + numberOfDirectMembers6) *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfDirectMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            numberOfDirectMembers8 *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8
          : // Formula SMD
          isSeniorMarketingDirector
          ? numberOfPromotedMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            (spreadNumberOfMembers5 + numberOfDirectMembers5) *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfDirectMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfDirectMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            numberOfDirectMembers8 *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8
          : // Formula EMD
          isExecutiveMarketingDirector
          ? numberOfPromotedMembers3 *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3 +
            (spreadNumberOfMembers4 + numberOfDirectMembers4) *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            numberOfDirectMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfDirectMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfDirectMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula SEMD
          isSeniorExecutiveMarketingDirector
          ? numberOfPromotedMembers2 *
              spreadMonthlyTargetPremium2 *
              spreadPremiumMember2 +
            (spreadNumberOfMembers3 + numberOfDirectMembers3) *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3 +
            numberOfDirectMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            numberOfDirectMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfDirectMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfDirectMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula EVP
          isVicePresident
          ? numberOfPromotedMembers1 *
              spreadMonthlyTargetPremium1 *
              spreadPremiumMember1 +
            (spreadNumberOfMembers2 + numberOfDirectMembers2) *
              spreadMonthlyTargetPremium2 *
              spreadPremiumMember2 +
            numberOfDirectMembers3 *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3 +
            numberOfDirectMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            numberOfDirectMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfDirectMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfDirectMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : 0

      const genTotal1 = genTotalVol1 * genValue1

      /* Generation 2 Formula*/
      const genValue2 = data.generation.numberValue2
      const genTotalVol2 =
        // Formula 2 SA
        isSeniorAssociate
          ? spreadNumberOfMembers8 *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8 +
            numberOfPromotedMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula 2 MD
          isMarketingDirector
          ? spreadNumberOfMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            numberOfPromotedMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6
          : // Formula 2 SMD
          isSeniorMarketingDirector
          ? spreadNumberOfMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfPromotedMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5
          : // Formula 2 EMD
          isExecutiveMarketingDirector
          ? spreadNumberOfMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfPromotedMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4
          : // Formula 2 SEMD
          isSeniorExecutiveMarketingDirector
          ? spreadNumberOfMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            numberOfPromotedMembers3 *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3
          : // Formula 2 EVP
          isVicePresident
          ? spreadNumberOfMembers3 *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3 +
            numberOfPromotedMembers2 *
              spreadMonthlyTargetPremium2 *
              spreadPremiumMember2
          : 0

      const genTotal2 = genTotalVol2 * genValue2

      /* Generation 3 Formula*/
      const genValue3 = data.generation.numberValue3
      const genTotalVol3 =
        // Formula MD
        isMarketingDirector
          ? spreadNumberOfMembers8 *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8 +
            numberOfPromotedMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula SMD
          isSeniorMarketingDirector
          ? spreadNumberOfMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            numberOfPromotedMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6
          : // Formula EMD
          isExecutiveMarketingDirector
          ? spreadNumberOfMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfPromotedMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5
          : // Formula SEMD
          isSeniorExecutiveMarketingDirector
          ? spreadNumberOfMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfPromotedMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4
          : // Formula EVP
          isVicePresident
          ? spreadNumberOfMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4 +
            numberOfPromotedMembers3 *
              spreadMonthlyTargetPremium3 *
              spreadPremiumMember3
          : 0

      const genTotal3 = genTotalVol3 * genValue3

      /* Generation 4 Formula*/
      const genValue4 = data.generation.numberValue4
      const genTotalVol4 =
        // Formula 4
        isSeniorMarketingDirector
          ? spreadNumberOfMembers8 *
              spreadMonthlyTargetPremium8 *
              spreadPremiumMember8 +
            numberOfPromotedMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7
          : // Formula 4
          isExecutiveMarketingDirector
          ? spreadNumberOfMembers7 *
              spreadMonthlyTargetPremium7 *
              spreadPremiumMember7 +
            numberOfPromotedMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6
          : // Formula 4 SEMD
          isSeniorExecutiveMarketingDirector
          ? spreadNumberOfMembers6 *
              spreadMonthlyTargetPremium6 *
              spreadPremiumMember6 +
            numberOfPromotedMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5
          : // Formula 4 EVP
          isVicePresident
          ? spreadNumberOfMembers5 *
              spreadMonthlyTargetPremium5 *
              spreadPremiumMember5 +
            numberOfPromotedMembers4 *
              spreadMonthlyTargetPremium4 *
              spreadPremiumMember4
          : 0

      const genTotal4 = genTotalVol4 * genValue4

      /* Generation Total Formula*/

      const generationTotal = genTotal4 + genTotal3 + genTotal2 + genTotal1

      if (isSeniorAssociate && SAvalidity < 3) {
        setErrorMessage(
          "Minimum requirement for Senior Associate not met : 3 Associates."
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()
        return
      } else if (isMarketingDirector && MDvalidity) {
        setErrorMessage(
          "Minimum requirement for Marketing Director not met : 2 Senior Associates and 5 Associates."
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()
        return
      } else if (isSeniorMarketingDirector && SMDvalidity) {
        setErrorMessage(
          "Minimum requirement for Senior Marketing Director not met : 2 Marketing Director or 5 Senior Associates"
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()

        return
      } else if (isExecutiveMarketingDirector && EMDvalidity) {
        setErrorMessage(
          "Minimum requirement for Executive Marketing Director not met : 2 Senior Marketing Director or 3 Marketing Director"
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()

        return
      } else if (isSeniorExecutiveMarketingDirector && SEMDvalidity) {
        setErrorMessage(
          "Minimum requirement for Senior Executive Marketing Director not met : 2 Executive Marketing Director or 4 Senior Marketing Director"
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()

        return
      } else if (isVicePresident && EVPvalidity) {
        setErrorMessage(
          "Minimum requirement for Executive Vice President not met : 2 Senior Executive Marketing Director or 6 Senior Marketing Director"
        )
        setTotalEarnings(earningsInitialValue)
        setGenerationTotal(generationInitialValue)
        earningsSetter()

        return
      }

      // /*Total Members  */
      // const totalMembersOverall = overrideMembersTotal + spreadMembersTotal;
      // setMembers(totalMembersOverall); /* Hidden for future use */
      setErrorMessage("")
      setTotalEarnings((prevState) => {
        const filteredPrevState = prevState.map((data) => {
          return {
            personal: personalTotal,
            spread: SPREAD_TOTAL,
            generationOverride: generationTotal,
          }
        })
        return filteredPrevState
      })

      setGenerationTotal((prevState) => {
        const filteredPrevState = prevState.map((data) => {
          return {
            gen1: genTotal1,
            gen2: genTotal2,
            gen3: genTotal3,
            gen4: genTotal4,
          }
        })
        return filteredPrevState
      })

      if (data.personal.position[0].numberValue >= AGENT_ROLES[3].numberValue) {
        setIsPositionValid(true)
      } else {
        setIsPositionValid(false)
      }
    }

    onCalculate(initialValues)
  }, [initialValues])

  const submitHandler = (data) => {}

  const totalEarningMonthly =
    totalEarnings[0].personal +
    totalEarnings[0].spread +
    (isPositionValid ? totalEarnings[0].generationOverride : 0)

  const totalEarningAnually = totalEarningMonthly * 12

  const formattedearnings = {
    totalEarningAnually: formatter.format(totalEarningAnually || 0),
    totalEarningMonthly: formatter.format(totalEarningMonthly || 0),
  }

  useEffect(() => {
    const isAcknowledged = sessionStorage.getItem("isAcknowledged")
    if (!isAcknowledged) {
      setOpen(true)
    }
  }, [])

  const acknowledgeHandler = () => {
    sessionStorage.setItem("isAcknowledged", "true")
    setOpen(false)
  }

  return (
    <div className="admin-calculator">
      <DocumentTitleSetter title="Calculator | CFS Portal" />
      <Formik
        initialValues={initialValues}
        // validationSchema={validateYupSchema}
        onSubmit={(data) => submitHandler(data)}
      >
        {({
          values,
          errors,
          handleSubmit,
          setFieldValue,
          resetForm,
          touched,
        }) => {
          return (
            <div className="two-col">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <div className="left-col-calculator">
                    <div className="overall-earnings-container">
                      <Grid container spacing={0} alignItems="center">
                        <Grid item xs={12} md={12} lg={7}>
                          <div className="left-col-total">
                            <div className="overall-earnings-captions">
                              <h2>Total Earnings</h2>
                              <h1>{formattedearnings.totalEarningMonthly}</h1>
                              <h3>Month to Date</h3>
                            </div>
                            <div className="top-left-col-btn">
                              <button>{date}</button>
                              <button className="download-btn">
                                Download Report
                              </button>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12} lg={5}>
                          <div className="right-col-total">
                            <h2>{formattedearnings.totalEarningAnually}</h2>
                            <p>Potential Annual Earning</p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="form-calculator-wrapper">
                      <div className="calculator-input-container-personal">
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} lg={6}>
                            <div className="form-left-col-personal">
                              <label className="personal-label">
                                Personal Position
                              </label>
                              <Select
                                classNamePrefix="select"
                                onChange={(e) => {
                                  // if (values.personal.position[0].value) {
                                  //   resetForm();
                                  //   setIsPositionValid(false);
                                  //   setErrorMessage("");
                                  //   setTotalEarnings(earningsInitialValue);
                                  // }
                                  onChangePositionHandler(e, setFieldValue)
                                  setInitialValues((prevState): any => {
                                    return {
                                      ...initialValues,
                                      personal: {
                                        position: [
                                          {
                                            label: e?.label,
                                            numberValue: e?.numberValue,
                                            value: e?.value,
                                          },
                                        ],
                                        monthlyTargetPremium:
                                          prevState.personal
                                            .monthlyTargetPremium,
                                      },
                                    }
                                  })
                                }}
                                isSearchable={true}
                                name="position"
                                placeholder="Choose a position"
                                options={
                                  AGENT_ROLES.map((st) => {
                                    return {
                                      label: st.label,
                                      value: st.value,
                                      numberValue: st.numberValue,
                                    }
                                  }) as any
                                }
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: "13px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                  }),

                                  placeholder: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "rgba(0, 0, 0, 0.3)",
                                  }),
                                }}
                                value={values.personal.position![0]}
                              />
                              <ErrorText
                                isError={
                                  !values.personal.position &&
                                  !!touched.personal?.position
                                }
                                text="Position field is required."
                              />
                              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12} lg={6}>
                            <div className="form-right-col-personal">
                              <label className="personal-label">
                                Personal Monthly Target Premium
                              </label>
                              <FormikTextInput
                                name="personal.monthlyTargetPremium"
                                type="number"
                                value={
                                  values.personal.monthlyTargetPremium === ""
                                    ? ""
                                    : values.personal.monthlyTargetPremium
                                }
                                style={standardInputStyles}
                                placeholder={formatter.format(0)}
                                variant="outlined"
                                label=""
                                error={!!errors.personal?.monthlyTargetPremium}
                                onBlur={(e) => {
                                  setInitialValues((prevState): any => {
                                    return {
                                      ...initialValues,
                                      personal: {
                                        position: [
                                          {
                                            label:
                                              prevState?.personal.position[0]
                                                .label,
                                            numberValue:
                                              prevState?.personal.position[0]
                                                .numberValue,
                                            value:
                                              prevState?.personal.position[0]
                                                .value,
                                          },
                                        ],
                                        monthlyTargetPremium: e.target?.value,
                                      },
                                    }
                                  })
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="calculator-input-container-spread">
                        <h2>Spread</h2>
                        {errorMessage ? (
                          <div className="alert-message">
                            <AlertMessage
                              message={errorMessage}
                              icon={<AiOutlineWarning />}
                            />
                          </div>
                        ) : (
                          <div style={{ height: "1.5vh" }}></div>
                        )}
                        {values.personal.position[0].numberValue ===
                        AGENT_ROLES[7].numberValue ? (
                          <h2
                            style={{
                              color: "#000",
                              fontWeight: "300",
                              textAlign: "center",
                              marginTop: "2rem",
                              paddingBottom: "5.6rem",
                            }}
                          >
                            No Spread data availabe for Traning Associate.
                          </h2>
                        ) : (
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={12} lg={2}>
                              <label style={{ textAlign: "left" }}>
                                Position
                              </label>
                            </Grid>

                            <Grid item xs={12} md={12} lg={2}>
                              <label>
                                No. of <br /> Total Members
                              </label>
                            </Grid>
                            <Grid item xs={12} md={12} lg={2}>
                              <label style={{ textAlign: "center" }}>
                                No. of <br /> Direct Members
                              </label>
                            </Grid>
                            <Grid item xs={12} md={12} lg={2}>
                              <label style={{ textAlign: "center" }}>
                                No. of <br /> Promoted Members
                              </label>
                            </Grid>
                            <Grid item xs={12} md={12} lg={2}>
                              <label>
                                No. of <br /> Premium per Member
                              </label>
                            </Grid>
                            <Grid item xs={12} md={12} lg={2}>
                              <label>
                                Monthly Target <br /> Premium per Policy
                              </label>
                            </Grid>
                          </Grid>
                        )}
                        <Grid container spacing={2} alignItems="center">
                          {AGENT_ROLES.map((data, index) => {
                            const sumIndex = index + 1

                            if (
                              values.personal.position[0].numberValue <
                                data.numberValue ||
                              values.personal.position[0].numberValue ===
                                AGENT_ROLES[7].numberValue
                            ) {
                              return <React.Fragment />
                            }
                            return (
                              <React.Fragment>
                                <Grid item xs={12} md={12} lg={2}>
                                  <div className="perosonal-tooltip">
                                    <Grid
                                      container
                                      spacing={0}
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Grid item xs={12} md={12} lg={10}>
                                        <h3 style={{ textAlign: "left" }}>
                                          {data.label}
                                        </h3>
                                      </Grid>
                                    </Grid>
                                  </div>
                                </Grid>

                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfMembers${sumIndex}`}
                                    value={
                                      values.spread[
                                        `numberOfMembers${sumIndex}`
                                      ] === 0
                                        ? ""
                                        : values.spread[
                                            `numberOfMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        }
                                      })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfDirectMembers${sumIndex}`}
                                    value={
                                      values.spread[
                                        `spread.numberOfDirectMembers${sumIndex}`
                                      ] === 0
                                        ? ""
                                        : values.spread[
                                            `spread.numberOfDirectMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfDirectMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        }
                                      })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfPromotedMembers${sumIndex}`}
                                    value={
                                      values.spread[
                                        `spread.numberOfPromotedMembers${sumIndex}`
                                      ] === 0
                                        ? ""
                                        : values.spread[
                                            `spread.numberOfPromotedMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfPromotedMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        }
                                      })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    type="number"
                                    name={`spread.numberOfPremiumMembers${sumIndex}`}
                                    value={
                                      values.spread[
                                        `spread.numberOfPremiumMembers${sumIndex}`
                                      ] === 0
                                        ? ""
                                        : values.spread[
                                            `spread.numberOfPremiumMembers${sumIndex}`
                                          ]
                                    }
                                    placeholder="0"
                                    variant="outlined"
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`numberOfPremiumMembers${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        }
                                      })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={2}>
                                  <FormikTextInput
                                    name={`spread.monthlyTargetPremium${sumIndex}`}
                                    value={
                                      values.spread[
                                        `monthlyTargetPremium${sumIndex}`
                                      ] === 0 || ""
                                        ? ""
                                        : values.spread[
                                            `monthlyTargetPremium${sumIndex}`
                                          ]
                                    }
                                    variant="outlined"
                                    placeholder={formatter.format(0)}
                                    label=""
                                    disabled={
                                      values.personal.position[0].numberValue <
                                      data.numberValue
                                    }
                                    onBlur={(e) => {
                                      setInitialValues((prevState) => {
                                        return {
                                          ...initialValues,
                                          spread: {
                                            ...prevState.spread,
                                            [`monthlyTargetPremium${sumIndex}`]:
                                              e.target?.value,
                                          },
                                        }
                                      })
                                    }}
                                  />
                                </Grid>
                              </React.Fragment>
                            )
                          })}
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <div className="right-col-calculator">
                    <div className="top-section">
                      <div className="top-section-captions">
                        <span>Hello, </span>
                        <h2 style={{ display: "inline-block" }}>
                          {" "}
                          {nameFallback(account?.name, account?.firstName)}!
                        </h2>
                        <h4>Welcome to your CFS Calculator</h4>
                      </div>
                    </div>

                    <div className="calculator-input-container-override">
                      <h2
                        style={{
                          fontSize: "2rem",
                          fontWeight: "900",
                          fontFamily: "sans-serif",
                          marginTop: "-1.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Generation Override
                      </h2>

                      <div className="alert-message">
                        {values.personal.position[0].numberValue < 0.81 ? (
                          <AlertMessage
                            message="Only Senior Marketing Director and above can earn override."
                            icon={<AiOutlineWarning />}
                          />
                        ) : null}
                      </div>
                      <Grid
                        container
                        spacing={2}
                        className="override-breakdown-wrapper"
                      >
                        <Grid item xs={12} md={12} lg={4}>
                          <Grid
                            container
                            spacing={2}
                            className="override-earnings-label"
                          >
                            <Grid item xs={12} md={12} lg={6}>
                              <h2>Tier</h2>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                              <h2
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Override Earnings per Generation
                              </h2>
                            </Grid>
                          </Grid>
                          {genNum.map((data, index) => {
                            const genIndex = index + 1

                            return (
                              <Grid
                                container
                                spacing={2}
                                className="override-earnings-content-container"
                              >
                                <Grid item xs={12} md={12} lg={6}>
                                  <h2>{data} generation</h2>
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                  <h3 style={{ textAlign: "center" }}>
                                    {formatter.format(
                                      generationTotal[0][`gen${genIndex}`]
                                    )}
                                  </h3>
                                </Grid>
                              </Grid>
                            )
                          })}
                        </Grid>
                        <Grid item xs={12} md={12} lg={8}>
                          <div className="tri-col-container">
                            <Grid
                              container
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item xs={12} md={12} lg={4}>
                                <div className="tri-col-section-captions">
                                  <div className="earnings-title">
                                    <h2>Personal Earnings</h2>
                                  </div>
                                  <div className="earnings-label">Monthly</div>
                                  <div className="earnings-value1-block">
                                    <h2>
                                      {formatter.format(
                                        totalEarnings[0].personal
                                      )}
                                    </h2>
                                  </div>
                                  <div className="earnings-label">Annual</div>
                                  <div className="earnings-value2-block">
                                    <h2 className="sky">
                                      {formatter.format(
                                        totalEarnings[0].personal * 12
                                      )}
                                    </h2>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={12} lg={4}>
                                <div className="tri-col-section-captions">
                                  <div className="earnings-title">
                                    <h2>Spread Earnings</h2>
                                  </div>
                                  <div className="earnings-label">Monthly</div>
                                  <div className="earnings-value1-block">
                                    <h2>
                                      {formatter.format(
                                        Math.round(totalEarnings[0].spread)
                                      )}
                                    </h2>
                                  </div>
                                  <div className="earnings-label">Annual</div>
                                  <div className="earnings-value2-block">
                                    <h2 className="navy">
                                      {formatter.format(
                                        Math.round(totalEarnings[0].spread) * 12
                                      )}
                                    </h2>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                lg={4}
                                style={{ position: "relative" }}
                              >
                                <div className="tri-col-section-captions">
                                  {values.personal.position[0].numberValue <
                                  0.81 ? (
                                    <HtmlTooltip
                                      title={
                                        <div
                                          style={{
                                            fontSize: "1.3rem",
                                          }}
                                        >
                                          Potential earnings if you are Senior
                                          Marketing Director or above. Please
                                          check upline to see more details.{" "}
                                          <br />
                                          <i style={{ color: "red" }}>
                                            This earnings won't be added to your
                                            projected total earnings.
                                          </i>
                                        </div>
                                      }
                                    >
                                      <div className="blog-title">
                                        <Badge>Potential Earnings</Badge>
                                      </div>
                                    </HtmlTooltip>
                                  ) : (
                                    <React.Fragment />
                                  )}
                                  <div className="earnings-title">
                                    <h2>Override Earnings</h2>
                                  </div>
                                  <div className="earnings-label">Monthly</div>
                                  <div className="earnings-value1-block">
                                    <h2
                                      style={{
                                        color:
                                          values.personal.position[0]
                                            .numberValue < 0.81
                                            ? "red"
                                            : "black",
                                      }}
                                    >
                                      {formatter.format(
                                        totalEarnings[0].generationOverride
                                      )}
                                    </h2>
                                  </div>
                                  <div className="earnings-label">Annual</div>
                                  <div className="earnings-value2-block">
                                    <h2
                                      className="light"
                                      style={{
                                        color:
                                          values.personal.position[0]
                                            .numberValue < 0.81
                                            ? "red"
                                            : "black",
                                      }}
                                    >
                                      {formatter.format(
                                        totalEarnings[0].generationOverride * 12
                                      )}
                                    </h2>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      {totalEarnings[0].spread !== 0 ? (
                        <div className="generational-tree">
                          <h2>Generational Tree</h2>
                          <div className="generational-tree-diagram">
                            <img
                              style={{ borderRadius: "20px" }}
                              src="/assets/others/generation-tree-dummy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="calculator-buttons">
                      <Button
                        variant="danger"
                        onClick={() => {
                          resetForm()
                          setGenerationTotal(generationInitialValue)
                          setTotalEarnings(earningsInitialValue)
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div
                        className="disclaimer-container"
                        style={{
                          borderRadius: "10px",
                          fontSize: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        <h2 style={{ marginBottom: "1.5rem" }}>Disclaimer </h2>
                        <div
                          className="disclaimer-description"
                          style={{
                            marginBottom: "1.5rem",
                            lineHeight: "2rem",
                            fontWeight: "300",
                          }}
                        >
                          The Insurance Earnings Calculator is designed for
                          projection purposes only. The results provided are
                          based on user-inputted data and assumptions and should
                          not be considered as definitive results. Actual
                          earnings may vary.
                        </div>
                        <div
                          className="disclaimer-description"
                          style={{
                            marginBottom: "1.5rem",
                            lineHeight: "2rem",
                            fontWeight: "300",
                          }}
                        >
                          To use this calculator, enter details such as Personal
                          position, Personal monthly target premium,and details
                          in the Spread and Generation Override section. Click
                          anywhere outside the field to get results and{" "}
                          <span
                            style={{
                              color: "#ED3E4B",
                              fontWeight: "700",
                            }}
                          >
                            Reset
                          </span>{" "}
                          button to start over.
                          <div
                            className="check-box-container"
                            style={{
                              marginTop: "1rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              onChange={() => acknowledgeHandler()}
                            />
                            <span style={{ marginLeft: "1rem" }}>
                              I acknowledge this tool.
                            </span>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </Grid>
              </Grid>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default Calculator
