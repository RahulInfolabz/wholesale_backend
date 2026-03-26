const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddProductInquiry(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { product_id, inquiry_message } = req.body;

    if (!product_id || !inquiry_message) {
      return res.status(400).json({
        success: false,
        message: "Product ID and inquiry message are required",
      });
    }

    if (!ObjectId.isValid(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const db = await connectDB();
    const productCollection = db.collection("products");
    const inquiryCollection = db.collection("product_inquiries");

    // Verify product exists
    const productExists = await productCollection.findOne({
      _id: new ObjectId(product_id),
    });

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await inquiryCollection.insertOne({
      user_id: new ObjectId(user.session._id),
      product_id: new ObjectId(product_id),
      inquiry_message,
      inquiry_status: "Pending",
      inquiry_datetime: new Date(),
      response_message: "",
      response_date: null,
    });

    return res.status(201).json({
      success: true,
      message: "Product inquiry submitted successfully",
    });
  } catch (error) {
    console.error("AddProductInquiry.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { AddProductInquiry };
