import { useState, useEffect } from "react"
import axios from "axios"
import TimelinePost from "library/TimelinePost/TimelinePost"
import ENDPOINTS from "constants/endpoints"
import { default as ApiAgent } from "api/agent"
import { default as AdminAgent } from "admin/api/agent"
import TimelineLoading from "./TimelineLoading"

const Timeline = ({
  content,
  userGuid,
}: {
  content?: string
  userGuid: string
}) => {
  const [testimonials, setTestimonials] = useState<any>([])
  const [blogs, setBlogs] = useState<any>([])
  const [events, setEvents] = useState<any>([])
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
    const mergedArrays = [...testimonials, ...blogs, ...events]

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
          return testimonialObject

          // check if object is an event
        } else if (item.hasOwnProperty("eventDate")) {
          const eventObject = {
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

    console.log(blogs)
  }, [testimonials, blogs, events])

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
            .map((item, index) => (
              <TimelinePost
                key={index}
                profileImg={item.profileImg}
                title={item.title}
                userName={item.userName}
                date={item.date}
                content={item.content}
                imgContent={item.imgContent}
                tag={item.tag}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default Timeline
