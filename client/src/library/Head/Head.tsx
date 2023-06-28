import React from "react";
import Helmet from "react-helmet";

interface HeadProps {
  children?: JSX.Element[];
  title: string;
  canonical: string;
  keywords?: string;
  description: string;
}
const Head: React.FC<HeadProps> = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description}></meta>
      <meta name="keywords" content={props.keywords}></meta>
      <link rel="canonical" href={props.canonical} />

      {props.children}
    </Helmet>
  );
};

export default Head;
