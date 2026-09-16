import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="relative bg-black text-white py-28 sm:py-36 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
      
      {/* Background Image Container */}
      <div className=" absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 " style={{ backgroundImage: "url(https://wallpaperaccess.com/full/4045199.jpg)" }}></div>

      {/* Content Container (Layered above background) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-6">
        
        {/* Main Title */}
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-[1.15]">
          Your next role is <br /> already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base font-normal max-w-xl">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-white text-black font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-zinc-200 transition-colors text-center shadow-md"
          >
            Create a free account
          </Link>
          
          <Link
            href="/pricing"
            className="w-full sm:w-auto bg-[#16171a]/80 backdrop-blur-md text-white font-medium text-sm px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-[#1e2025] transition-all text-center"
          >
            View pricing
          </Link>
        </div>

      </div>
    </section>
  );
}