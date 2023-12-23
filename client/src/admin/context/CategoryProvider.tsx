import { CategoryData } from "admin/api/categoryServices/categoryModels";
import { createContext, useMemo, useState } from "react";

type categoriesType = {
  categories: CategoryData[] | undefined;
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryData[] | undefined>
  >;
};
export const CategoryContext = createContext<categoriesType>({
  categories: undefined,
  setCategories: () => {},
});

export const CategoryProvider: React.FC<{
  children: JSX.Element | React.ReactNode;
}> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryData[] | undefined>();

  const memoized = useMemo(
    () => ({
      categories,
      setCategories,
    }),
    [categories, setCategories]
  );

  return (
    <CategoryContext.Provider value={memoized}>
      {children}
    </CategoryContext.Provider>
  );
};
