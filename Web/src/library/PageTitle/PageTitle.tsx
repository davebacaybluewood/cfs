import React, { useEffect } from "react";

interface IPageTitle {
  title: string;
}
const PageTitle: React.FC<IPageTitle> = (props) => {
  useEffect(() => {
    document.title = props.title + " - " + "Comfort Financial Solutions";
  }, [props.title]);

  return <React.Fragment />;
};

PageTitle.defaultProps = {
  title: "Comfort Financial Solutions",
};

export default PageTitle;
