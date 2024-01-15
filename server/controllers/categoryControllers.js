import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import categoryServices from "../services/categoryServices.js";

const getAllCategoriesByUserGuid = async (req, res, next) => {
  try {
    const categories = await categoryServices.getAllCategoriesByUserGuid(
      req.params.userGuid
    );
    if (categories) {
      res.json(categories);
    } else {
      res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
  }
};

const createCategory = async (req, res, next) => {
  const { name, isPublic } = req.body;
  const { userGuid } = req.params;

  if (!name || !userGuid) {
    res.status(400).json(API_RES_FAIL("[Categories] Fields are required"));
    return;
  }

  const body = {
    isPublic,
    userGuid,
    name,
  };

  try {
    const category = await categoryServices.createCategory(body);

    if (category?.error) {
      res.status(400).json(category);
      return;
    }

    if (category) {
      res.json(category);
    } else {
      res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).json(API_RES_FAIL("[Categories] Fields are required"));
    return;
  }

  try {
    const category = await categoryServices.deleteCategory(categoryId);
    if (category) {
      res.json(API_RES_OK("[Categories] Category has been deleted"));
    } else {
      res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Categories] Error Occured"));
  }
};

export default {
  getAllCategoriesByUserGuid,
  createCategory,
  deleteCategory,
};
