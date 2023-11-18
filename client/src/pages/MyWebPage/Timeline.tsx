import { useState, useEffect } from "react"
import axios from "axios"
import TimelinePost, {
  TimelinePostProps,
} from "library/TimelinePost/TimelinePost"
import ENDPOINTS from "constants/endpoints"
import { default as ApiAgent } from "api/agent"
import { default as AdminAgent } from "admin/api/agent"
import TimelineLoading from "./TimelineLoading"
import { TestiMonialTypes } from "admin/pages/Profile/components/Testimonials/Testimonials"
import { BlogData } from "pages/BlogPage/models"
import Event from "admin/models/eventModel"

const Timeline = ({
  content,
  userGuid,
}: {
  content?: string
  userGuid: string
}) => {
  const [testimonials, setTestimonials] = useState<TestiMonialTypes[]>([])
  // i'm getting type error when adding type on blogs
  // const [blogs, setBlogs] = useState<BlogData[]>([])
  const [blogs, setBlogs] = useState<any>([])
  const [events, setEvents] = useState<Event[]>([])
  // also getting typescript error when adding type
  // const [posts, setPosts] = useState<TimelinePostProps[] | null>([])
  const [posts, setPosts] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const modifiedSkipItemNumber = 0
  const modifiedLimit = 5
  useEffect(() => {
    setLoading(true)
    // fetch testimonials
    axios
      .get(ENDPOINTS.PROFILE.replace(":userGuid", userGuid))
      .then((response) => {
        setTestimonials(response.data.testimonials)
      })

    // fetch blogs
    const fetchBlogs = async () => {
      const data = await ApiAgent.BlogAndResource.list(
        modifiedSkipItemNumber,
        modifiedLimit
      )

      if (data !== undefined) {
        setBlogs(data?.blogs)
      }
    }
    fetchBlogs()

    // fetch events
    const getEvents = async () => {
      const data = await AdminAgent.Events.getEvents(userGuid)

      setEvents(data)
      setLoading(false)
    }
    getEvents()
  }, [])

  useEffect(() => {
    const mergedArrays = [...events, ...testimonials, ...blogs]

    if (mergedArrays) {
      // create new variable with the mapped values
      const mapArray = mergedArrays.map((item) => {
        // check if object is a blog. in this case, i checked if authorName key exist in current object
        if (item.hasOwnProperty("authorName")) {
          const blogObject = {
            title: item.title,
            date: item.createdAt,
            tag: "blog",
            content: item.content,
            imgContent: item.thumbnail,
          }
          return blogObject

          // check if object is a testimonial
        } else if (item.hasOwnProperty("testimonialGuid")) {
          const testimonialObject = {
            title: item.title,
            date: item.updatedAt,
            tag: "testimonial",
            content: item.comment,
          }
          return item.isDisplayed ? testimonialObject : {}

          // check if object is an event
        } else if (item.hasOwnProperty("eventDate")) {
          const eventObject = {
            id: item._id,
            userGuid: item.userGuid,
            title: item.title,
            tag: "event",
            date: item.eventDate,
            content: item.shortDescription,
            imgContent: item.thumbnail,
          }
          return eventObject
        } else {
          // Handle other cases or return a default value
          return null // or undefined, or any other default value
        }
      })

      if (mapArray) setPosts(mapArray)
    }
  }, [blogs, events, testimonials])

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      {loading ? (
        <TimelineLoading />
      ) : (
        <>
          {posts
            .filter((item) => {
              if (content === "events") {
                return item.tag === "event"
              } else if (content === "articles") {
                return item.tag === "article" || item.tag === "blog"
              } else if (content === "testimonial") {
                return item.tag === "testimonial"
              } else {
                return item
              }
            })
            .sort((a, b) => a.date - b.date)
            .map(
              (item: TimelinePostProps, index: number) =>
                item.title && (
                  <TimelinePost
                    key={index}
                    id={item.id}
                    userGuid={item.userGuid}
                    profileImg={item.profileImg}
                    title={item.title}
                    userName={item.userName}
                    date={item.date}
                    content={item.content}
                    imgContent={item.imgContent}
                    tag={item.tag}
                  />
                )
            )}
        </>
      )}
    </div>
  )
}
// const Timeline: React.FC<TimelineData> = (props) => {
//   const { data } = props;

//   return (
//     <React.Fragment>
//       <div className="content-container">
//         <div className="content-content">
//           {data?.map((post) => {
//             return <TimelinePost {...post}>{post.children}</TimelinePost>;
//           })}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

export default Timeline
