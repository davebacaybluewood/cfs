import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;

    // Reset the document title when the component unmounts
    return () => {
      document.title = "Comfort Financial Solutions";
    };
  }, [title]);
}

export default useDocumentTitle;
