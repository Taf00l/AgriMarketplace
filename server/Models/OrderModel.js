import mongoose from "mongoose";

// تعريف المخطط الخاص بعناصر الطلب
const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // مع مرجعية إلى النموذج Product
    required: true,
  },
  pcode: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// تعريف المخطط الخاص بالطلب
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // مع مرجعية إلى النموذج User
    required: true,
  },
  items: [OrderItemSchema], // قائمة العناصر التي تم شراؤها
  totalPrice: {
    type: Number,
    required: true,
    default: 0, // يمكن تعديل القيمة الافتراضية لاحقاً عند حفظ الطلب
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending", // حالة الطلب الافتراضية هي "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now, // تاريخ إنشاء الطلب
  },
  updatedAt: {
    type: Date,
    default: Date.now, // تاريخ آخر تحديث للطلب
  },
});

// إضافة Hook لحساب الإجمالي قبل حفظ الطلب
OrderSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0); // حساب الإجمالي
  this.updatedAt = Date.now(); // تحديث تاريخ آخر تعديل
  next(); // استدعاء next للسماح بإكمال عملية الحفظ
});

// إنشاء النموذج من المخطط
const OrderModel = mongoose.model("orderinfos", OrderSchema);

export default OrderModel;
