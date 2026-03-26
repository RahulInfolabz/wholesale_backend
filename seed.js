const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "wholesale_platform";

async function seed() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);

  console.log("🌱 Starting seed...");

  // ── Clear existing data ───────────────────────────────────────────────────
  await db.collection("users").deleteMany({});
  await db.collection("categories").deleteMany({});
  await db.collection("brands").deleteMany({});
  await db.collection("products").deleteMany({});
  await db.collection("product_inquiries").deleteMany({});
  await db.collection("general_inquiries").deleteMany({});
  await db.collection("feedbacks").deleteMany({});

  console.log("🗑️  Cleared existing collections");

  // ── Users ─────────────────────────────────────────────────────────────────
  const usersResult = await db.collection("users").insertMany([
    {
      full_name: "Admin User",
      email: "admin@wholesale.com",
      password: "Admin@123",
      mobile_no: "9900000001",
      address: "123, Business Hub, Ahmedabad",
      city: "Ahmedabad",
      state: "Gujarat",
      profile_image: "https://i.pravatar.cc/150?img=1",
      role: "Admin",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Vikram Shah",
      email: "vikram@gmail.com",
      password: "Vikram@123",
      mobile_no: "9900000002",
      address: "45, Ring Road, Surat",
      city: "Surat",
      state: "Gujarat",
      profile_image: "https://i.pravatar.cc/150?img=2",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Meera Joshi",
      email: "meera@gmail.com",
      password: "Meera@123",
      mobile_no: "9900000003",
      address: "78, Commerce Zone, Rajkot",
      city: "Rajkot",
      state: "Gujarat",
      profile_image: "https://i.pravatar.cc/150?img=3",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const userIds = Object.values(usersResult.insertedIds);
  console.log("✅ Users seeded");

  // ── Categories ────────────────────────────────────────────────────────────
  const categoriesResult = await db.collection("categories").insertMany([
    {
      category_name: "Electronics",
      category_description:
        "Wholesale electronic goods including mobiles, laptops, accessories, and home appliances.",
      category_image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Textiles & Clothing",
      category_description:
        "Bulk clothing, fabrics, and textile products for retailers and resellers.",
      category_image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Home & Kitchen",
      category_description:
        "Wholesale home appliances, kitchenware, furniture, and household essentials.",
      category_image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Industrial Tools",
      category_description:
        "Heavy-duty industrial tools, machinery parts, and equipment for manufacturing units.",
      category_image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Food & Beverages",
      category_description:
        "Bulk food items, packaged goods, beverages, and FMCG products for retailers.",
      category_image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_name: "Stationery & Office",
      category_description:
        "Office supplies, stationery items, paper products, and business essentials in bulk.",
      category_image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const categoryIds = Object.values(categoriesResult.insertedIds);
  console.log("✅ Categories seeded");

  // ── Brands ────────────────────────────────────────────────────────────────
  const brandsResult = await db.collection("brands").insertMany([
    {
      brand_name: "TechForce",
      brand_description:
        "Leading manufacturer of consumer electronics and digital accessories.",
      brand_image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      brand_name: "FabricPlus",
      brand_description:
        "Premium textile brand offering high-quality fabrics and readymade garments in bulk.",
      brand_image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      brand_name: "HomeEssentials",
      brand_description:
        "Trusted brand for household products, kitchen appliances, and home décor.",
      brand_image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      brand_name: "ProTools India",
      brand_description:
        "Industrial tools and hardware manufacturer serving factories and construction companies.",
      brand_image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      brand_name: "NatureFresh",
      brand_description:
        "Bulk food and beverage brand offering natural, organic, and packaged food products.",
      brand_image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
      status: "Active",
      created_at: new Date(),
    },
    {
      brand_name: "OfficeEdge",
      brand_description:
        "Complete stationery and office supply brand for businesses and educational institutions.",
      brand_image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const brandIds = Object.values(brandsResult.insertedIds);
  console.log("✅ Brands seeded");

  // ── Products ──────────────────────────────────────────────────────────────
  const productsResult = await db.collection("products").insertMany([
    {
      category_id: categoryIds[0], // Electronics
      brand_id: brandIds[0], // TechForce
      product_name: "TechForce Wireless Earbuds TWS-200",
      product_description:
        "High-quality true wireless stereo earbuds with active noise cancellation, 24-hour battery life, and IPX5 water resistance. Ideal for retail and online reselling.",
      price: 850.0,
      min_order_qty: 50,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
      specifications:
        "Driver: 10mm | Battery: 600mAh | Connectivity: Bluetooth 5.2 | Weight: 58g | Color: Black/White",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[0], // Electronics
      brand_id: brandIds[0], // TechForce
      product_name: "TechForce USB-C Fast Charger 65W",
      product_description:
        "GaN-based 65W USB-C fast charger compatible with laptops, tablets, and smartphones. Compact design for bulk distribution to electronic stores.",
      price: 420.0,
      min_order_qty: 100,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
      specifications:
        "Output: 65W PD | Ports: 1x USB-C | Input: 100-240V | Dimensions: 45x45x30mm | Certification: BIS",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Textiles
      brand_id: brandIds[1], // FabricPlus
      product_name: "FabricPlus Pure Cotton Kurta Set",
      product_description:
        "Premium pure cotton kurta sets for men, available in assorted colors and sizes. Suitable for festive and casual wear. Ideal for garment retailers.",
      price: 380.0,
      min_order_qty: 200,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600",
      specifications:
        "Material: 100% Cotton | GSM: 180 | Sizes: S/M/L/XL/XXL | Colors: 10 assorted | MOQ: 200 pcs",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Textiles
      brand_id: brandIds[1], // FabricPlus
      product_name: "FabricPlus Polyester Saree Collection",
      product_description:
        "Elegant polyester sarees with designer prints, suitable for retail distribution across women's clothing stores and online sellers.",
      price: 520.0,
      min_order_qty: 100,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
      specifications:
        "Material: Polyester Silk | Length: 5.5m | Blouse: Included | Prints: Digital/Floral | MOQ: 100 pcs",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Home & Kitchen
      brand_id: brandIds[2], // HomeEssentials
      product_name: "HomeEssentials Stainless Steel Cookware Set",
      product_description:
        "5-piece stainless steel cookware set including frying pan, saucepan, and kadhai. Premium quality suitable for home use and gifting.",
      price: 1250.0,
      min_order_qty: 30,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
      specifications:
        "Material: 304 Stainless Steel | Pieces: 5 | Induction Compatible: Yes | Weight: 3.2kg | Warranty: 2 years",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Home & Kitchen
      brand_id: brandIds[2], // HomeEssentials
      product_name: "HomeEssentials Non-Stick Tawa 30cm",
      product_description:
        "PFOA-free non-stick tawa with ergonomic handle and heat-resistant coating. High demand in kitchen retail and gifting segments.",
      price: 320.0,
      min_order_qty: 50,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600",
      specifications:
        "Diameter: 30cm | Coating: 3-layer PFOA-free | Handle: Bakelite | Induction: Yes | Weight: 850g",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Industrial Tools
      brand_id: brandIds[3], // ProTools India
      product_name: "ProTools Heavy Duty Drill Machine 13mm",
      product_description:
        "Professional 750W corded drill machine with 13mm keyless chuck, variable speed control, and reverse function. For construction and industrial use.",
      price: 2800.0,
      min_order_qty: 10,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600",
      specifications:
        "Power: 750W | Chuck: 13mm Keyless | Speed: 0-3000 RPM | Weight: 2.1kg | Warranty: 1 year",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Industrial Tools
      brand_id: brandIds[3], // ProTools India
      product_name: "ProTools Combination Spanner Set 12pc",
      product_description:
        "Chrome vanadium steel combination spanner set with 12 pieces ranging from 8mm to 32mm. Ideal for workshops, garages, and industrial units.",
      price: 950.0,
      min_order_qty: 20,
      availability_status: "Out of Stock",
      product_images:
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600",
      specifications:
        "Material: Chrome Vanadium Steel | Pieces: 12 | Sizes: 8-32mm | Finish: Mirror Polish | Case: Included",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[4], // Food & Beverages
      brand_id: brandIds[4], // NatureFresh
      product_name: "NatureFresh Cold Pressed Groundnut Oil 1L",
      product_description:
        "Pure cold-pressed groundnut oil extracted without chemicals or heat. Rich in nutrients, ideal for retail distribution in grocery and supermarkets.",
      price: 185.0,
      min_order_qty: 500,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600",
      specifications:
        "Volume: 1 Litre | Process: Cold Pressed | Packaging: PET Bottle | Shelf Life: 12 months | FSSAI: Yes",
      status: "Active",
      created_at: new Date(),
    },
    {
      category_id: categoryIds[5], // Stationery
      brand_id: brandIds[5], // OfficeEdge
      product_name: "OfficeEdge A4 Copier Paper 500 Sheets",
      product_description:
        "Premium A4 80 GSM copier paper for laser and inkjet printers, photocopiers, and fax machines. Bulk packs for offices, schools, and printing shops.",
      price: 280.0,
      min_order_qty: 100,
      availability_status: "In Stock",
      product_images:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600",
      specifications:
        "Size: A4 (210x297mm) | GSM: 80 | Sheets: 500 per ream | Brightness: 102% | ISO Certified: Yes",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const productIds = Object.values(productsResult.insertedIds);
  console.log("✅ Products seeded");

  // ── Product Inquiries ─────────────────────────────────────────────────────
  await db.collection("product_inquiries").insertMany([
    {
      user_id: userIds[1], // Vikram
      product_id: productIds[0], // TWS Earbuds
      inquiry_message:
        "We need 500 units of TWS-200 earbuds for our electronics retail chain. Can you provide a bulk discount and delivery timeline?",
      inquiry_status: "Responded",
      inquiry_datetime: new Date("2025-11-10"),
      response_message:
        "For 500 units we can offer a 12% bulk discount. Delivery within 7 working days. Please share your GST number to proceed.",
      response_date: new Date("2025-11-11"),
    },
    {
      user_id: userIds[2], // Meera
      product_id: productIds[2], // Cotton Kurta Set
      inquiry_message:
        "Interested in ordering 500 kurta sets for our boutique chain. Do you offer customised embroidery or printing options?",
      inquiry_status: "Pending",
      inquiry_datetime: new Date(),
      response_message: "",
      response_date: null,
    },
    {
      user_id: userIds[1], // Vikram
      product_id: productIds[4], // Cookware Set
      inquiry_message:
        "Looking for 100 cookware sets for Diwali gifting season. Can you provide custom gift packaging with our brand name?",
      inquiry_status: "Responded",
      inquiry_datetime: new Date("2025-10-15"),
      response_message:
        "Yes, custom gift packaging is available for orders above 50 sets. Branding charges apply. Lead time is 10 days.",
      response_date: new Date("2025-10-16"),
    },
    {
      user_id: userIds[2], // Meera
      product_id: productIds[9], // A4 Paper
      inquiry_message:
        "We require 1000 reams of A4 paper monthly for our printing business. What are the long-term supply terms?",
      inquiry_status: "Pending",
      inquiry_datetime: new Date(),
      response_message: "",
      response_date: null,
    },
  ]);

  console.log("✅ Product Inquiries seeded");

  // ── General Inquiries ─────────────────────────────────────────────────────
  await db.collection("general_inquiries").insertMany([
    {
      user_id: userIds[1], // Vikram
      inquiry_subject: "New Category — Mobile Accessories",
      inquiry_message:
        "I am looking for wholesale mobile accessories like phone covers, screen guards, and charging cables. Do you have these in bulk?",
      inquiry_datetime: new Date("2025-11-18"),
      status: "Pending",
    },
    {
      user_id: userIds[2], // Meera
      inquiry_subject: "Export Orders",
      inquiry_message:
        "We are interested in exporting your textile products to UAE and UK markets. Do you handle international wholesale orders?",
      inquiry_datetime: new Date("2025-11-22"),
      status: "Pending",
    },
  ]);

  console.log("✅ General Inquiries seeded");

  // ── Feedbacks ─────────────────────────────────────────────────────────────
  await db.collection("feedbacks").insertMany([
    {
      user_id: userIds[1], // Vikram
      feedback_message:
        "Excellent wholesale platform. Found exactly what I needed. The product specifications and pricing are very transparent.",
      rating: 5,
      feedback_datetime: new Date("2025-11-20"),
    },
    {
      user_id: userIds[2], // Meera
      feedback_message:
        "Very easy to navigate. Loved the filter options by category and brand. Would love to see more textile products listed.",
      rating: 4,
      feedback_datetime: new Date("2025-11-25"),
    },
    {
      user_id: userIds[1], // Vikram
      feedback_message:
        "Inquiry response was quick and professional. Great experience overall. Will definitely recommend to other buyers.",
      rating: 5,
      feedback_datetime: new Date("2025-12-02"),
    },
  ]);

  console.log("✅ Feedbacks seeded");

  console.log("\n🎉 Seed completed successfully!");
  console.log("────────────────────────────────────────────");
  console.log("👤 Admin   → admin@wholesale.com  / Admin@123");
  console.log("👤 User 1  → vikram@gmail.com     / Vikram@123");
  console.log("👤 User 2  → meera@gmail.com      / Meera@123");
  console.log("────────────────────────────────────────────");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
