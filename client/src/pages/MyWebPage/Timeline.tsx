import { useState, useEffect } from "react"
import TimelinePost, {
  TimelinePostProps,
} from "library/TimelinePost/TimelinePost"
import { default as ApiAgent } from "api/agent"
import { default as AdminAgent } from "admin/api/agent"
import TimelineLoading from "./TimelineLoading"
import { BlogData } from "pages/BlogPage/models"
import Event from "admin/models/eventModel"

const Timeline = ({
  content,
  userGuid,
  testimonials,
}: {
  content?: string
  userGuid: string
  testimonials: any
}) => {
  const [blogs, setBlogs] = useState<BlogData[] | undefined>([])
  const [events, setEvents] = useState<Event[]>([])
  const [posts, setPosts] = useState<TimelinePostProps[] | undefined>([])
  const [loading, setLoading] = useState(false)

  const modifiedSkipItemNumber = 0
  const modifiedLimit = 5
  useEffect(() => {
    setLoading(true)

    // fetch blogs
    const fetchBlogs = async () => {
      const data = await ApiAgent.BlogAndResource.list(
        modifiedSkipItemNumber,
        modifiedLimit
      )

      setBlogs(data?.blogs)
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
    if (blogs && events && testimonials) {
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
              tag: "reccomendation",
              content: item.comment,
            }

            return item.isDisplayed && testimonialObject

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

        if (mapArray) {
          setPosts(mapArray)
        }
      }
    }
  }, [blogs, events, testimonials])

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      {loading ? (
        <TimelineLoading />
      ) : (
        <>
          {posts &&
            posts
              .filter((item) => {
                if (content === "events") {
                  return item.tag === "event"
                } else if (content === "articles") {
                  return item.tag === "article" || item.tag === "blog"
                } else if (content === "reccomendation") {
                  return item.tag === "reccomendation"
                } else {
                  return item
                }
              })
              // .sort((a, b) => a.date - b.date)
              .map(
                (item: any, index: number) =>
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
