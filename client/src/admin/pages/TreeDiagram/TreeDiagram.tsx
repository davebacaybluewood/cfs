import { Container, Stack } from "@mui/material"
import OrganizationalChart from "./components/OrganizationalChart"
import TeamDetails from "./components/TeamDetails"
import { useState, useEffect } from "react"
import { data } from "./treeTestData"
import "./TreeDiagram.scss"

type DataType = {
  name: string
  gender: string
  type: string
  children?: DataType[]
}

// function to count agent, subscriber, and free trial
const totalType = (type: string, data: DataType[]) => {
  let typeCount = 0

  function countType(arr: DataType[]) {
    for (const item of arr) {
      if (item.type === type) {
        typeCount++
      }
      if (item.children) {
        countType(item.children)
      }
    }
  }

  countType(data)
  return typeCount
}

const TreeDiagram: React.FC = () => {
  const [totalAgents, setTotalAgents] = useState<number>(0)
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0)
  const [totalTrial, setTotalTrial] = useState<number>(0)

  useEffect(() => {
    setTotalAgents(totalType("agent", data))
    setTotalSubscribers(totalType("subscriber", data))
    setTotalTrial(totalType("free-trial", data))
  }, [data])

  return (
    <main
      style={{
        padding: "4rem 0",
        backgroundImage:
          "url('/assets/images/tree-diagram/rewards-interface.png')",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "42px" }}>AGENT OF AGENTS</h1>
      </div>
      <hr style={{ margin: "3rem" }} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          style={{ width: "800px", opacity: 0.3 }}
          src="/assets/images/tree-diagram/Agent.png"
          alt=""
        />
      </div>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0 3rem" }}
      >
        <div style={{ color: "white" }}>
          <h1>TEAM BUILDER INTERFACE</h1>
          <p
            style={{
              color: "gray",
              fontWeight: 300,
              fontSize: "14px",
              marginTop: "0.5rem",
            }}
          >
            Building Connections: Agents, Subscribers, and Free Trial Users
          </p>
        </div>
        <TeamDetails
          totalAgents={totalAgents}
          totalSubscribers={totalSubscribers}
          totalTrial={totalTrial}
        />
      </Stack>

      <OrganizationalChart data={data} />
      <div style={{ textAlign: "center", marginTop: "9rem" }}>
        <img
          style={{ width: "150px" }}
          src="/assets/images/logos/cfs-logo.png"
          alt=""
        />
      </div>
    </main>
  )
}

export default TreeDiagram
