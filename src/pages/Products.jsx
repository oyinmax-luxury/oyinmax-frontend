import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiPencil, HiTrash, HiX, HiPhotograph } from "react-icons/hi";
import api from "../services/api";
import toast from "react-hot-toast";
import { HiClipboardList, HiArrowLeft } from "react-icons/hi"; // 1. IMPORT ICON
import { Link } from "react-router-dom"; // 2. IMPORT LINK

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sizes: "",
    colors: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetches all products (adjust endpoint if needed for 'all' products)
      const { data } = await api.get("/products");
      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "", stock: "", sizes: "", colors: "" });
    setImages([]);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setAddProduct(true)
    const data = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    // Append images
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
        toast.success("Product updated successfully!"); 
      } else {
        await api.post("/products", data);
        toast.success("Product updated successfully!"); 
      }
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
      toast.error("Failed to save product"); 
    } finally{
        setAddProduct(false)
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark">
      <div className="max-w-7xl mx-auto">

        <Link to="/admin/dashboard" className="flex items-center gap-2 text-brand-muted hover:text-brand-gold mb-8 font-body transition">
            <HiArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-10 border-b border-brand-muted/20 pb-6">

          <h1 className="text-4xl font-light font-luxury">Manage Products</h1>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-lg hover:bg-brand-brown transition"
          >
            <HiPlus /> Add New Product
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="bg-white shadow-luxury rounded-xl overflow-x-auto border border-brand-muted/10">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-brand-muted uppercase bg-brand-ivory/50">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-brand-ivory/30">
                    <td className="px-6 py-4">
                      {product.images[0] ? (
                        <img src={product.images[0].url} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      ) : (
                        <div className="w-16 h-16 bg-brand-ivory rounded-lg flex items-center justify-center">
                          <HiPhotograph className="text-brand-muted text-2xl" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-brand-dark">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">£{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(product)} className="text-brand-gold hover:text-brand-brown mr-3">
                        <HiPencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
                        <HiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-luxury"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-luxury">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-brand-muted hover:text-brand-dark">
                  <HiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-body text-sm">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" className="w-full p-3 border rounded-lg" required />
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full p-3 border rounded-lg" rows="3" required />
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="w-full p-3 border rounded-lg" required />
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stock" className="w-full p-3 border rounded-lg" required />
                </div>
                
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold appearance-none"
                    required
                    >
                    <option value="" disabled>Select Category</option>
                    
                    {/* African Heritage & Traditional */}
                    <optgroup label="African Luxury & Heritage">
                        <option value="Aso Ebi">Aso Ebi Styles</option>
                        <option value="Agbada">Agbada Collection</option>
                        <option value="Kaftans">Kaftans & Senator Wear</option>
                        <option value="Adire Luxury">Adire Luxury</option>
                        <option value="Ankara Fusion">Ankara Fusion</option>
                    </optgroup>

                    {/* Western / International High Fashion */}
                    <optgroup label="Western & Global Styles">
                        <option value="Couture Gowns">Evening & Couture Gowns</option>
                        <option value="Suits & Blazers">Bespoke Suits & Blazers</option>
                        <option value="Ready-to-Wear">Ready-to-Wear (RTW)</option>
                        <option value="Resort Wear">Resort & Vacation Wear</option>
                        <option value="Luxury Streetwear">Luxury Streetwear</option>
                    </optgroup>

                    {/* Bridal & Formal */}
                    <optgroup label="Bridal & Red Carpet">
                        <option value="Traditional Bridal">Traditional Bridal</option>
                        <option value="White Wedding">White Wedding Collection</option>
                        <option value="Cocktail Dresses">Cocktail & Party Dresses</option>
                    </optgroup>

                    {/* Accessories */}
                    <optgroup label="Accessories & Essentials">
                        <option value="Gele">Gele & Headgear</option>
                        <option value="Leather Goods">Bags & Leather Goods</option>
                        <option value="Accessories">Jewelry & Accents</option>
                        <option value="Fabrics">Premium Fabrics</option>
                    </optgroup>
                    </select>
                <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} placeholder="Sizes (comma separated)" className="w-full p-3 border rounded-lg" />
                <input type="text" name="colors" value={formData.colors} onChange={handleInputChange} placeholder="Colors (comma separated)" className="w-full p-3 border rounded-lg" />
                
                <div>
                  <label className="block mb-1 text-xs text-brand-muted">Product Images (Max 5)</label>
                  <input type="file" name="images" onChange={handleImageChange} multiple accept="image/*" className="w-full p-3 border rounded-lg" />
                </div>

                <button type="submit" className="w-full bg-brand-gold text-white py-3 rounded-lg hover:bg-brand-brown transition font-semibold">
                  {/* {editingProduct ? "Update Product" : "Save Product"} */}
                  {addProduct 
                        ? "Saving..." 
                        : (editingProduct ? "Update Product" : "Save Product")
                 }
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}