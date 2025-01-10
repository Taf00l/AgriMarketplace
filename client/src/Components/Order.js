import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "reactstrap";
import { useParams } from "react-router-dom"; // استيراد useParams لاستخراج الـ orderId من الـ URL
import * as ENV from "../config";
const Order = () => {
  const { orderId } = useParams(); // استخراج orderId من الـ URL
  const [order, setOrder] = useState(null); // حالة لتخزين بيانات الطلب
  const [loading, setLoading] = useState(true); // حالة لتحديد ما إذا كانت البيانات لا تزال تحميل

  useEffect(() => {
    if (orderId) {
      // جلب تفاصيل الطلب بناءً على orderId من الخادم
      axios
        .get(`${ENV.SERVER_URL}/checkout/${orderId}`) // API لجلب تفاصيل الطلب
        .then((response) => {
          setOrder(response.data.order); // تعيين بيانات الطلب في الحالة
          setLoading(false); // بعد استلام البيانات، تغيير حالة التحميل إلى false
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
          setLoading(false); // حتى لو حدث خطأ، تغيير حالة التحميل
        });
    }
  }, [orderId]); // تحديث الحالة عندما يتغير orderId

  // إذا كانت البيانات لا تزال في حالة تحميل
  if (loading) return <p>Loading...</p>;

  // إذا لم يتم العثور على الطلب
  if (!order) return <p>Order not found.</p>;

  return (
    <Container>
      <h3>Order Details</h3>
      <Table>
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item._id}>
              <td>{item.pcode}</td>
              <td>{item.desc}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-end">
              <strong>Total Price:</strong>
            </td>
            <td>
              <strong>{order.totalPrice}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Order;
