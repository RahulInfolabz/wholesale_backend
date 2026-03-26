const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function MyProductInquiries(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const db = await connectDB();
    const collection = db.collection("product_inquiries");

    const inquiries = await collection
      .aggregate([
        { $match: { user_id: new ObjectId(user.session._id) } },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        { $sort: { inquiry_datetime: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Product inquiries fetched successfully",
      data: inquiries,
    });
  } catch (error) {
    console.error("MyProductInquiries.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { MyProductInquiries };
