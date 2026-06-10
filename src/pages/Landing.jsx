import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from '../components/Globe';

export default function Landing() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleExploreMap = () => {
    navigate('/marketplace');
  };

  const cleanSweepLogo = "data:image/png;base64,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";

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen relative">
      {/* Global Background Shader/Glow Overlay */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-b from-[#0D1B2A]/20 via-[#111412] to-[#111412]" />

      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-secondary/15 shadow-[0_0_20px_rgba(0,212,170,0.1)]">
        <nav className="flex justify-between items-center max-w-[1440px] mx-auto px-6 md:px-container-margin-desktop h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img alt="CleanSweep Logo" className="h-10 w-10 filter drop-shadow-[0_0_8px_rgba(65,238,194,0.5)]" src={cleanSweepLogo} />
            <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter">CleanSweep</span>
          </div>

          <div className="hidden md:flex items-center gap-stack-md">
            <button onClick={handleSignIn} className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-body-md bg-transparent border-none cursor-pointer">Report</button>
            <button onClick={handleExploreMap} className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-body-md bg-transparent border-none cursor-pointer">Explore Map</button>
            <button onClick={handleSignIn} className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-body-md bg-transparent border-none cursor-pointer">Community</button>
            <button onClick={handleExploreMap} className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-body-md bg-transparent border-none cursor-pointer">Marketplace</button>
            <button
              onClick={handleSignIn}
              className="ml-4 text-on-secondary bg-secondary rounded-full px-6 py-2 shadow-[0_0_15px_rgba(0,212,170,0.4)] hover:scale-105 active:scale-95 transition-transform cursor-pointer font-semibold"
            >
              Sign In
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-secondary p-2 focus:outline-none cursor-pointer"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-secondary/15 px-6 py-6 flex flex-col gap-4 animate-fade-in">
            <button onClick={() => { setIsMobileMenuOpen(false); handleSignIn(); }} className="text-left text-on-surface-variant hover:text-secondary py-2 font-body-md text-body-md bg-transparent border-none cursor-pointer">Report</button>
            <button onClick={() => { setIsMobileMenuOpen(false); handleExploreMap(); }} className="text-left text-on-surface-variant hover:text-secondary py-2 font-body-md text-body-md bg-transparent border-none cursor-pointer">Explore Map</button>
            <button onClick={() => { setIsMobileMenuOpen(false); handleSignIn(); }} className="text-left text-on-surface-variant hover:text-secondary py-2 font-body-md text-body-md bg-transparent border-none cursor-pointer">Community</button>
            <button onClick={() => { setIsMobileMenuOpen(false); handleExploreMap(); }} className="text-left text-on-surface-variant hover:text-secondary py-2 font-body-md text-body-md bg-transparent border-none cursor-pointer">Marketplace</button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); handleSignIn(); }}
              className="w-full text-center text-on-secondary bg-secondary rounded-full py-3 shadow-[0_0_15px_rgba(0,212,170,0.4)] font-semibold cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-container-margin-desktop max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center w-full">
            <div className="reveal">
              <h1 className="font-headline-xl text-headline-xl mb-stack-sm leading-tight text-white">
                Clean Cities Start <br />
                <span className="text-secondary filter drop-shadow-[0_0_8px_rgba(65,238,194,0.3)]">With You</span>
              </h1>
              <p className="text-on-surface-variant font-body-lg text-body-lg mb-stack-lg max-w-lg">
                Report garbage, track cleanups, and earn rewards — all in one advanced civic infrastructure platform.
              </p>
              <div className="flex flex-wrap gap-stack-md">
                <button
                  onClick={handleSignIn}
                  className="bg-secondary text-on-secondary px-8 md:px-12 py-4 rounded-full font-bold btn-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={handleExploreMap}
                  className="border border-secondary text-secondary px-8 md:px-12 py-4 rounded-full font-bold hover:bg-secondary/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Explore Map
                </button>
              </div>
            </div>

            <div className="relative h-[350px] sm:h-[450px] md:h-[600px] reveal flex justify-center items-center">
              <Globe />
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-stack-lg bg-surface-dim border-y border-secondary/10 reveal">
          <div className="max-w-[1440px] mx-auto px-6 md:px-container-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-stack-lg text-center">
            <div>
              <div className="font-stats-lg text-stats-lg text-secondary mb-2 filter drop-shadow-[0_0_8px_rgba(65,238,194,0.2)]">10,000+</div>
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">Reports Filed</div>
            </div>
            <div>
              <div className="font-stats-lg text-stats-lg text-secondary mb-2 filter drop-shadow-[0_0_8px_rgba(65,238,194,0.2)]">500+</div>
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">Cities Covered</div>
            </div>
            <div>
              <div className="font-stats-lg text-stats-lg text-secondary mb-2 filter drop-shadow-[0_0_8px_rgba(65,238,194,0.2)]">1M+</div>
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">Points Redeemed</div>
            </div>
          </div>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="py-32 px-6 md:px-container-margin-desktop max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="font-headline-lg text-headline-lg mb-stack-sm text-white">A Complete Civic Ecosystem</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Smarter infrastructure management powered by community participation and real-time data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-md auto-rows-fr reveal">
            {/* Large Card 1 - Report Garbage */}
            <div className="md:col-span-2 glass-card p-8 md:p-stack-lg rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleSignIn}>
              <div>
                <span className="material-symbols-outlined text-secondary text-5xl mb-6 group-hover:scale-110 transition-transform filter drop-shadow-[0_0_6px_rgba(65,238,194,0.3)]">report</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Report Garbage</h3>
                <p className="text-on-surface-variant text-sm md:text-base">
                  Snap a photo of litter or overflowing bins and our AI will automatically geo-tag and categorize the report for city services.
                </p>
              </div>
            </div>

            {/* Small Card 1 - Explore Map */}
            <div className="glass-card p-6 md:p-stack-md rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleExploreMap}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 group-hover:scale-115 transition-transform">map</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Explore Map</h3>
                <p className="text-on-surface-variant text-sm">
                  Real-time heatmaps of city cleanliness and active cleanup zones.
                </p>
              </div>
            </div>

            {/* Small Card 2 - Community Feed */}
            <div className="glass-card p-6 md:p-stack-md rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleSignIn}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 group-hover:scale-115 transition-transform">groups</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Community Feed</h3>
                <p className="text-on-surface-variant text-sm">
                  Join local cleanup events and connect with eco-conscious neighbors.
                </p>
              </div>
            </div>

            {/* Small Card 3 - Leaderboard */}
            <div className="glass-card p-6 md:p-stack-md rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleSignIn}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 group-hover:scale-115 transition-transform">leaderboard</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Leaderboard</h3>
                <p className="text-on-surface-variant text-sm">
                  Climb the ranks of your city's top environmental guardians.
                </p>
              </div>
            </div>

            {/* Large Card 2 - Marketplace */}
            <div className="md:col-span-2 glass-card p-8 md:p-stack-lg rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleExploreMap}>
              <div>
                <span className="material-symbols-outlined text-secondary text-5xl mb-6 group-hover:scale-110 transition-transform filter drop-shadow-[0_0_6px_rgba(65,238,194,0.3)]">shopping_cart</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Marketplace</h3>
                <p className="text-on-surface-variant text-sm md:text-base">
                  Redeem your CleanSweep points for eco-friendly products, local transport credits, and municipal tax discounts.
                </p>
              </div>
            </div>

            {/* Small Card 4 - Profile */}
            <div className="glass-card p-6 md:p-stack-md rounded-xl glow-hover flex flex-col justify-between group cursor-pointer" onClick={handleSignIn}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 group-hover:scale-115 transition-transform">person</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-white">Profile</h3>
                <p className="text-on-surface-variant text-sm">
                  Track your impact, badges, and personal cleanup history.
                </p>
              </div>
            </div>

            {/* Large Card 3 (Admin Dashboard - Full width in original grid bottom) */}
            <div className="md:col-span-4 glass-card p-6 md:p-stack-md rounded-xl glow-hover flex flex-col sm:flex-row items-start sm:items-center gap-6 group cursor-pointer" onClick={handleSignIn}>
              <div className="bg-secondary/10 p-4 rounded-full sm:shrink-0 transition-colors group-hover:bg-secondary/20">
                <span className="material-symbols-outlined text-secondary text-4xl filter drop-shadow-[0_0_4px_rgba(65,238,194,0.3)]">dashboard</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-white">Admin Dashboard</h3>
                <p className="text-on-surface-variant text-sm">
                  Municipal tools for dispatching crews, analyzing data trends, and managing civic rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-6 md:px-container-margin-desktop max-w-[1440px] mx-auto overflow-hidden">
          <div className="text-center mb-20 reveal">
            <h2 className="font-headline-lg text-headline-lg mb-stack-sm text-white">The Clean Cycle</h2>
            <p className="text-on-surface-variant">Join the movement in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-stack-lg relative">
            <div className="text-center flex flex-col items-center reveal relative z-10">
              <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(65,238,194,0.5)]">1</div>
              <h3 className="font-headline-md text-headline-md mb-4 text-white">Snap &amp; Report</h3>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xs">
                See litter? Take a quick photo via the CleanSweep app. AI handles the rest.
              </p>
            </div>

            <div className="text-center flex flex-col items-center reveal relative z-10 md:mt-12">
              <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(65,238,194,0.5)]">2</div>
              <h3 className="font-headline-md text-headline-md mb-4 text-white">AI Verifies</h3>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xs">
                Our system validates the report and routes it to the nearest municipal cleaning crew.
              </p>
            </div>

            <div className="text-center flex flex-col items-center reveal relative z-10">
              <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(65,238,194,0.5)]">3</div>
              <h3 className="font-headline-md text-headline-md mb-4 text-white">Earn Rewards</h3>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xs">
                Once confirmed clean, points are dropped into your wallet. Impact made.
              </p>
            </div>

            {/* Decorative Connection Line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/50 to-secondary/0 -z-0" />
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="relative py-40 px-6 md:px-container-margin-desktop overflow-hidden border-t border-secondary/10 bg-surface-dim">
          {/* Background Watermark Globe */}
          <div className="absolute inset-0 z-0 flex justify-center items-center opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[300px] sm:text-[450px] md:text-[600px] text-secondary">public</span>
          </div>

          <div className="relative z-10 text-center reveal max-w-4xl mx-auto">
            <h2 className="font-headline-xl text-headline-xl mb-stack-lg text-white leading-tight">
              Join the CleanSweep <br />
              <span className="text-secondary filter drop-shadow-[0_0_8px_rgba(65,238,194,0.3)]">Movement</span>
            </h2>
            <button
              onClick={handleSignIn}
              className="bg-secondary text-on-secondary px-10 md:px-12 py-5 rounded-full font-bold btn-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto cursor-pointer"
            >
              <span className="material-symbols-outlined">download</span>
              Download the App
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg bg-[#0c0f0d] border-t border-secondary/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-container-margin-desktop max-w-[1440px] mx-auto gap-stack-md">
          <div className="flex items-center gap-3">
            <img alt="CleanSweep Logo" className="h-8 w-8 grayscale" src={cleanSweepLogo} />
            <span className="font-headline-md text-base font-semibold text-slate-400">© 2026 CleanSweep. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <button onClick={handleSignIn} className="hover:text-secondary transition-colors bg-transparent border-none cursor-pointer">Privacy Policy</button>
            <button onClick={handleSignIn} className="hover:text-secondary transition-colors bg-transparent border-none cursor-pointer">Terms of Service</button>
            <button onClick={handleSignIn} className="hover:text-secondary transition-colors bg-transparent border-none cursor-pointer">Contact Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
