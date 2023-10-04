import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Button as MUIButton,
  TextField,
} from "@mui/material"
import Title from "admin/components/Title/Title"
import Wrapper from "admin/components/Wrapper/Wrapper"
import { CrumbTypes } from "admin/pages/Dashboard/types"
import { Formik } from "formik"
import Button from "library/Button/Button"
import FormikTextInput from "library/Formik/FormikInput"
import React, { useContext, useEffect, useState } from "react"
import ReactQuill from "react-quill"
import { useNavigate, useParams } from "react-router-dom"
import ComponentValidator from "library/ComponentValidator/ComponentValidator"
import Spinner from "library/Spinner/Spinner"
import "react-quill/dist/quill.snow.css"
import adminPaths from "admin/constants/routes"
import "./BlogForm.scss"
import useQuillModules from "../useQuillModules"
import blogValidationSchema from "./blogValidationSchema"
import { BlogData, BlogPayload } from "pages/BlogPage/models"
import ErrorText from "pages/PortalRegistration/components/ErrorText"
import MultiSelectInputWithCreate from "library/MultiSelectInput/MultiSelectInputWithCreate"
import { blogTags, metatagKeywords } from "../utils"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import { UserContext } from "admin/context/UserProvider"
import agent from "api/agent"
import { toast } from "react-toastify"
import { paths } from "constants/routes"
import MultiSelectInput from "library/MultiSelectInput/MultiSelectInput"

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: adminPaths.dashboard,
    isActive: false,
  },
  {
    title: "Blog",
    url: adminPaths.adminBlogs,
    isActive: false,
  },
  {
    title: "Manage Blog",
    url: adminPaths.adminBlogs,
    isActive: true,
  },
]

const BlogForm: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setIsLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState("")
  const [author, setAuthor] = useState("")
  const [selfAuthor, setSelfAuthor] = useState(false)
  const userCtx = useContext(UserContext) as any
  const { profile, loading: profileLoading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  )
  const { id: indicator } = useParams()
  const [blog, setBlog] = useState<BlogData | undefined>()

  const [initialValues, setInitialValues] = useState<BlogData>({
    metaTagTitle: "",
    metaTagDescription: "",
    metaTagKeywords: [],
    title: "",
    authorID: "",
    tags: [],
    content: "",
    _id: "",
    thumbnail: "",
    thumbnailAlt: "",
    thumbnailCloudinaryId: "",
  })

  useEffect(() => {
    const fetchSingleData = async () => {
      const data = await agent.BlogAndResource.listSingleById(indicator ?? "")
      setBlog(data)
      setInitialValues({
        _id: data?._id ?? "",
        authorID: data?.userGuid ?? "",
        content: data?.content ?? "",
        title: data?.title ?? "",
        authorName: data?.authorName,
        tags: data?.tags?.map((data: any) => {
          return {
            label: data.label,
            value: data.label,
            keyword: data.label,
          }
        }) as any,
        authorThumbnail: data?.authorThumbnail,
        createdAt: data?.createdAt,
        thumbnail: data?.thumbnail,
        metaTagDescription: data?.metaTagDescription,
        metaTagKeywords: data?.metaTagKeywords?.map((data: any) => {
          return {
            label: data.keyword,
            value: data.keyword,
            keyword: data.keyword,
          }
        }) as any,
        metaTagTitle: data?.metaTagTitle ?? "",
        thumbnailAlt: data?.thumbnailAlt,
        thumbnailCloudinaryId: data?.thumbnailCloudinaryId,
        updatedAt: data?.updatedAt,
      })
      const author = data?.authorName
      setAuthor(author ?? "")
      setIsLoading(false)
      setSelfAuthor(data?.userGuid === profile?.userGuid)
    }

    if (indicator === "add") {
      setInitialValues((prevState) => {
        return {
          ...prevState,
          authorID: profile?.userGuid ?? "",
        }
      })

      const author = !profile?.firstName
        ? profile?.name
        : `${profile?.firstName} ${profile?.lastName}`
      setAuthor(author ?? "")
    } else {
      fetchSingleData()
    }
  }, [profile, indicator])

  const realQuillModules = useQuillModules()
  const validationSchema = blogValidationSchema()

  const pageConfigs = {
    isEditMode: indicator !== "add",
    pageTitle: indicator !== "add" ? "Edit Blog" : "Add Blog",
    subTitle: "All fields (*) are required.",
    hideCheckbox: indicator === "add",
  }

  const backToBlogsHandler = () => {
    navigate(adminPaths.adminBlogs)
  }
  const handleFocusBack = () => {
    setThumbnailPreview("")
    window.removeEventListener("focus", handleFocusBack)
  }
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack)
  }
  const thumbnailChangeHandler = (event, setFieldValue) => {
    setFieldValue("thumbnail", event.currentTarget.files![0])
    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setThumbnailPreview(fileReader.result?.toString() ?? "")
      }
    }
    fileReader.readAsDataURL(event.target.files![0])
    window.removeEventListener("focus", handleFocusBack)
  }

  const submitHandler = async (values: BlogPayload) => {
    setIsLoading(true)

    if (pageConfigs.isEditMode) {
      const res = await agent.BlogAndResource.update(values)
      if (res) {
        toast.info(`Blog Edited`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsLoading(true)
        navigate(paths.adminBlogs)
      }
    } else {
      const res = await agent.BlogAndResource.create(values)
      if (res) {
        toast.info(`Blog Added`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsLoading(true)
        navigate(paths.adminBlogs)
      }
    }
  }

  return (
    <Wrapper breadcrumb={crumbs} error={false} className="blog-form-wrapper">
      {loading || profileLoading ? <Spinner variant="fixed" /> : null}
      <Title title={pageConfigs.pageTitle} subtitle={pageConfigs.subTitle} />
      <div className="blog-light">
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={(values) => submitHandler(values as BlogPayload)}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, handleSubmit, touched }) => {
            const checkHandler = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setSelfAuthor((prevState) => !prevState)

              if (!selfAuthor) {
                setAuthor(`${profile?.firstName} ${profile?.lastName}`)
                setInitialValues((prevState: any) => {
                  return {
                    ...prevState,
                    userGuid: profile?.userGuid,
                    authorID: profile?.userGuid,
                  }
                })
              } else {
                setAuthor(blog?.authorName ?? "")
                setInitialValues((prevState: any) => {
                  return {
                    ...prevState,
                    userGuid: blog?.authorID,
                    authorID: blog?.authorID,
                  }
                })
              }
            }
            return (
              <div className="blog-form">
                <Grid container spacing={2} className="blog-form-container">
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="blog-thumbnail-upload-container"
                  >
                    <h5 className="form-label">Blog Thumbnail</h5>
                    <MUIButton
                      variant="contained"
                      component="label"
                      className="primary-cfs-btn input-file-btn"
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        name="thumbnail"
                        onChange={(event) =>
                          thumbnailChangeHandler(event, setFieldValue)
                        }
                        onClick={clickedFileInput}
                      />
                    </MUIButton>

                    <ComponentValidator showNull={!values.thumbnail}>
                      {thumbnailPreview ||
                      (typeof values.thumbnail === "string" &&
                        values.thumbnail) ? (
                        <div className="blog-img-container">
                          <img
                            src={
                              typeof values.thumbnail === "string"
                                ? values.thumbnail
                                : thumbnailPreview
                            }
                            alt="blog-display-thumbnail"
                          />
                          <div className="alt-input">
                            <h5 className="form-label">Blog Thumbnail Alt</h5>
                            <FormikTextInput
                              name="thumbnailAlt"
                              value={values.thumbnailAlt}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ) : null}
                    </ComponentValidator>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h5 className="form-label">Blog Author</h5>
                    <TextField
                      variant="outlined"
                      fullWidth
                      className="filled-input"
                      type="text"
                      placeholder="Add the author here"
                      disabled
                      value={author}
                    />
                    {pageConfigs?.hideCheckbox ? null : (
                      <FormGroup className="admin-checkbox">
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={checkHandler}
                              checked={selfAuthor}
                              disabled={blog?.userGuid === profile?.userGuid}
                            />
                          }
                          label="Make the author to me"
                        />
                      </FormGroup>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h5 className="form-label">Blog Title</h5>
                    <FormikTextInput
                      name="title"
                      placeholder="Enter the blog title here"
                      value={values.title}
                      variant="outlined"
                      InputLabelProps={{ shrink: !!values.title }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="tags-grid"
                  >
                    <h5 className="form-label">Blog Tags</h5>
                    <MultiSelectInput
                      value={
                        values.tags?.map((data) => {
                          return {
                            label: data.label,
                            value: data.label,
                            keyword: data.label,
                          }
                        }) as any
                      }
                      name="tags"
                      onCreate={(e: any) => {
                        console.log(e)
                        setFieldValue("tags", e)
                      }}
                      onChange={(e: any) => {
                        setFieldValue("tags", e)
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <h5 className="form-label">Blog Content</h5>
                    <ReactQuill
                      value={values.content}
                      modules={realQuillModules}
                      onChange={(value) => setFieldValue("content", value)}
                      theme="snow"
                      placeholder="Enter the blog content here"
                    />
                    <ErrorText
                      isError={!values.content && !!touched.content}
                      text="Content field is required."
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h5 className="form-label">Title Metatag</h5>
                    <FormikTextInput
                      name="metaTagTitle"
                      placeholder="Enter the blog title metatag here"
                      value={values.metaTagTitle}
                      variant="outlined"
                      InputLabelProps={{ shrink: !!values.metaTagTitle }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h5 className="form-label">Description Metatag</h5>
                    <FormikTextInput
                      name="metaTagDescription"
                      value={values.metaTagDescription}
                      variant="outlined"
                      InputLabelProps={{ shrink: !!values.metaTagDescription }}
                      placeholder="Enter the blog description metatag here"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h5 className="form-label">Keywords Metatag</h5>
                    <MultiSelectInput
                      value={
                        values.metaTagKeywords?.map((data) => {
                          return {
                            label: data.keyword,
                            value: data.keyword,
                            keyword: data.keyword,
                          }
                        }) as any
                      }
                      name="metaTagKeywords"
                      onCreate={(e: any) => {
                        console.log(e)
                        setFieldValue("metaTagKeywords", e)
                      }}
                      onChange={(e: any) => {
                        setFieldValue("metaTagKeywords", e)
                      }}
                    />
                  </Grid>
                </Grid>
                <div className="form-footer">
                  <Button
                    variant="default"
                    onClick={() => backToBlogsHandler()}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn-submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )
          }}
        </Formik>
      </div>
    </Wrapper>
  )
}

export default BlogForm
