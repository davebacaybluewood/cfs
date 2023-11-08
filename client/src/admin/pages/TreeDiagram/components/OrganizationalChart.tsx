import React, { useState, useEffect } from "react"
import { Tree, TreeNode } from "react-organizational-chart"
import Avatar from "./Avatar"
import { BsPlusCircleFill } from "react-icons/bs"
import { Tooltip } from "@mui/material"
import "../TreeDiagram.scss"

const OrganizationalChart = ({ data }) => {
  const [renderLevels, setRenderLevels] = useState(3)
  const [maxLevels, setMaxLevels] = useState(0)

  useEffect(() => {
    // Find the maximum number of levels available in the data
    const findMaxLevels = (data, level = 1) => {
      if (data && data.length > 0) {
        if (level > maxLevels) {
          setMaxLevels(level)
        }
        data.forEach((item) => {
          if (item.children) {
            findMaxLevels(item.children, level + 1)
          }
        })
      }
    }

    findMaxLevels(data)
  }, [data, maxLevels])

  const renderTree = (data, level) => {
    if (level > renderLevels) {
      return null
    }

    return data.map((item, index) => (
      <TreeNode
        key={index}
        label={
          <Avatar name={item.name} gender={item.gender} type={item.type} />
        }
      >
        {item.children && renderTree(item.children, level + 1)}
      </TreeNode>
    ))
  }

  const handleExpand = () => {
    setRenderLevels((prevLevels) => prevLevels + 1) // Increase the number of levels
  }

  return (
    <main style={{ marginTop: "3rem" }}>
      <Tree
        label={
          <img
            src="/assets/images/logos/cfs-logo.png"
            style={{ width: "100px" }}
            alt=""
          />
        }
      >
        {renderTree(data, 1)}
      </Tree>
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        {renderLevels < maxLevels && (
          <Tooltip title={<h1>Click to expand tree</h1>}>
            <button className="plusBtn" onClick={handleExpand}>
              <BsPlusCircleFill style={{ fontSize: "5rem" }} />
            </button>
          </Tooltip>
        )}
      </div>
    </main>
  )
}

export default OrganizationalChart
