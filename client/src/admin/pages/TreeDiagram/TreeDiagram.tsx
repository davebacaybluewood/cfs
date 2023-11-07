import { Container } from "@mui/material"
import OrganizationalChart from "./components/OrganizationalChart"

const TreeDiagram = () => {
  return (
    <main style={{ padding: "4rem 0" }}>
      <Container>
        <h1 style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          Team Builder Interface
        </h1>
        <OrganizationalChart />
        <div
          style={{
            background: "#00004d",
            color: "white",
            width: "auto",
            padding: "3em",
            display: "inline-block",
            borderRadius: "7px",
            marginTop: "4rem",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Team</h1>

          <div>
            <h2 style={{ fontWeight: "300" }}>Agents: 2</h2>
            <h2 style={{ fontWeight: "300" }}>Subscribers: 2</h2>
            <h2 style={{ fontWeight: "300" }}>30-Day Trial: 2</h2>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default TreeDiagram
