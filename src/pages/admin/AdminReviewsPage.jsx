import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, Flag, Search, Filter } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: 'r-1', product: 'Amul Taaza Toned Milk (Pouch)', rating: 5, comment: 'Always fresh daily morning delivery! Never missed a single batch in 2 years.', user: 'Vishwanathan G', date: '2026-10-07', status: 'approved', helpful: 42 },
  { id: 'r-2', product: 'Aashirvaad Shuddh Chakki Atta', rating: 5, comment: 'Softest rotis I have ever made. 100% whole wheat guarantee delivers.', user: 'Priya Sharma', date: '2026-10-06', status: 'approved', helpful: 38 },
  { id: 'r-3', product: 'Fortune Sunlite Sunflower Oil', rating: 4, comment: 'Great value for money. Light on digestion and excellent for daily cooking.', user: 'Rahul Verma', date: '2026-10-05', status: 'pending', helpful: 15 },
  { id: 'r-4', product: 'Britannia Good Day Cashew Cookies', rating: 3, comment: 'Family pack was slightly less fresh than usual. Needs better packaging.', user: 'Ananya Roy', date: '2026-10-04', status: 'pending', helpful: 7 },
  { id: 'r-5', product: 'Tata Sampann Unpolished Arhar Dal', rating: 5, comment: 'Best quality Toor Dal I have ever found online. No polish, great protein content.', user: 'Deepak Menon', date: '2026-10-03', status: 'approved', helpful: 29 },
];

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = reviews.filter(r => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const matchesSearch = r.product.toLowerCase().includes(search.toLowerCase()) || r.user.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const approve = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  const reject = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  const remove = (id) => setReviews(reviews.filter(r => r.id !== id));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E9E9EB] p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-[#282C3F]">Customer Reviews & Feedback Moderation</h1>
        <p className="text-xs text-[#696E79]">Approve, reject, and moderate supermarket product reviews</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Approved Reviews', value: reviews.filter(r => r.status === 'approved').length, color: 'text-[#00897B]', bg: 'bg-[#E0F2F1]' },
          { label: 'Pending Moderation', value: reviews.filter(r => r.status === 'pending').length, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Avg Rating', value: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) + ' ★', color: 'text-[#FF3F6C]', bg: 'bg-[#FFF0F4]' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-4`}>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-bold text-[#696E79] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E9E9EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews..." className="w-full bg-[#FFFBFC] border border-[#E9E9EB] rounded-lg pl-8 pr-3 py-1.5 text-xs" />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize transition-colors ${filter === f ? 'bg-[#FF3F6C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(review => (
            <div key={review.id} className="border border-[#E9E9EB] rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-[#282C3F]">{review.product}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      review.status === 'approved' ? 'bg-[#E0F2F1] text-[#00897B]' :
                      review.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {review.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-[#696E79] ml-1">{review.rating}/5</span>
                  </div>
                  <p className="text-xs text-[#282C3F] leading-relaxed">"{review.comment}"</p>
                  <div className="text-[11px] text-[#696E79] font-semibold">— {review.user} · {review.date} · {review.helpful} helpful votes</div>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  {review.status === 'pending' && (
                    <>
                      <button onClick={() => approve(review.id)} className="flex items-center gap-1 text-[11px] bg-[#E0F2F1] text-[#00897B] px-2.5 py-1 rounded-lg font-bold hover:bg-teal-100">
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => reject(review.id)} className="flex items-center gap-1 text-[11px] bg-red-50 text-red-600 px-2.5 py-1 rounded-lg font-bold hover:bg-red-100">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}
                  <button onClick={() => remove(review.id)} className="flex items-center gap-1 text-[11px] bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg font-bold hover:bg-gray-100">
                    <Flag className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
