const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetProducts(req, res) {
  try {
    const { category_id, brand_id, min_price, max_price, availability_status } =
      req.query;

    const db = await connectDB();
    const collection = db.collection("products");

    // Build match stage
    const matchStage = { status: "Active" };

    if (category_id && ObjectId.isValid(category_id)) {
      matchStage.category_id = new ObjectId(category_id);
    }

    if (brand_id && ObjectId.isValid(brand_id)) {
      matchStage.brand_id = new ObjectId(brand_id);
    }

    if (min_price || max_price) {
      matchStage.price = {};
      if (min_price) matchStage.price.$gte = parseFloat(min_price);
      if (max_price) matchStage.price.$lte = parseFloat(max_price);
    }

    if (availability_status) {
      matchStage.availability_status = availability_status;
    }

    const products = await collection
      .aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "brands",
            localField: "brand_id",
            foreignField: "_id",
            as: "brand",
          },
        },
        { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
        { $sort: { created_at: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("GetProducts.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetProducts };
