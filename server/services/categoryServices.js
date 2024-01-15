import mongoose from "mongoose";
import Categories from "../models/categoriesModel.js";

const getAllCategoriesByUserGuid = async (userGuid) => {
  try {
    const data = await Categories.find({ userGuid });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createCategory = async (body) => {
  const { name, userGuid, isPublic } = body;

  const isCategoryExist = await Categories.find({
    name,
    userGuid,
  });

  if (isCategoryExist.length > 0) {
    return {
      error: "category_validation",
      description: "[Category] Category name exists",
    };
  }

  try {
    const data = await Categories.create({
      name,
      isPublic,
      userGuid,
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const data = await Categories.deleteOne({
      _id: mongoose.Types.ObjectId(categoryId),
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  getAllCategoriesByUserGuid,
  deleteCategory,
  createCategory,
};
