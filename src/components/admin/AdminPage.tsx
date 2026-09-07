import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  ChevronRight,
  DollarSign,
  X,
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../services/api';
import type { Product, Category, Order } from '../../types';

type AdminTab = 'overview' | 'products' | 'categories' | 'orders' | 'users';

export const AdminPage: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const { user, logout } = useAuthStore();
  const { products, categories, fetchProducts, fetchCategories } = useProductStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    category: '',
    basePrice: '',
    description: '',
    image: '',
    isFeatured: false,
    variants: [
      { weightSize: '1kg Pack', price: 100, stock: 50, sku: '' }
    ]
  });

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  });

  // Check admin authorization
  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@truechakki.com';

  useEffect(() => {
    if (!isAdmin) {
      navigateTo('login');
      return;
    }
    loadAdminData();
  }, [isAdmin, navigateTo, activeTab]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      await fetchProducts(true);
      await fetchCategories();
      const allOrders = await api.getOrders();
      setOrders(allOrders || []);
      const allUsers = await api.getUsers();
      setUserList(allUsers || []);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const notifySuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // --- PRODUCT MANAGEMENT HANDLERS ---
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      category: categories[0]?.slug || 'atta',
      basePrice: '',
      description: '',
      image: '/images/hero-bg.jpg',
      isFeatured: false,
      variants: [{ weightSize: '1kg Pack', price: 100, stock: 50, sku: '' }]
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      basePrice: String(product.basePrice),
      description: product.description,
      image: product.image,
      isFeatured: Boolean(product.isFeatured),
      variants: product.variants.map(v => ({
        weightSize: v.weightSize,
        price: v.price,
        stock: v.stock,
        sku: v.sku
      }))
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.basePrice) return;

    try {
      const payload: Partial<Product> = {
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: productForm.category,
        basePrice: Number(productForm.basePrice),
        description: productForm.description,
        image: productForm.image || '/images/hero-bg.jpg',
        isFeatured: productForm.isFeatured,
        variants: productForm.variants.map((v, idx) => ({
          id: `v-${idx}`,
          weightSize: v.weightSize,
          price: Number(v.price),
          stock: Number(v.stock),
          sku: v.sku || `SKU-${Date.now()}-${idx}`
        }))
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        notifySuccess(`Updated product "${productForm.name}" successfully!`);
      } else {
        await api.createProduct(payload);
        notifySuccess(`Created product "${productForm.name}" successfully!`);
      }

      setIsProductModalOpen(false);
      await loadAdminData();
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.deleteProduct(id);
      notifySuccess(`Deleted product "${name}"!`);
      await loadAdminData();
    } catch (err: any) {
      alert(`Failed to delete product: ${err.message}`);
    }
  };

  // --- CATEGORY MANAGEMENT HANDLERS ---
  const openAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', slug: '', description: '', image: '/images/hero-bg.jpg' });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    try {
      const payload: Partial<Category> = {
        name: categoryForm.name,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: categoryForm.description,
        image: categoryForm.image || '/images/hero-bg.jpg'
      };

      if (editingCategory) {
        await api.updateCategory(editingCategory.id, payload);
        notifySuccess(`Updated category "${categoryForm.name}"!`);
      } else {
        await api.createCategory(payload);
        notifySuccess(`Created new category "${categoryForm.name}"!`);
      }

      setIsCategoryModalOpen(false);
      await loadAdminData();
    } catch (err: any) {
      alert(`Error saving category: ${err.message}`);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"? All associated products will be un-categorized.`)) return;
    try {
      await api.deleteCategory(id);
      notifySuccess(`Deleted category "${name}"!`);
      await loadAdminData();
    } catch (err: any) {
      alert(`Failed to delete category: ${err.message}`);
    }
  };

  // --- ORDER STATUS UPDATE HANDLER ---
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
      notifySuccess(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      alert(`Failed to update order status: ${err.message}`);
    }
  };

  // Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const lowStockProducts = products.filter(p => p.variants.some(v => v.stock < 10));

  const filteredProductsList = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrdersList = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (typeof o.shippingAddress === 'object' && o.shippingAddress?.street?.toLowerCase().includes(orderSearch.toLowerCase()));
    const matchesStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20 text-[#4A2B18]">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-[#4A2B18] text-[#FAF4E8] py-6 px-4 sm:px-6 lg:px-8 border-b-4 border-[#9A6B29] shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#9A6B29] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                ADMINISTRATION PORTAL
              </span>
              <span className="text-xs text-[#FAF4E8]/70">Store Operations Engine</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF4E8]">
              True Chakki Control Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/15"
              title="Refresh Dashboard Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Live DB</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-4 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              View Public Shop
            </button>
            <button
              onClick={() => { logout(); navigateTo('login'); }}
              className="p-2.5 bg-red-950/60 hover:bg-red-900 text-red-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border border-red-800/40"
              title="Log Out Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 bg-emerald-900 text-emerald-100 rounded-2xl border border-emerald-700 flex items-center gap-3 shadow-md animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{actionSuccess}</span>
          </div>
        </div>
      )}

      {/* Main Admin Tabbed Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-[#FAF6EE] p-2 rounded-2xl border border-[#E8DCCB] flex items-center gap-2 overflow-x-auto custom-scrollbar shadow-xs">
          {[
            { id: 'overview', label: 'Overview Analytics', icon: LayoutDashboard, badge: null },
            { id: 'products', label: 'Manage Products', icon: Package, badge: products.length },
            { id: 'categories', label: 'Manage Categories', icon: FolderTree, badge: categories.length },
            { id: 'orders', label: 'Fulfill Orders', icon: ShoppingBag, badge: pendingOrders ? `${pendingOrders} Pending` : null },
            { id: 'users', label: 'Customer Accounts', icon: Users, badge: userList.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#9A6B29] text-white shadow-md'
                    : 'text-[#4A2B18] hover:bg-[#F3E8D3] border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-2 py-0.5 text-[10px] rounded-full font-extrabold ${
                    isActive ? 'bg-white text-[#9A6B29]' : 'bg-[#E8DCCB] text-[#4A2B18]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7C5C43]">Total Revenue</span>
                  <div className="p-2 bg-[#FAF4E8] rounded-xl text-[#9A6B29]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A2B18]">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-[#7C5C43]">Lifetime earnings from processed sales</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7C5C43]">Total Orders</span>
                  <div className="p-2 bg-[#FAF4E8] rounded-xl text-[#9A6B29]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A2B18]">
                  {orders.length}
                </div>
                <p className="text-[11px] text-amber-700 font-semibold">{pendingOrders} awaiting fulfillment</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7C5C43]">Total Products</span>
                  <div className="p-2 bg-[#FAF4E8] rounded-xl text-[#9A6B29]">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A2B18]">
                  {products.length}
                </div>
                <p className="text-[11px] text-[#7C5C43]">Across {categories.length} farm categories</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8DCCB] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7C5C43]">Registered Users</span>
                  <div className="p-2 bg-[#FAF4E8] rounded-xl text-[#9A6B29]">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A2B18]">
                  {userList.length}
                </div>
                <p className="text-[11px] text-[#7C5C43]">Active registered farm customers</p>
              </div>

            </div>

            {/* Low Stock Warning Section */}
            {lowStockProducts.length > 0 && (
              <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Low Stock Inventory Warning ({lowStockProducts.length} items)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A2B18] truncate">{p.name}</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg shrink-0">
                        {p.variants.find(v => v.stock < 10)?.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-3">
                <h3 className="font-serif font-bold text-xl text-[#4A2B18]">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#9A6B29] hover:underline flex items-center gap-1"
                >
                  View All Orders <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8DCCB] text-[#7C5C43] uppercase tracking-wider">
                      <th className="py-3 px-3">Order #</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Amount</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]/60">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-[#FAF6EE] transition-colors">
                        <td className="py-3.5 px-3 font-mono font-bold text-[#4A2B18]">{o.orderNumber}</td>
                        <td className="py-3.5 px-3 font-medium">
                          {typeof o.shippingAddress === 'object' ? (o.shippingAddress as any).name || 'Valued Customer' : 'Customer'}
                        </td>
                        <td className="py-3.5 px-3 text-[#7C5C43]">{o.date}</td>
                        <td className="py-3.5 px-3 font-bold">₹{o.totalAmount}</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            o.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                            o.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                            o.status === 'PROCESSING' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DCCB]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name or category..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <button
                onClick={openAddProductModal}
                className="px-5 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] border-b border-[#E8DCCB] text-[#7C5C43] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Item</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Base Price</th>
                      <th className="py-3.5 px-4">Variants & Stock</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]">
                    {filteredProductsList.map((product) => (
                      <tr key={product.id} className="hover:bg-[#FAF6EE]/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-xl border border-[#E8DCCB] bg-[#FAF6EE]"
                            />
                            <div>
                              <span className="font-serif font-bold text-sm text-[#4A2B18] block">{product.name}</span>
                              <span className="text-[11px] text-[#7C5C43] font-mono">slug: {product.slug}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-3 py-1 bg-[#FAF4E8] border border-[#E8DCCB] text-[#9A6B29] font-bold text-[11px] rounded-full uppercase">
                            {product.categoryName || product.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-[#4A2B18]">
                          ₹{product.basePrice}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            {product.variants.map((v) => (
                              <div key={v.id} className="flex items-center gap-2 text-[11px]">
                                <span className="font-semibold text-[#4A2B18]">{v.weightSize}: ₹{v.price}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${v.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  stock: {v.stock}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {product.isFeatured ? (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-full">Featured</span>
                          ) : (
                            <span className="text-[10px] text-[#7C5C43]">Standard</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditProductModal(product)}
                              className="p-2 text-[#9A6B29] hover:bg-[#FAF4E8] rounded-lg transition-colors border border-[#E8DCCB]"
                              title="Edit Product"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8DCCB]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2B18]">Farm Store Categories</h3>
                <p className="text-xs text-[#7C5C43]">Add or edit dynamic store categories</p>
              </div>

              <button
                onClick={openAddCategoryModal}
                className="px-5 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Category</span>
              </button>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-3xl border border-[#E8DCCB] p-6 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#9A6B29] bg-[#FAF4E8] px-2.5 py-1 rounded-md border border-[#E8DCCB]">
                        /{cat.slug}
                      </span>
                      <span className="text-xs font-bold text-[#7C5C43]">
                        {cat.product_count !== undefined ? `${cat.product_count} Products` : ''}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#4A2B18]">{cat.name}</h4>
                    <p className="text-xs text-[#7C5C43] leading-relaxed line-clamp-2">{cat.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between">
                    <span className="text-[10px] text-[#7C5C43] font-mono truncate max-w-[160px]">{cat.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditCategoryModal(cat)}
                        className="px-3 py-1.5 bg-[#FAF4E8] text-[#9A6B29] border border-[#E8DCCB] text-xs font-bold rounded-lg hover:bg-[#F3E8D3]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-lg hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDER FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DCCB]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search order # or address..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
                {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-[#9A6B29] text-white shadow-sm'
                        : 'bg-[#FAF6EE] text-[#7C5C43] border border-[#E8DCCB]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] border-b border-[#E8DCCB] text-[#7C5C43] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Order Info</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Ordered Items Snapshot</th>
                      <th className="py-3.5 px-4">Total & Payment</th>
                      <th className="py-3.5 px-4">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]">
                    {filteredOrdersList.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF6EE]/70 transition-colors">
                        <td className="py-4 px-4 font-mono">
                          <span className="font-bold text-[#4A2B18] block">{order.orderNumber}</span>
                          <span className="text-[11px] text-[#7C5C43]">{order.date}</span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="font-bold text-[#4A2B18] block">
                              {typeof order.shippingAddress === 'object' ? (order.shippingAddress as any).name || 'Valued Customer' : 'Customer'}
                            </span>
                            <span className="text-[11px] text-[#7C5C43] block">
                              {typeof order.shippingAddress === 'object' ? 
                                `${order.shippingAddress.street}, ${order.shippingAddress.city}` : 
                                String(order.shippingAddress)}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-1 max-w-xs">
                            {order.items?.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-[#4A2B18]">
                                <span className="font-bold">{it.quantity}x</span> {it.productName} ({it.variantName}) - ₹{it.unitPrice}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-serif font-bold text-sm text-[#4A2B18] block">₹{order.totalAmount}</span>
                          <span className="text-[10px] font-bold text-[#9A6B29] uppercase">{order.paymentMethod || 'COD'}</span>
                        </td>

                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="p-2 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-bold text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER ACCOUNTS */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DCCB] flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#4A2B18]">Registered Customer Accounts</h3>
              <span className="text-xs text-[#7C5C43]">Total Users: {userList.length}</span>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] border-b border-[#E8DCCB] text-[#7C5C43] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">User Name</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Total Orders</th>
                      <th className="py-3.5 px-4">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCCB]">
                    {userList.map((u) => (
                      <tr key={u.id} className="hover:bg-[#FAF6EE]/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#4A2B18]">{u.name}</td>
                        <td className="py-3.5 px-4 text-[#7C5C43] font-mono">{u.email}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'ADMIN' ? 'bg-purple-100 text-purple-900' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {u.role || 'CUSTOMER'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#4A2B18]">{u.orderCount || 0}</td>
                        <td className="py-3.5 px-4 text-[#7C5C43]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
          <div className="fixed inset-0 bg-[#4A2B18]/60 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#E8DCCB] shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#4A2B18]">
                {editingProduct ? 'Edit Product' : 'Add New Farm Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-2 text-[#7C5C43] hover:text-[#4A2B18]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A2B18]">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Organic Multigrain Atta"
                    className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A2B18]">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name} ({c.slug})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A2B18]">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.basePrice}
                    onChange={(e) => setProductForm({ ...productForm, basePrice: e.target.value })}
                    placeholder="e.g. 290"
                    className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A2B18]">Image URL</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="/images/hero-bg.jpg"
                    className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A2B18]">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed description of the stone-ground product..."
                  className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={productForm.isFeatured}
                  onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#9A6B29] rounded"
                />
                <label htmlFor="isFeatured" className="font-semibold text-[#4A2B18] cursor-pointer">
                  Feature this product on homepage Best Sellers
                </label>
              </div>

              {/* Variants Setup */}
              <div className="space-y-3 pt-2 border-t border-[#E8DCCB]">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#7C5C43] text-[11px]">Product Package Variants</span>
                  <button
                    type="button"
                    onClick={() => setProductForm({
                      ...productForm,
                      variants: [...productForm.variants, { weightSize: '5kg Bag', price: 400, stock: 30, sku: '' }]
                    })}
                    className="text-[11px] font-bold text-[#9A6B29] hover:underline"
                  >
                    + Add Variant Row
                  </button>
                </div>

                {productForm.variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 bg-[#FAF6EE] p-2.5 rounded-xl border border-[#E8DCCB] items-center">
                    <input
                      type="text"
                      placeholder="Size e.g. 5kg Bag"
                      value={v.weightSize}
                      onChange={(e) => {
                        const updated = [...productForm.variants];
                        updated[i].weightSize = e.target.value;
                        setProductForm({ ...productForm, variants: updated });
                      }}
                      className="col-span-4 p-2 bg-white border border-[#E8DCCB] rounded-lg text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={v.price}
                      onChange={(e) => {
                        const updated = [...productForm.variants];
                        updated[i].price = Number(e.target.value);
                        setProductForm({ ...productForm, variants: updated });
                      }}
                      className="col-span-3 p-2 bg-white border border-[#E8DCCB] rounded-lg text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={v.stock}
                      onChange={(e) => {
                        const updated = [...productForm.variants];
                        updated[i].stock = Number(e.target.value);
                        setProductForm({ ...productForm, variants: updated });
                      }}
                      className="col-span-3 p-2 bg-white border border-[#E8DCCB] rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (productForm.variants.length <= 1) return;
                        setProductForm({
                          ...productForm,
                          variants: productForm.variants.filter((_, idx) => idx !== i)
                        });
                      }}
                      className="col-span-2 p-2 text-red-600 hover:bg-red-50 rounded-lg text-center font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8DCCB]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-[#E8DCCB] text-[#4A2B18] font-bold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-bold rounded-full shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
          <div className="fixed inset-0 bg-[#4A2B18]/60 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl border border-[#E8DCCB] shadow-2xl p-6 sm:p-8 space-y-6 z-10 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#4A2B18]">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-2 text-[#7C5C43] hover:text-[#4A2B18]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#4A2B18]">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Wood-Pressed Oils"
                  className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A2B18]">Category Slug</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="e.g. oils (auto-generated if empty)"
                  className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A2B18]">Banner Image URL</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="/images/hero-bg.jpg"
                  className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A2B18]">Description</label>
                <textarea
                  rows={3}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Short description of products in this category..."
                  className="w-full p-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8DCCB]">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-[#E8DCCB] text-[#4A2B18] font-bold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-bold rounded-full shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
