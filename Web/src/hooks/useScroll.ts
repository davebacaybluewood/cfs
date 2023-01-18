import { useEffect } from "react";

const useScroll = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1
    );
    if (window.location.href.lastIndexOf("#") > 0) {
      document.getElementById(href)?.scrollIntoView();
    } else {
      return;
    }
  }, [window]);
};

export default useScroll;
