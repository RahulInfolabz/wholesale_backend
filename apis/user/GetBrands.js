const connectDB = require("../../db/dbConnect");

async function GetBrands(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("brands");

    const brands = await collection
      .find({ status: "Active" })
      .sort({ brand_name: 1 })
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    console.error("GetBrands.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetBrands };
