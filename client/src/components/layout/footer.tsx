import { Link } from "wouter";
import CompanyLogo from "@/components/ui/company-logo";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 space-y-10">
          <div className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F72] rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-white/10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Delivery status</p>
              <h3 className="text-2xl font-semibold mt-2">Deployment-ready on Vercel + Neon with Ghana-based support</h3>
              <p className="text-white/80 mt-2 max-w-2xl">
                Our infrastructure is already provisioned—static frontends on Vercel Edge, APIs on serverless functions, and Neon Postgres for data. When you're ready, we can launch pilots without rework.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0A3D62] font-semibold hover:bg-[#FCD116] hover:text-black transition"
            >
              Talk to the team
            </Link>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <CompanyLogo size="md" variant="light" />
            </div>
            <p className="text-gray-400 mb-4">
              Innovative software solutions for West Africa's critical industry gaps.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@haydeentech.com" className="text-gray-400 hover:text-white transition" aria-label="Email Us">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="tel:+233207884182" className="text-gray-400 hover:text-white transition" aria-label="Call Us">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-poppins mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/solutions" className="text-gray-400 hover:text-white transition">Solutions</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-bold font-poppins mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/solutions/agriconnect" className="text-gray-400 hover:text-white transition">AgriConnect</Link></li>
              <li><Link href="/solutions/website-design" className="text-gray-400 hover:text-white transition">Website Design</Link></li>
              <li><span className="text-gray-500">EcoVend (Coming Soon)</span></li>
              <li><span className="text-gray-500">TransitPro (Coming Soon)</span></li>
              <li><span className="text-gray-500">MarketMate (Coming Soon)</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-poppins mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bw 14 Benz road, Effiduasi Ashanti
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@haydeentech.com
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +233 207 884 182
              </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
                  </svg>
                  Support hours: Mon–Fri, 9am–6pm GMT
                </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} Haydeen Technologies. All rights reserved.</p>
          <p>Proud designers of <a href="https://mpcghana.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">MPCGhana.org</a> and many other websites for companies and individuals.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
