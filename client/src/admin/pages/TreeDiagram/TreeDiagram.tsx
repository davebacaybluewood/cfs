import { Container, Stack } from "@mui/material"
import OrganizationalChart from "./components/OrganizationalChart"
import TeamDetails from "./components/TeamDetails"

const TreeDiagram = () => {
  


  return (
    <main style={{ padding: "4rem 0" }}>
      <Container>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
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
          <TeamDetails />
        </Stack>
        <OrganizationalChart />
        <div style={{ textAlign: "right", marginTop: "6rem" }}>
          <img
            style={{ width: "150px" }}
            src="/assets/images/logos/cfs-logo.png"
            alt=""
          />
        </div>
      </Container>
    </main>
  )
}

export default TreeDiagram
