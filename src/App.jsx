import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);

        // Temporary product for displaying the project
        setProducts([
          {
            _id: "1",
            name: "Laptop",
            price: 50000,
            description: "Dell i5 Laptop",
          },
        ]);

        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>MERN Internship Task 1</h1>
        <p style={styles.subtitle}>
          Product Management Dashboard
        </p>
      </header>

      <main style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Products</h2>

          <span style={styles.productCount}>
            {products.length} Products
          </span>
        </div>

        {loading ? (
          <div style={styles.message}>
            <div style={styles.spinner}>⏳</div>
            <h3>Loading Products...</h3>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div style={styles.card} key={product._id}>
                <div style={styles.imageBox}>
                  <span style={styles.productEmoji}>💻</span>
                </div>

                <div style={styles.cardBody}>
                  <span style={styles.badge}>PRODUCT</span>

                  <h3 style={styles.productName}>
                    {product.name}
                  </h3>

                  <p style={styles.description}>
                    {product.description}
                  </p>

                  <div style={styles.bottom}>
                    <span style={styles.price}>
                      ₹{Number(product.price).toLocaleString("en-IN")}
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

      <footer style={styles.footer}>
        <p>© 2026 MERN Internship Task 1</p>
        <p>React • Express • Node.js • MongoDB</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#1f2937",
  },

  header: {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    padding: "35px 7%",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "16px",
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
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    backgroundColor: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  imageBox: {
    height: "180px",
    backgroundColor: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  },

  productName: {
    fontSize: "21px",
    margin: "12px 0 8px",
  },

  description: {
    color: "#6b7280",
    lineHeight: "1.5",
  },

  bottom: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: "20px",
    fontWeight: "700",
  },

  button: {
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "9px 13px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  message: {
    backgroundColor: "white",
    padding: "60px 20px",
    textAlign: "center",
    borderRadius: "15px",
  },

  spinner: {
    fontSize: "35px",
  },

  footer: {
    marginTop: "60px",
    padding: "25px",
    textAlign: "center",
    backgroundColor: "#111827",
    color: "#d1d5db",
  },
};

export default App;