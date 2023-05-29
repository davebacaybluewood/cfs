import { BlogType } from "library/Blogs/BlogModels";

const blogsDummy: BlogType[] = [
    {
      blogId: "17a46a62-e5d9-42f0-9bf7-0edc33475856",
      image: "/assets/images/blogs/blog-1.png",
      date: new Date()?.toString(),
      title: "Time is money: How detention and delays on dack are hurting you 1",
      description:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit",
      author: {
        authorName: "Darryle Bacay",
        image:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      },
      onClick: () => console.log("test"),
    },
    {
      blogId: "17a46a62-e5d9-42f0-9bf7-0edc33475855",
      image: "/assets/images/blogs/blog-2.png",
      date: new Date()?.toString(),
      title: "Time is money: How detention and delays on dack are hurting you 2",
      description:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit",
      author: {
        authorName: "Darryle Bacay",
        image:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      },
      onClick: () => console.log("test"),
    },
    {
      blogId: "17a46a62-e5d9-42f0-9bf7-0edc33475854",
      image: "/assets/images/blogs/blog-3.png",
      date: new Date()?.toString(),
      title: "Time is money: How detention and delays on dack are hurting you 3",
      description:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit",
      author: {
        authorName: "Darryle Bacay",
        image:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      },
      onClick: () => console.log("test"),
    },
  ];

  export {
    blogsDummy
  }