import { Tree, TreeNode } from "react-organizational-chart"
import "../TreeDiagram.scss"
import Avatar from "./Avatar"

const OrganizationalChart = () => {
  return (
    <main style={{ marginTop: "3rem" }}>
      <Tree
        label={<Avatar name="Vanessa Stuart" gender="female" type="agent" />}
      >
        <TreeNode
          label={<Avatar name="Steve Aoki" gender="male" type="agent" />}
        >
          <TreeNode
            label={
              <Avatar name="Patricia Keys" gender="female" type="subscriber" />
            }
          />
          <TreeNode
            label={
              <Avatar name="Taylor Hudgens" gender="female" type="free-trial" />
            }
          />
        </TreeNode>

        <TreeNode
          label={<Avatar name="Jonas Patterson" gender="male" type="agent" />}
        >
          <TreeNode
            label={<Avatar name="Caitlyn" gender="female" type="agent" />}
          >
            <TreeNode
              label={
                <Avatar name="Philcob Suzuki" gender="male" type="free-trial" />
              }
            />
            <TreeNode
              label={
                <Avatar name="Brad Traversy" gender="male" type="subscriber" />
              }
            />
          </TreeNode>
        </TreeNode>
      </Tree>
    </main>
  )
}

export default OrganizationalChart
