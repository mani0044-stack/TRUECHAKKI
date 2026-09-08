import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const posts = [
    {
      id: 'b-1',
      title: 'Stone Ground vs. Commercial Roller Flour: The Health Difference',
      category: 'Nutrition & Health',
      date: 'Aug 24, 2026',
      readTime: '5 min read',
      excerpt: 'Discover why slow stone-milled Sharbati atta preserves essential dietary fiber, germ oil, and natural B-vitamins lost in high-speed industrial processing.',
      image: '/images/hero-bg.jpg',
    },
    {
      id: 'b-2',
      title: '5 Reasons to Switch to Cold-Pressed Kachi Ghani Mustard Oil',
      category: 'Wellness Recipes',
      date: 'Aug 18, 2026',
      readTime: '4 min read',
      excerpt: 'Learn how wooden Kolhu oil extraction retains natural antioxidants, high MUFA levels, and authentic pungency without chemical solvents.',
      image: '/images/hero-bg.jpg',
    },
    {
      id: 'b-3',
      title: 'Grandma’s Secrets to Sun-Curing Traditional Mango Achar',
      category: 'Heritage Cooking',
      date: 'Aug 10, 2026',
      readTime: '6 min read',
      excerpt: 'Step-by-step guide to naturally fermenting raw mangoes in earthen pots with cold-pressed mustard oil and digestive spices.',
      image: '/images/hero-bg.jpg',
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9A6B29]">
          NATURAL LIVING JOURNAL
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#4A2B18]">
          True Chakki Blogs & Recipes
        </h1>
        <p className="text-sm text-[#7C5C43]">
          Explore insightful articles on organic farming, traditional nutrition, and authentic Indian recipes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between p-5">
            <div className="space-y-3">
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#E8DCCB]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#9A6B29] font-semibold">
                <span>{post.category}</span>
                <span className="flex items-center gap-1 text-[#7C5C43] font-normal"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4A2B18] leading-snug">{post.title}</h3>
              <p className="text-xs text-[#7C5C43] leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>
            <button className="pt-2 text-xs font-bold text-[#4A2B18] hover:text-[#9A6B29] flex items-center gap-1">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
