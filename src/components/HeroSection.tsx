'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6">
              Discover Your
              <span className="gradient-text block">Perfect Style</span>
            </h1>
            <p className="text-xl text-primary-600 mb-8 leading-relaxed">
              Explore our curated collection of premium products designed to elevate your lifestyle. 
              Quality meets affordability in every item we offer.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="#products" className="bg-gradient-to-r from-accent to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 text-center">
                Shop Now
              </Link>
              <Link href="/about" className="border-2 border-accent text-accent font-semibold py-4 px-8 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 text-center">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900">10K+</div>
                <div className="text-primary-600 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900">500+</div>
                <div className="text-primary-600 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900">24/7</div>
                <div className="text-primary-600 text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-600/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-premium p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
                  alt="Shopping Experience" 
                  width={1000}
                  height={320}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-success to-green-400 text-white p-4 rounded-2xl shadow-lg animate-float">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm">Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-primary-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;