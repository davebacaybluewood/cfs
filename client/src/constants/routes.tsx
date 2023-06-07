import NotFound from "layout/NotFound/NotFound";
import AboutUs from "pages/AboutUs/AboutUs";
import AgentSupport from "pages/AgentSupport/AgentSupport";
import BlogPage from "pages/BlogPage/BlogPage";
import BusinessProtection from "pages/BusinessProtection/BusinessProtection";
import ContactPage from "pages/ContactPage/ContactPage";
import FamilyProtection from "pages/FamilyProtection/FamilyProtection";
import Home from "pages/Home/Home";
import SingleBlogPage from "pages/SingleBlogPage/SingleBlogPage";
import Solutions from "pages/Solutions/Solutions";
import { RouteProps } from "react-router-dom";

type ReactRoutesType = RouteProps & {
  showFooter?: boolean;
  showNavbar?: boolean;
  showHeadline?: boolean;
  theme?: "SKY" | "RED" | "NAVY";
};

const paths = {
  index: "/",
  home: "/home",
  family_protection: "/family-protection",
  business_protection: "/business-protection",
  agent_support: "/agent-support",
  contact_us: "/contact_us",
  about_us: "/about-us",
  solutions: "/solutions",
  resources: "/blogs-resources",
  single_blog: "/blogs-resources/:blogId",
  invalid: "/invalid",
};

const REACT_ROUTES: ReactRoutesType[] = [
  {
    element: <Home key="main-index" />,
    path: paths.index,
  },
  {
    element: <Home key="index" />,
    path: paths.home,
  },
  {
    element: <FamilyProtection />,
    path: paths.family_protection,
  },
  {
    element: <BusinessProtection />,
    path: paths.business_protection,
    showHeadline: false,
    theme: "SKY",
  },
  {
    element: <AgentSupport />,
    path: paths.agent_support,
    showHeadline: false,
    theme: "RED",
  },
  {
    element: <BlogPage />,
    path: paths.resources,
  },
  {
    element: <AboutUs />,
    path: paths.about_us,
  },
  {
    element: <Solutions />,
    path: paths.solutions,
  },
  {
    element: <ContactPage />,
    path: paths.contact_us,
  },
  {
    element: <SingleBlogPage />,
    path: paths.single_blog,
    showNavbar: true,
    showHeadline: false,
    showFooter: true,
  },
  {
    element: <NotFound />,
    path: "*",
    showNavbar: false,
    showHeadline: false,
    showFooter: false,
  },
  {
    element: <NotFound />,
    path: paths.invalid,
    showHeadline: false,
    showFooter: false,
  },
];

export { paths, REACT_ROUTES };
