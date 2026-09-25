import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Search, 
  Calendar, 
  X, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  ShoppingBag,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  relatedProductSlug?: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      keyPoints?: string[];
    }[];
    quote?: string;
    conclusion: string;
  };
}

export const BlogsPage: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const products = useProductStore((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = ['All', 'Nutrition & Health', 'Cold-Pressed Oils', 'Heritage Recipes', 'Farm & Milling'];

  const posts: BlogPost[] = [
    {
      id: 'b-1',
      title: 'Stone Ground vs. Commercial Roller Flour: The Health & Nutrition Difference',
      slug: 'stone-ground-vs-commercial-roller-flour',
      category: 'Nutrition & Health',
      date: 'Aug 24, 2026',
      readTime: '5 min read',
      author: 'Dr. Sunita Sharma',
      authorRole: 'Clinical Nutritionist & Food Scientist',
      excerpt: 'Discover why slow stone-milled Sharbati atta preserves essential dietary fiber, germ oil, and natural B-vitamins stripped during high-speed commercial roller milling.',
      image: '/images/TraditionalStoneMilling.png',
      featured: true,
      relatedProductSlug: 'fresh-sharbati-atta',
      content: {
        intro: 'In modern urban kitchens, rotis often become tough, chewy, or lack that sweet, wholesome aroma remembered from childhood. The secret lies not in the cooking technique, but in how the wheat grain is milled.',
        sections: [
          {
            heading: 'What Happens During High-Speed Industrial Milling?',
            body: 'Commercial roller mills operate at intense friction speeds generating temperatures upwards of 90°C. At this heat, heat-sensitive vitamins (such as Thiamine B1, Folate B9, and Vitamin E) disintegrate. Furthermore, commercial mills strip away the wheat germ oil to prevent spoilage during long warehouse storage.',
            keyPoints: [
              'High heat (>90°C) destroys natural antioxidants and B-vitamins',
              'Wheat germ oil is extracted and removed',
              'Bran is sifted out to produce refined white flour (Maida)'
            ]
          },
          {
            heading: 'The Ancient Stone Chakki Miracle',
            body: 'Traditional granite stone mills rotate slowly (120-140 RPM), keeping processing temperatures low (under 40°C). This gentle crushing preserves the wheat germ intact with all its natural dietary fiber and aromatic oils.',
            keyPoints: [
              'Retains 100% natural bran and dietary fiber',
              'Lower glycemic index for better blood sugar control',
              'Rotis remain soft and moist for up to 12 hours'
            ]
          }
        ],
        quote: 'When you eat stone-milled flour, you eat the whole grain as nature intended—unadulterated, fibrous, and packed with vital energy.',
        conclusion: 'Switching your family to fresh stone-ground Sharbati flour is one of the simplest dietary upgrades you can make for gut health and long-term wellness.'
      }
    },
    {
      id: 'b-2',
      title: '5 Reasons to Switch to Cold-Pressed Wooden Kolhu Kachi Ghani Mustard Oil',
      slug: 'reasons-to-switch-to-cold-pressed-mustard-oil',
      category: 'Cold-Pressed Oils',
      date: 'Aug 18, 2026',
      readTime: '4 min read',
      author: 'Rajesh Verma',
      authorRole: 'Master Kolhu Artisan',
      excerpt: 'Learn how wooden Kolhu extraction retains natural antioxidants, high MUFA levels, and authentic pungency without chemical solvent refining.',
      image: '/images/Woodpressed.png',
      relatedProductSlug: 'cold-pressed-mustard-oil',
      content: {
        intro: 'Traditional Indian cooking relied on raw, unrefined cold-pressed oils extracted using heavy wooden presses (Kolhus). Today, chemical refining has substituted natural nutrients with solvent residue.',
        sections: [
          {
            heading: '1. Zero Chemical Solvents & Hexane',
            body: 'Refined oil extraction uses petroleum solvents like Hexane at 200°C to extract every drop of oil, followed by bleaching agents. Wooden Kolhu pressing relies purely on mechanical pressure.'
          },
          {
            heading: '2. High MUFA & PUFA Ratio for Heart Health',
            body: 'Cold-pressed mustard oil maintains an optimal Omega-3 to Omega-6 fatty acid ratio, supporting healthy cholesterol levels and cardiovascular wellness.'
          },
          {
            heading: '3. Natural Allyl Isothiocyanate Pungency',
            body: 'That signature sharp aroma in mustard oil comes from natural Allyl Isothiocyanate, a powerful natural antibacterial and digestive compound lost during chemical refining.'
          }
        ],
        quote: 'True mustard oil should tickle your nostrils with authentic pungency and impart rich golden warmth to your curries.',
        conclusion: 'Reclaim authentic flavor and natural heart health by switching back to cold-pressed Kachi Ghani mustard oil.'
      }
    },
    {
      id: 'b-3',
      title: 'Grandma’s Secrets to Sun-Curing Traditional Mango Achar',
      slug: 'grandmas-secrets-to-sun-curing-mango-achar',
      category: 'Heritage Recipes',
      date: 'Aug 10, 2026',
      readTime: '6 min read',
      author: 'Kamla Devi',
      authorRole: 'Heritage Culinary Custodian',
      excerpt: 'A step-by-step guide to naturally fermenting raw Ramkela mangoes in earthen pots with cold-pressed mustard oil and digestive spices.',
      image: '/images/authenticpickles.PNG',
      relatedProductSlug: 'mango-pickle-traditional',
      content: {
        intro: 'In an era of commercial pickles loaded with synthetic vinegar and sodium benzoate, traditional sun-cured achars are a lost art that nurtures gut microbiome with natural probiotics.',
        sections: [
          {
            heading: 'Selecting the Right Raw Mango (Ramkela)',
            body: 'Authentic achar requires fibrous, hard raw mangoes harvested right before the monsoons. The sourness balances perfectly with yellow mustard seeds and methi seeds.'
          },
          {
            heading: 'The Power of Sun-Curing in Ceramic Barnis',
            body: 'Instead of artificial heating, placing mustard-oil soaked mangoes in glazed ceramic jars under the morning sun allows slow natural lactic fermentation.'
          }
        ],
        quote: 'Sun-curing pickles is not just food preservation; it is encapsulating summer sunshine and digestive remedies into a jar.',
        conclusion: 'Try making your own batch at home using cold-pressed mustard oil, or sample our authentic handmade small-batch Mango Achar.'
      }
    },
    {
      id: 'b-4',
      title: 'Why Sharbati Wheat from Sehore MP is the Gold Standard of Atta',
      slug: 'why-sharbati-wheat-sehore-is-gold-standard',
      category: 'Farm & Milling',
      date: 'Jul 28, 2026',
      readTime: '5 min read',
      author: 'Vikramaditya Singh',
      authorRole: 'Organic Farming Specialist',
      excerpt: 'Uncover the unique soil chemistry, rainfed farming practices, and high golden luster that make MP Sharbati wheat world-renowned.',
      image: '/images/Directfromframs.png',
      relatedProductSlug: 'fresh-sharbati-atta',
      content: {
        intro: 'Known as the "Golden Grain", Sharbati wheat harvested in the black soil region of Sehore, Madhya Pradesh commands supreme respect across Indian households.',
        sections: [
          {
            heading: 'Rain-Fed Potash Rich Soil',
            body: 'Unlike irrigated wheat varieties, Sehore Sharbati is grown largely under rain-fed conditions in nutrient-dense potash soil, giving grains higher natural sweetness and protein content.'
          },
          {
            heading: 'Water Absorption & Fluffy Rotis',
            body: 'Sharbati flour absorbs up to 15% more water during dough kneading. This extra hydration translates directly into rotis that stay ultra-soft throughout the day.'
          }
        ],
        quote: 'Sharbati grains shine like polished gold under the sun because of their high glutenin-to-gliadin protein quality.',
        conclusion: 'Experience the benchmark of Indian flour by trying 100% pure stone-ground Sehore Sharbati Atta.'
      }
    },
    {
      id: 'b-5',
      title: 'Ancient Supergrains: Incorporating Ragi, Jowar & Bajra into Daily Meals',
      slug: 'ancient-supergrains-ragi-jowar-bajra-guide',
      category: 'Nutrition & Health',
      date: 'Jul 15, 2026',
      readTime: '4 min read',
      author: 'Dr. Sunita Sharma',
      authorRole: 'Clinical Nutritionist',
      excerpt: 'Simple techniques to blend multi-millet flours into your daily wheat dough to boost calcium, iron, and fiber intake effortlessly.',
      image: '/images/groundatta.PNG',
      relatedProductSlug: 'multigrain-atta-mix',
      content: {
        intro: 'Millets are climate-resilient ancient grains packed with double the calcium of milk and rich in slow-digesting complex carbohydrates.',
        sections: [
          {
            heading: 'The 70:30 Blending Rule for Beginners',
            body: 'If your family is accustomed to pure wheat rotis, start by mixing 30% Ragi or Jowar flour with 70% Sharbati Atta. This retains dough elasticity while adding dietary fiber.'
          },
          {
            heading: 'Gluten-Free Gut Health Benefits',
            body: 'Millets are naturally alkaline and help soothe hyperacidity while promoting beneficial gut bacteria.'
          }
        ],
        quote: 'Bringing millets back to your dinner plate is honoring traditional wisdom and revitalizing your metabolic health.',
        conclusion: 'Explore our multi-grain flour mixes crafted with optimal grain ratios for soft, easy-to-roll rotis.'
      }
    },
    {
      id: 'b-6',
      title: 'The Art of Eco-Friendly Glass & Paper Packaging for Organic Food',
      slug: 'eco-friendly-packaging-for-organic-food',
      category: 'Farm & Milling',
      date: 'Jul 02, 2026',
      readTime: '3 min read',
      author: 'Ananya Rao',
      authorRole: 'Sustainability Director',
      excerpt: 'Why we ditch single-use plastics for food-grade craft paper bags and reusable glass bottles to preserve freshness cleanly.',
      image: '/images/packaging.png',
      content: {
        intro: 'Packaging is as important as the food itself. Plastic containers leach phthalates and microplastics into oils and flours, especially in warm climates.',
        sections: [
          {
            heading: 'Food-Grade Moisture-Barrier Craft Bags',
            body: 'Our stone-ground flours are packed in breathable, lined paper craft pouches that prevent moisture build-up while keeping out light.'
          },
          {
            heading: 'Glass Bottles for Pure Kolhu Oils',
            body: 'Glass is non-reactive and preserves natural antioxidants in cold-pressed oils without plastic chemical leaching.'
          }
        ],
        quote: 'Pure organic food deserves clean, sustainable packaging that respects both human health and Earth.',
        conclusion: 'Join our eco-packaging revolution by choosing plastic-free packaging options at checkout.'
      }
    }
  ];

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => posts.find((p) => p.featured) || posts[0], [posts]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const getRelatedProduct = (productSlug?: string) => {
    if (!productSlug) return null;
    return products.find((p) => p.slug === productSlug || p.id === productSlug);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
      
      {/* 1. PAGE HEADER */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] text-[#9A6B29] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TRUE CHAKKI NATURAL LIVING JOURNAL</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4A2B18]">
          Traditional Nutrition, Recipes &amp; Farm Life
        </h1>

        <p className="text-sm sm:text-base text-[#7C5C43] max-w-2xl mx-auto leading-relaxed">
          Deep-dive into ancient milling wisdom, cold-pressed oil science, natural fermentation recipes, and holistic family health tips.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search articles, recipes, or health topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-full text-sm text-[#4A2B18] placeholder-[#7C5C43]/60 focus:outline-none focus:ring-2 focus:ring-[#9A6B29] shadow-sm transition-all"
          />
          <Search className="w-5 h-5 text-[#9A6B29] absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C5C43] hover:text-[#4A2B18]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 flex-wrap pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-[#4A2B18] text-white border-[#4A2B18] shadow-md'
                  : 'bg-[#FAF6EE] text-[#7C5C43] border-[#E8DCCB] hover:border-[#9A6B29] hover:text-[#4A2B18]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. FEATURED POST HERO (Displayed when no active search) */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <section className="max-w-6xl mx-auto bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            
            <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto h-full min-h-[280px] lg:min-h-[400px] overflow-hidden relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <span className="absolute top-4 left-4 bg-[#9A6B29] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                FEATURED STORY
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#9A6B29] font-bold">
                  <span>{featuredPost.category}</span>
                  <span className="text-[#E8DCCB]">•</span>
                  <span className="flex items-center gap-1 text-[#7C5C43] font-normal">
                    <Clock className="w-3.5 h-3.5 text-[#9A6B29]" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 
                  onClick={() => setActivePost(featuredPost)}
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B18] leading-tight hover:text-[#9A6B29] cursor-pointer transition-colors"
                >
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#7C5C43] leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center text-[#9A6B29] font-serif font-bold text-xs">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4A2B18]">{featuredPost.author}</p>
                    <p className="text-[10px] text-[#7C5C43]">{featuredPost.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePost(featuredPost)}
                  className="px-4 py-2 bg-[#4A2B18] hover:bg-[#9A6B29] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. ARTICLES CATALOG GRID */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-3">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A2B18]">
            {selectedCategory === 'All' ? 'Latest Articles & Recipes' : `${selectedCategory} Articles`}
          </h3>
          <span className="text-xs text-[#7C5C43] font-medium">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] space-y-3">
            <BookOpen className="w-10 h-10 text-[#9A6B29] mx-auto opacity-50" />
            <h4 className="font-serif font-bold text-lg text-[#4A2B18]">No articles found</h4>
            <p className="text-xs text-[#7C5C43]">Try searching for something else or clear your category filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-bold text-[#9A6B29] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Image Container */}
                  <div 
                    onClick={() => setActivePost(post)}
                    className="aspect-16/10 rounded-t-3xl overflow-hidden bg-[#E8DCCB] relative cursor-pointer"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-[#FAF6EE]/90 backdrop-blur-md text-[#9A6B29] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#E8DCCB]">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="px-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#7C5C43]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9A6B29]" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#9A6B29]">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h4 
                      onClick={() => setActivePost(post)}
                      className="font-serif font-bold text-lg text-[#4A2B18] leading-snug group-hover:text-[#9A6B29] cursor-pointer transition-colors line-clamp-2"
                    >
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#7C5C43] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-3 border-t border-[#E8DCCB]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#7C5C43] italic">By {post.author}</span>
                  <button 
                    onClick={() => setActivePost(post)}
                    className="text-xs font-bold text-[#4A2B18] group-hover:text-[#9A6B29] flex items-center gap-1 transition-colors"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. FULL ARTICLE READING MODAL OVERLAY */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FDFBF7] w-full max-w-3xl rounded-3xl border border-[#E8DCCB] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 bg-[#FAF6EE]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8DCCB] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B29] bg-[#FAF4E8] px-3 py-0.5 rounded-full border border-[#E8DCCB]">
                  {activePost.category}
                </span>
                <span className="text-xs text-[#7C5C43] hidden sm:inline">• {activePost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-[#7C5C43] hover:text-[#4A2B18] hover:bg-[#FAF4E8] rounded-full transition-colors"
                  title="Share article link"
                >
                  {copiedLink ? <CheckCircle2 className="w-5 h-5 text-[#9A6B29]" /> : <Share2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-2 text-[#7C5C43] hover:text-[#4A2B18] hover:bg-[#FAF4E8] rounded-full transition-colors"
                  title="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
              
              {/* Article Title & Metadata */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2B18] leading-tight">
                  {activePost.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-[#7C5C43] pt-2 border-t border-[#E8DCCB]/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center font-serif font-bold text-[#9A6B29]">
                      {activePost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#4A2B18]">{activePost.author}</p>
                      <p className="text-[10px] text-[#7C5C43]">{activePost.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-[#E8DCCB]">•</span>
                  <span>Published {activePost.date}</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-[#E8DCCB] shadow-inner">
                <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
              </div>

              {/* Introduction */}
              <p className="text-sm sm:text-base text-[#4A2B18] font-medium leading-relaxed italic bg-[#FAF6EE] p-5 rounded-2xl border-l-4 border-[#9A6B29]">
                "{activePost.content.intro}"
              </p>

              {/* Article Sections */}
              <div className="space-y-6 text-xs sm:text-sm text-[#7C5C43] leading-relaxed">
                {activePost.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4A2B18]">
                      {section.heading}
                    </h3>
                    <p>{section.body}</p>
                    {section.keyPoints && (
                      <ul className="space-y-2 pt-1 pl-2">
                        {section.keyPoints.map((point, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2 text-[#4A2B18]">
                            <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Highlight Quote */}
              {activePost.content.quote && (
                <div className="bg-[#FAF4E8] p-6 rounded-2xl border border-[#E8DCCB] text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-[#9A6B29] mx-auto" />
                  <p className="font-serif italic text-base sm:text-lg text-[#4A2B18] font-bold">
                    "{activePost.content.quote}"
                  </p>
                </div>
              )}

              {/* Conclusion */}
              <div className="space-y-2 pt-2 border-t border-[#E8DCCB]">
                <h4 className="font-serif font-bold text-base text-[#4A2B18]">Final Thoughts</h4>
                <p className="text-xs sm:text-sm text-[#7C5C43] leading-relaxed">
                  {activePost.content.conclusion}
                </p>
              </div>

              {/* Related Product CTA (If applicable) */}
              {activePost.relatedProductSlug && (
                <div className="bg-gradient-to-r from-[#FAF6EE] to-[#FAF4E8] rounded-2xl p-5 border border-[#E8DCCB] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-[#9A6B29] tracking-wider">RECOMMENDED FROM OUR MILL</span>
                    <p className="font-serif font-bold text-base text-[#4A2B18]">Taste the difference in your kitchen</p>
                    <p className="text-xs text-[#7C5C43]">100% pure stone-ground &amp; cold-pressed fresh daily.</p>
                  </div>
                  <button
                    onClick={() => {
                      const prod = getRelatedProduct(activePost.relatedProductSlug);
                      setActivePost(null);
                      if (prod) {
                        navigateTo('pdp', prod.slug);
                      } else {
                        navigateTo('shop');
                      }
                    }}
                    className="px-5 py-2.5 bg-[#4A2B18] hover:bg-[#9A6B29] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop Product Now</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer Bar */}
            <div className="bg-[#FAF6EE] px-6 py-4 border-t border-[#E8DCCB] flex items-center justify-between text-xs text-[#7C5C43]">
              <span>Enjoyed this article? Share with friends &amp; family.</span>
              <button
                onClick={() => setActivePost(null)}
                className="font-bold text-[#4A2B18] hover:text-[#9A6B29] underline"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
