import { useMemo } from "react";

const useQuillModules = () => {
  const realQuillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["code-block"],
          ["link"],
        ],
        handlers: {},
      },
    }),
    []
  );

  return realQuillModules;
};

export default useQuillModules;
