import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft, PackagePlus, ShoppingBag, Leaf, Upload, TrendingUp } from 'lucide-react'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const isWorker = user?.user_metadata?.role === 'shg_worker'

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4" type="video/mp4" /> 
      </video>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Navbar */}
        <nav className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="text-xl font-semibold tracking-tight">Circular Marketplace</span>
          </div>
          {user ? (
            <Link href="/worker-home" className="text-sm font-medium hover:underline underline-offset-4">My Dashboard</Link>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4">Partner Login</Link>
          )}
        </nav>

        <div className="px-6 md:px-12 max-w-[1400px] mx-auto py-12 md:py-24">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Waste is just <em className="italic text-white/70">misplaced wealth.</em>
            </h1>
            <p className="text-lg text-gray-300">
              Discover premium products handcrafted by our empowered Self-Help Groups (SHGs) using 100% recycled materials recovered from the EcoChainAI network.
            </p>
          </div>

          {/* Impact Ticker */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <div className="liquid-glass rounded-full px-6 py-3 flex items-center gap-3 border border-white/10">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">12.5k kg Plastic Reborn</span>
            </div>
            <div className="liquid-glass rounded-full px-6 py-3 flex items-center gap-3 border border-white/10">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">₹4.2L SHG Revenue</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Catalog */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isWorker ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              {[
                { name: 'Temple Flower Agarbatti', desc: 'Hand-rolled incense sticks made from recycled floral waste collected from local temples. 100% charcoal-free.', price: '₹120', img: 'https://images.unsplash.com/photo-1608681283628-97170135d57b?q=80&w=600&auto=format&fit=crop' },
                { name: 'Recycled PET Tote Bag', desc: 'Durable, waterproof tote bags woven from recycled PET bottles. Each bag prevents 15 bottles from reaching the ocean.', price: '₹450', img: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bb?q=80&w=600&auto=format&fit=crop' },
                { name: 'Eco-Tiles (Pack of 10)', desc: 'Interlocking paving tiles made from compressed multi-layer plastics (MLP). Stronger than concrete.', price: '₹850', img: 'https://images.unsplash.com/photo-1581428982868-e410dd1401f3?q=80&w=600&auto=format&fit=crop' },
                { name: 'Organic Compost (5kg)', desc: 'Nutrient-rich soil conditioner produced from community wet waste. Perfect for terrace gardens.', price: '₹200', img: 'https://images.unsplash.com/photo-1592424001807-640a232f70b7?q=80&w=600&auto=format&fit=crop' },
              ].map((product, i) => (
                <div key={i} className="liquid-glass rounded-3xl overflow-hidden group border border-white/10 flex flex-col">
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-medium tracking-tight pr-4">{product.name}</h3>
                      <span className="text-lg font-bold text-green-400">{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">{product.desc}</p>
                    <button className="w-full mt-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                      Purchase Inquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SHG Upload Portal (Only visible to authenticated workers) */}
            {isWorker && (
              <div className="lg:col-span-1">
                <div className="liquid-glass rounded-3xl p-8 border border-white/10 sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-xl"><PackagePlus className="w-6 h-6 text-primary" /></div>
                    <div>
                      <h2 className="text-xl font-medium">Upload Product</h2>
                      <p className="text-xs text-gray-400">Add to marketplace</p>
                    </div>
                  </div>

                  <form className="space-y-5">
                    {/* Image Upload Area */}
                    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-white/20 bg-black/40 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-white mb-2" />
                      <span className="text-xs text-gray-400 group-hover:text-white">Click to upload image</span>
                      <span className="text-[10px] text-gray-500 mt-1">Saved to Supabase Storage</span>
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">Product Name</label>
                      <input type="text" placeholder="e.g. Bamboo Toothbrush" className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full" />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">Selling Price (₹)</label>
                      <input type="number" placeholder="e.g. 150" className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full" />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">Description</label>
                      <textarea rows={3} placeholder="Describe the recycled materials used..." className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 w-full resize-none"></textarea>
                    </div>

                    <button type="button" className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors shadow-lg shadow-primary/20">
                      Publish to Marketplace
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
