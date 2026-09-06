function ProductCard({ product }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <h3>₹{Number(product.price).toLocaleString("en-IN")}</h3>
      <p>{product.description}</p>
      <button>View Product</button>
    </div>
  );
}

export default ProductCard;