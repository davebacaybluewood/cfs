import React from "react";

type LinkType = {
  link: string;
  text: string | JSX.Element;
};
interface GridLinksProps {
  title: string;
  links: LinkType[];
}
const GridLinks: React.FC<GridLinksProps> = (props) => {
  return (
    <React.Fragment>
      <h5>{props.title}</h5>
      <ul>
        {props.links.map((data) => {
          return (
            <li>
              <a href={data.link}>{data.text}</a>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default GridLinks;
