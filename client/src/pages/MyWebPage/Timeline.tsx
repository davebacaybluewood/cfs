import TimelinePost, {
  TimelinePostProps,
} from "library/TimelinePost/TimelinePost"
import TimelineLoading from "./components/TimelineLoading"

interface TimelineProps {
  userGuid?: string
  data: TimelinePostProps[] | undefined
  loading?: boolean
}
const Timeline: React.FC<TimelineProps> = (props) => {
  const { userGuid, data, loading } = props

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      {loading ? (
        <TimelineLoading />
      ) : (
        data?.map((timeline) => {
          return <TimelinePost {...timeline} />
        })
      )}
    </div>
  )
}

export default Timeline
