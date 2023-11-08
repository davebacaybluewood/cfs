import { Container, Stack } from "@mui/material"
import OrganizationalChart from "./components/OrganizationalChart"
import TeamDetails from "./components/TeamDetails"
import { useState, useEffect } from "react"
import { data } from "./treeTestData"

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
    <main style={{ padding: "4rem 0" }}>
      <Container>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            style={{ width: "800px", opacity: 0.03 }}
            src="/assets/images/logos/cfs-logo.png"
            alt=""
          />
        </div>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <h1>AGENT OF AGENTS</h1>
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
      </Container>
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
