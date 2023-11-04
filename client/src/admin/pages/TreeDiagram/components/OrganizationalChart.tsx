import { Tree, TreeNode } from "react-organizational-chart"
import "../TreeDiagram.scss"
import Avatar from "./Avatar"

const OrganizationalChart = () => {
  return (
    <>
      <Tree label={<Avatar name="Vanessa Stuart" gender="female" />}>
        <TreeNode label={<Avatar name="Steve Aoki" gender="male" />}>
          <TreeNode label={<Avatar name="Patricia Keys" gender="female" />} />
          <TreeNode label={<Avatar name="Taylor Hudgens" gender="female" />} />
        </TreeNode>

        <TreeNode label={<Avatar name="Jonas Patterson" gender="male" />}>
          <TreeNode label={<Avatar name="Caitlyn" gender="female" />}>
            <TreeNode label={<Avatar name="Philcob Suzuki" gender="male" />} />
            <TreeNode label={<Avatar name="Brad Traversy" gender="male" />} />
          </TreeNode>
        </TreeNode>
      </Tree>
    </>
  )
}

export default OrganizationalChart
