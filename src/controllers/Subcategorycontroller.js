import Subcategory from "../Models/Subcategories.js"; // Import Subcategory model
import Category from "../Models/Categorymodel.js"; // Correct import for Category model

const AddSubcategory = async (req, res) => {
  const { name, categoryId } = req.body; // Get name and categoryId from the request body

  if (!name || !categoryId) {
    return res
      .status(400)
      .json({ message: "Name and categoryId are required" });
  }

  try {
    const newSubcategory = new Subcategory({
      name,
      categoryId,
    });

    await newSubcategory.save();

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories.push(newSubcategory._id);

    await category.save();

    return res.status(201).json({
      message: "Subcategory added successfully",
      subcategory: newSubcategory,
      category: category,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default AddSubcategory;
