import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, FileText, CheckCircle2, AlertTriangle, Search, Trash2, Edit } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../services/mock/mockData';
import { formatCurrency } from '../../utils/formatters';

export function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStep, setImportStep] = useState(1); // 1: Upload, 2: Mapping & Preview, 3: Report
  const [importReport, setImportReport] = useState(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  const handleSimulateImport = () => {
    setImportStep(3);
    setImportReport({
      created: 420,
      updated: 83,
      skipped: 17,
      failed: 6,
      errors: [
        { row: 14, sku: 'SKU-9021', message: 'Missing product price' },
        { row: 32, sku: 'SKU-8812', message: 'Invalid category slug' }
      ]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E9E9EB] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-[#282C3F]">Catalog Product Management</h1>
          <p className="text-xs text-[#696E79]">Manage products, prices, stock levels, and bulk import catalogue</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setIsImportModalOpen(true); setImportStep(1); setImportReport(null); }}
            className="bg-[#6D214F] hover:bg-[#581A40] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk CSV / Excel Import</span>
          </button>
          <Link
            to="/admin/products/new"
            className="bg-[#FF3F6C] hover:bg-[#D81B4E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Product</span>
          </Link>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search catalogue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs text-gray-500 font-bold">Total: {filtered.length} Items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FFFBFC] border-b border-[#E9E9EB] text-[#696E79] font-bold">
                <th className="p-3">PRODUCT</th>
                <th className="p-3">BRAND</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">PRICE</th>
                <th className="p-3">SMART SCORE</th>
                <th className="p-3">STOCK</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9EB]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold flex items-center gap-2">
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded bg-[#FFFBFC] border p-0.5" />
                    <span className="truncate max-w-xs">{p.name}</span>
                  </td>
                  <td className="p-3 font-semibold">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 font-extrabold text-[#282C3F]">{formatCurrency(p.price)}</td>
                  <td className="p-3">
                    <span className="bg-[#282C3F] text-white px-2 py-0.5 rounded font-black text-[10px]">
                      {p.smartScore}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-[#00897B]">{p.stockCount} units</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/${p.id}`} className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setProducts(products.filter(x => x.id !== p.id))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 35 & 65. BULK PRODUCT IMPORT WORKFLOW MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-base text-[#282C3F]">Supermarket Catalogue Bulk Import Workflow</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 border-b pb-3">
              <span className={importStep === 1 ? 'text-[#FF3F6C]' : ''}>1. File Upload</span>
              <span>→</span>
              <span className={importStep === 2 ? 'text-[#FF3F6C]' : ''}>2. Mapping &amp; Preview</span>
              <span>→</span>
              <span className={importStep === 3 ? 'text-[#FF3F6C]' : ''}>3. Validation Report</span>
            </div>

            {importStep === 1 && (
              <div className="space-y-4 text-center py-6 border-2 border-dashed border-gray-300 rounded-xl bg-[#FFFBFC]">
                <Upload className="w-10 h-10 text-[#FF3F6C] mx-auto stroke-1" />
                <div className="text-xs font-bold text-[#282C3F]">Drag and Drop Supermarket Products CSV or Excel file</div>
                <p className="text-[11px] text-gray-400">Supports .csv, .xlsx format up to 50MB</p>
                <button
                  onClick={() => setImportStep(2)}
                  className="bg-[#FF3F6C] text-white px-4 py-2 rounded-lg text-xs font-bold"
                >
                  Select File &amp; Proceed to Mapping
                </button>
              </div>
            )}

            {importStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="font-bold text-[#282C3F]">Column Mapping Confirmation</div>
                <div className="space-y-2 bg-gray-50 p-3 rounded-lg border text-gray-700">
                  <div className="flex justify-between"><span>Product Name Column:</span><span className="font-bold text-[#00897B]">Matched ('product_name')</span></div>
                  <div className="flex justify-between"><span>Selling Price Column:</span><span className="font-bold text-[#00897B]">Matched ('selling_price')</span></div>
                  <div className="flex justify-between"><span>MRP Column:</span><span className="font-bold text-[#00897B]">Matched ('mrp')</span></div>
                </div>
                <button
                  onClick={handleSimulateImport}
                  className="w-full bg-[#FF3F6C] text-white py-3 rounded-xl font-bold"
                >
                  Run Import Validation &amp; Save
                </button>
              </div>
            )}

            {importStep === 3 && importReport && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#E0F2F1] text-[#00897B] rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Catalogue Import Executed Successfully</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center font-bold">
                  <div className="bg-gray-100 p-2 rounded">Created: {importReport.created}</div>
                  <div className="bg-gray-100 p-2 rounded">Updated: {importReport.updated}</div>
                  <div className="bg-gray-100 p-2 rounded">Skipped: {importReport.skipped}</div>
                  <div className="bg-red-50 text-red-600 p-2 rounded">Failed: {importReport.failed}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-[#D32F2F]">Validation Errors:</div>
                  {importReport.errors.map((err, idx) => (
                    <div key={idx} className="bg-red-50 text-red-700 p-2 rounded text-[11px] flex justify-between">
                      <span>Row {err.row} ({err.sku}):</span>
                      <span>{err.message}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="w-full bg-[#282C3F] text-white py-3 rounded-xl font-bold"
                >
                  Close Import Report
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
