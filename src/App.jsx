import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products. Please check the server.");
        setLoading(false);
      });
  }, []);

  // Remove duplicate products
  const uniqueProducts = products.filter(
  (product, index, array) =>
    index ===
    array.findIndex(
      (p) =>
        p.name === product.name &&
        p.price === product.price &&
        p.description === product.description
    )
);

  return (
    <div style={styles.page}>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>MERN Internship Task 1</h1>

          <p style={styles.subtitle}>
            Product Management Dashboard
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.container}>

        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Products
          </h2>

          <span style={styles.productCount}>
            {uniqueProducts.length} Products
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.message}>
            <div style={styles.spinner}>⏳</div>

            <h3>Loading Products...</h3>

            <p>
              Please wait while we fetch the products.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={styles.error}>
            <h3>Something went wrong</h3>

            <p>{error}</p>
          </div>
        )}

        {/* No Products */}
        {!loading &&
          !error &&
          uniqueProducts.length === 0 && (
            <div style={styles.message}>
              <div style={styles.emptyIcon}>📦</div>

              <h3>No Products Found</h3>

              <p>
                Add a product to your database to see it here.
              </p>
            </div>
          )}

        {/* Product Cards */}
        {!loading &&
          !error &&
          uniqueProducts.length > 0 && (
            <div style={styles.grid}>

              {uniqueProducts.map((product) => (
                <div
                  style={styles.card}
                  key={product._id}
                >

                  {/* Product Image */}
                  <div style={styles.imageBox}>

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={styles.image}
                      />
                    ) : (
                      <span style={styles.productEmoji}>
                        💻
                      </span>
                    )}

                  </div>

                  {/* Product Information */}
                  <div style={styles.cardBody}>

                    <span style={styles.badge}>
                      PRODUCT
                    </span>

                    <h3 style={styles.productName}>
                      {product.name}
                    </h3>

                    <p style={styles.description}>
                      {product.description}
                    </p>

                    <div style={styles.bottom}>

                      <span style={styles.price}>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}
                      </span>

                      <button style={styles.button}>
                        View Product
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </main>

      {/* Footer */}
      <footer style={styles.footer}>

        <p>
          © 2026 MERN Internship Task 1
        </p>

        <p>
          React • Express • Node.js • MongoDB
        </p>

      </footer>

    </div>
  );
}


// ==============================
// STYLES
// ==============================

const styles = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#1f2937",
  },

  header: {
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    padding: "35px 7%",
    color: "white",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.12)",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "8px 0 0",
    fontSize: "16px",
    opacity: 0.9,
  },

  container: {
    width: "86%",
    maxWidth: "1200px",
    margin: "40px auto",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "26px",
  },

  productCount: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)",
  },

  imageBox: {
    height: "180px",
    backgroundColor: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  productEmoji: {
    fontSize: "70px",
  },

  cardBody: {
    padding: "20px",
  },

  badge: {
    display: "inline-block",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    padding: "5px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  productName: {
    fontSize: "21px",
    margin: "12px 0 8px",
  },

  description: {
    color: "#6b7280",
    lineHeight: "1.5",
    minHeight: "45px",
    margin: 0,
  },

  bottom: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  price: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },

  button: {
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "9px 13px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  message: {
    backgroundColor: "white",
    padding: "60px 20px",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  spinner: {
    fontSize: "35px",
  },

  emptyIcon: {
    fontSize: "50px",
  },

  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
  },

  footer: {
    marginTop: "60px",
    padding: "25px",
    textAlign: "center",
    backgroundColor: "#111827",
    color: "#d1d5db",
    fontSize: "14px",
  },
};

export default App;