import express from "express";
import Categorymodel from "../Models/Categorymodel.js";

export const Addcategory = async (req, res) => {
  const { name , maximumloan , Loanperiod } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Please enter a category name" });
  }

  try {
    const newCategory = new Categorymodel({ name , maximumloan , Loanperiod });
    const savedCategory = await newCategory.save();
    res
      .status(200)
      .json({ msg: "Category added successfully", category: savedCategory });
  } catch (error) {
    console.error("Error while adding category:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Categorymodel.find();
    res.status(200).json({ msg: "Categories fetched successfully", category });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getsinglecategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categorymodel.findById(id).populate("subcategories");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
