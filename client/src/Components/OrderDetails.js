const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // جلب تفاصيل الطلب بناءً على الـ orderId
    axios
      .get(`http://localhost:3001/checkout/${orderId}`)
      .then((response) => {
        setOrder(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

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
