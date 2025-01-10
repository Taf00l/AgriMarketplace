import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";
import path from "path";
import PostModel from "./Models/Posts.js";
import * as ENV from "./config.js";
import ProductModel from "./Models/ProductModel.js";
import CartModel from "./Models/CartModel.js";
import OrderModel from "./Models/OrderModel.js";
import cookieParser from "cookie-parser";

//Middleware
const app = express(); // تعريف `app` أولاً

const corsOptions = {
  origin: ENV.CLIENT_URL, //client URL local
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

// استخدام middleware بعد تعريف `app`
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.DB_APP_NAME}`;

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Serve static files from the 'uploads' directory
// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the current file path
const __dirname = dirname(__filename);
// Set up middleware to serve static files from the 'uploads' directory
// Requests to '/uploads' will serve files from the local 'uploads' folder
app.use("/uploads", express.static(__dirname + "/uploads"));
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
// Create multer instance
const upload = multer({ storage: storage });
app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const birthday = req.body.birthday;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      birthday: birthday,
      password: hashedpassword,
    });

    await user.save();

    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //using destructuring

    //search the user

    const user = await UserModel.findOne({ email: email });

    //if not found

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //if everything is ok, send the user and message

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST API-logout

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//Update Profile

app.put(
  "/updateUserProfile/:email/",
  upload.single("profilePic"),
  async (req, res) => {
    const email = req.params.email; // استلام البريد الإلكتروني من المسار
    const { name, phoneNumber, birthday, password } = req.body; // استلام الحقول من الطلب

    try {
      // البحث عن المستخدم باستخدام البريد الإلكتروني
      const userToUpdate = await UserModel.findOne({ email: email });

      // التحقق إذا لم يتم العثور على المستخدم
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      // Check if a file was uploaded and get the filename

      let profilePic = null;

      if (req.file) {
        profilePic = req.file.filename; // Filename of uploaded file

        // Update profile picture if a new one was uploaded but delete first the old image

        if (userToUpdate.profilePic) {
          const oldFilePath = path.join(
            __dirname,

            "uploads",

            userToUpdate.profilePic
          );

          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Old file deleted successfully");
            }
          });

          userToUpdate.profilePic = profilePic; // Set new profile picture path
        }
      } else {
        console.log("No file uploaded");
      }

      // تحديث الاسم
      userToUpdate.name = name;

      // تحديث رقم الهاتف
      userToUpdate.phoneNumber = phoneNumber;

      // تحديث تاريخ الميلاد
      userToUpdate.birthday = birthday;

      // تحديث كلمة المرور
      if (password !== userToUpdate.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword;
      } else {
        userToUpdate.password = password; // Keep the same password if unchanged
      }

      // حفظ التغييرات في قاعدة البيانات
      await userToUpdate.save();

      // إرسال المستخدم المحدث كاستجابة
      res.json({ user: userToUpdate, msg: "Profile updated successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the profile." });
    }
  }
);

//POST API - savePost

app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const category = req.body.category;
    const email = req.body.email;
    const name = req.body.name;

    const post = new PostModel({
      postMsg: postMsg,
      category: category,
      email: email,
      name: name,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
//get Feedback

//GET API - getPost

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "An error occurred" });
  }
});
// DELETE API - deletePost
app.delete("/deletePost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userEmail = req.body.email;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.email !== userEmail) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err); // More detailed error logging
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});

//Display
//GET API - getUsers

app.get("/getUsers", async (req, res) => {
  try {
    // Fetch all users from the "UserModel" collection, sorted by name in descending order
    const users = await UserModel.find({}).sort({ name: 1 });
    const usersCount = await UserModel.countDocuments({});
    res.send({ users: users, count: usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
//Delete Users
app.delete("/deleteUser/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});
//GET API - for retrieving a single user

app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by _id

    const user = await UserModel.findById(id);

    res.send({ user: user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "An error occurred" });
  }
});
app.put("/updateUserProfile/:email", async (req, res) => {
  const email = req.params.email;
  const { name, password, userType, phoneNumber } = req.body;

  try {
    const userToUpdate = await UserModel.findOne({ email: email });
    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // تحديث البيانات
    userToUpdate.name = name;
    if (userType) userToUpdate.userType = userType;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }
    if (phoneNumber) userToUpdate.phoneNumber = phoneNumber; // تحديث رقم الهاتف إذا تم توفيره

    await userToUpdate.save();
    res.json({ user: userToUpdate, msg: "Profile updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile." });
  }
});

//Product

//POST API - add Product
app.post("/addProduct", async (req, res) => {
  try {
    const pcode = req.body.pcode;
    const desc = req.body.desc;
    const price = req.body.price;
    const image = req.body.image;
    const stocks = req.body.stocks;

    // استخدام ProductModel بدلاً من PostModel
    const product = new ProductModel({
      pcode: pcode,
      desc: desc,
      price: price,
      image: image,
      stocks: stocks,
    });

    await product.save();
    res.send({ product: product, msg: "Added." }); // إرسال المنتج المضاف إلى العميل
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET API - getProducts
app.get("/getProducts", async (req, res) => {
  try {
    const products = await ProductModel.find({}).sort({ pcode: 1 });

    const countProducts = await ProductModel.countDocuments({});

    res.send({ products: products, count: countProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/deleteProduct/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
});

//GET API - for retrieving a single product
app.get("/getProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Find the product by _id
    const product = await ProductModel.findById(id);
    res.send({ product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//POST API - add Product
app.put("/updateProduct/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pcode = req.body.pcode;
    const desc = req.body.desc;
    const price = req.body.price;
    const image = req.body.image;
    const stocks = req.body.stocks;

    // Find the product by email in the database
    const productToUpdate = await ProductModel.findOne({ _id: id });

    // If the product is not found, return a 404 error
    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    productToUpdate.pcode = pcode;
    productToUpdate.desc = desc;
    productToUpdate.price = price;
    productToUpdate.image = image;
    productToUpdate.stocks = stocks;

    await productToUpdate.save();
    res.send({ product: productToUpdate, msg: "Product Update." }); //send to the client the JSON object
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

/*CART APIS */

// Add item to cart
// إضافة عنصر إلى السلة في الخادم
app.post("/addToCart", async (req, res) => {
  const { userId, productId, quantity } = req.body; // استقبال البيانات من العميل
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // التحقق من المخزون
    if (product.stocks < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    product.stocks -= quantity;
    await product.save();

    // البحث أو إنشاء سلة جديدة للمستخدم
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    // تحديث السلة إذا كان العنصر موجودًا
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * product.price;
    } else {
      cart.items.push({
        productId: product._id,
        pcode: product.pcode,
        desc: product.desc,
        price: product.price,
        image: product.image,
        quantity: quantity,
        total: product.price * quantity,
      });
    }

    await cart.save(); // حفظ السلة المحدثة في قاعدة البيانات
    res.status(200).json({ cart, message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// الخروج من السلة (إتمام عملية الشراء)
// الخادم (Node.js/Express)

//GET API - getCart
app.get("/getCart/:userId", async (req, res) => {
  const { userId } = req.params; // Get userId from route parameters

  try {
    const cart = await CartModel.findOne({ userId: userId });

    // Count the total number of items in the cart
    const itemCount = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Send the cart data along with the item count
    res.send({ cart: cart, count: itemCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/deleteCartItem/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    // Find the cart that contains the item
    const cart = await CartModel.findOne({ "items._id": itemId });

    if (!cart) {
      return res.status(404).json({ error: "Cart Item not found" });
    }

    // Find the item to be removed
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Cart Item not found in the cart" });
    }

    // Update the total price
    const item = cart.items[itemIndex];
    cart.totalPrice -= item.total;

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Fetch product details
    const product = await ProductModel.findById(item.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product stock (increase by the quantity removed)
    product.stocks += item.quantity;
    await product.save();

    // Save the updated cart
    await cart.save();

    res.status(200).json({ msg: "Cart item deleted successfully", cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the cart item" });
  }
});

//checkout
app.post("/checkout", async (req, res) => {
  const { userId } = req.body; // الحصول على معرّف المستخدم من الطلب
  try {
    // البحث عن سلة التسوق الخاصة بالمستخدم
    const cart = await CartModel.findOne({ userId });

    // التأكد من أن السلة تحتوي على عناصر
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // إنشاء طلب جديد باستخدام OrderModel
    const order = new OrderModel({
      userId: cart.userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });

    await order.save(); // حفظ الطلب في قاعدة البيانات

    // مسح السلة بعد إتمام الشراء
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    // إرسال تفاصيل الطلب التي تم إنشاؤها إلى الواجهة الأمامية
    res.status(200).json({
      message: "Order placed successfully",
      order, // إرجاع تفاصيل الطلب
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Grt all Carts
app.get("/getAllCarts", async (req, res) => {
  try {
    const carts = await OrderModel.find(); // استرجاع سلات جميع العملاء من قاعدة البيانات
    res.json(carts); // إرجاع سلات العملاء
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/deleteCart/:cartId", async (req, res) => {
  const { cartId } = req.params;

  try {
    // البحث عن السلة في قاعدة البيانات وحذفها
    const deletedCart = await OrderModel.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).send("Cart not found");
    }

    res.status(200).send("Cart deleted successfully");
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).send("Server error");
  }
});
const port = ENV.PORT || 3001;

app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
