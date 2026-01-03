
import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogPage: React.FC = () => {
  const posts = [
    {
      title: "The Future of AI in Enterprise Business Intelligence",
      excerpt: "How large language models are fundamentally changing the way corporations interact with their data silos.",
      author: "Dr. Aris Thorne",
      date: "Oct 12, 2023",
      readTime: "8 min read",
      category: "Future Tech",
      image: "https://picsum.photos/seed/blog1/800/600"
    },
    {
      title: "10 Data Strategies to Scale Your SaaS to $10M ARR",
      excerpt: "A deep dive into the specific metrics and reporting structures used by top-tier unicorn startups.",
      author: "Sarah Chen",
      date: "Oct 5, 2023",
      readTime: "12 min read",
      category: "SaaS Strategy",
      image: "https://picsum.photos/seed/blog2/800/600"
    },
    {
      title: "Why Distributed Ledgers are Essential for Analytics",
      excerpt: "Understanding the intersection of blockchain reliability and high-speed data processing for business.",
      author: "Marcus Vögel",
      date: "Sep 28, 2023",
      readTime: "5 min read",
      category: "Engineering",
      image: "https://picsum.photos/seed/blog3/800/600"
    }
  ];

  return (
    <div className="bg-white">
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 font-heading">The Lumina Blog</h1>
            <p className="text-xl text-slate-500">Insights, news, and deep-dives from the forefront of business intelligence and AI.</p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 mb-4">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <User className="w-3.5 h-3.5 mr-1" />
                  {post.author}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors font-heading leading-tight">
                {post.title}
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <button className="flex items-center font-bold text-indigo-600 hover:underline">
                Read Article
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </section>
      
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heading">Stay in the loop</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">Join 5,000+ subscribers who receive our weekly insights directly in their inbox.</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
