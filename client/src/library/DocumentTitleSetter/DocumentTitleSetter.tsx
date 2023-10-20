import { useEffect } from "react";

function DocumentTitleSetter({ title }) {
  useEffect(() => {
    document.title = title;

    // Reset the document title when the component unmounts
    return () => {
      document.title = "Comfort Financial Solutions";
    };
  }, [title]);

  return null; // This component doesn't render anything
}

export default DocumentTitleSetter;
