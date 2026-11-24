const express = require("express");
const app = express();
app.use(express.json());
let products = [
{
id: 1,
name: "Laptop",
price: 50000
},
{
id: 2,
name: "Mobile",
price: 20000
}
];
// GET all products
app.get("/products", (req, res) => {
res.json(products);
});
// POST new product
app.post("/products", (req, res) => {
const { name, price } = req.body;
const product = {
id: products.length + 1,
name: name,
price: price
};
products.push(product);
res.status(201).json({
message: "Product added successfully",
product: product
});
});
// Start server
app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});