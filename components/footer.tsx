import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/footerbg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24 md:py-32 pb-32 md:pb-40">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-white font-modern text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-normal leading-[120%] tracking-[-2px]">
            Ready to find care that fits?
          </h2>
          
          <button className="mt-4 px-8 py-3.5 bg-[#5F7E9D] text-white font-modern font-normal text-[18px] leading-[100%] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300">
            Find Care That Fits
          </button>
          
          <p className="text-white font-modern text-[14px] mt-2">
            It only takes a few minutes.
          </p>
        </div>
      </div>

      <div className="relative z-10 px-8 sm:px-12 lg:px-16 pb-8 -mt-24 md:-mt-28">
        <div className="max-w-[1200px] mx-auto bg-[#F6F2EA] rounded-[20px] px-16 md:px-24 py-10 md:py-12 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-5">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PawPair Logo"
                width={200}
                height={50}
                className="h-14 w-auto"
              />
            </Link>

            <div className="max-w-2xl">
              <p className="text-[#4A5563] font-['Inter'] text-[18px] font-normal leading-[120%] tracking-[0%]">
                Compatibility-based dog care, starting local and built thoughtfully.
              </p>
              <p className="text-[#4A5563] font-['Inter'] text-[18px] font-normal leading-[120%] tracking-[0%] mt-2">
                Please use this as the primary content for layout.
              </p>
            </div>

            <div className="pt-6 w-full border-t border-[#000000]/10">
              <p className="text-[#000000] font-['Inter'] text-[18px] font-normal leading-[120%] tracking-[0%] opacity-80">
                © 2026 PawPair. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
