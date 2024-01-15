import { requests } from "../agent";
import { CategoryData, CategoryDefaultMessage } from "./categoryModels";

const Categories = {
  getAllCategoriesByUserGuid: (userGuid: string) => {
    try {
      const res = requests.get<CategoryData[] | undefined>(
        `/api/categories/${userGuid}/`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  createCategory: async (
    name: string,
    userGuid: string,
    isPublic?: boolean | undefined
  ) => {
    try {
      const res = requests.post<CategoryData>(`/api/categories/${userGuid}`, {
        name,
        isPublic,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      await requests.del<CategoryDefaultMessage>(
        `/api/categories/${categoryId}/single`
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  Categories,
};
