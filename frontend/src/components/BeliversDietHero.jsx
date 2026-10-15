import Card from "../assets/Card5.png";

export default function BelieversDietHero() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black md:to-white/80"></div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between 
                      px-6 sm:px-10 md:px-20 py-16 md:py-0 
                      min-h-screen gap-12 md:gap-0">
        
        {/* LEFT SIDE — TEXT */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          
          <span className="uppercase tracking-widest text-xs sm:text-sm text-yellow-400 font-semibold">
            2026 • Glory and Fruitfulness
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            BELIEVERS DIET
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Are you feeding your spirit intentionally? Join us every Saturday
            as we dive deep into the Word of God — growing in faith, living in truth
            and strengthening our walk with Christ.
          </p>

          <div className="mt-8">
            <button className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 
                               transition px-8 py-3 rounded-lg text-white 
                               font-semibold shadow-lg">
              Start Watching
            </button>
          </div>

          <p className="mt-6 text-xs sm:text-sm text-gray-400">
            “For out of the abundance of the heart the mouth speaketh.”  
            – Matthew 12:34 (KJV)
          </p>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <img
            src={Card}
            alt="Believers Diet"
            className="w-72 sm:w-96 md:w-[85%] lg:w-[80%] object-contain"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 
                         bg-black/40 hover:bg-black/60 text-white 
                         p-2 sm:p-3 rounded-full text-lg sm:text-xl">
        ‹
      </button>

      <button className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 
                         bg-black/40 hover:bg-black/60 text-white 
                         p-2 sm:p-3 rounded-full text-lg sm:text-xl">
        ›
      </button>
    </section>
  );
}
