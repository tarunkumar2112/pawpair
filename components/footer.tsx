import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="w-full relative overflow-hidden">
      <div
        className="footer-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/footerbg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
<div className="relative z-10 max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24 md:py-32 pb-32 md:pb-40">
  <div className="flex flex-col items-center text-center space-y-4">
    <h2 className="font-['Modern_Sans'] font-normal text-[27px] md:text-[36px] lg:text-[40px] xl:text-[46px] leading-[120%] text-[#fff]">
      Get Early Access to PawPair
    </h2>

    <p className="text-[16px] !mt-5 font-sans font-normal md:text-[18px] leading-[120%] text-[#fff]">
      Be among the first dog owners to experience PawPair — the AI assistant designed to understand your dog. Join the waitlist to get early access, updates, and exclusive features before the public launch.
    </p>

    {/* Email + Button Attached */}
    <div className="mt-8 flex w-full max-w-lg"> {/* max-w-lg makes input longer */}
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-5 py-3 bg-[#D9D9D9] border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5F7E9D]"
      />
      <button
        className="px-8 py-3 bg-[#5F7E9D] text-white font-semibold rounded-r-lg hover:bg-[#4b657d] transition-colors"
      >
        Join the Waitlist
      </button>
    </div>
  </div>
</div>
      <div className="relative z-10 px-8 sm:px-12 lg:px-16 pb-8 -mt-24 md:-mt-28">
        <div className="max-w-[1200px] mx-auto bg-[#F6F2EA] rounded-[20px] px-16 !pb-[30px] md:px-24 py-10 md:py-12 shadow-2xl">
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
              <p className=" text-[16px] text-[#4A5563] font-['Inter'] md:text-[18px] font-normal leading-[120%] tracking-[0%]">
                Compatibility-based dog care, starting local and built thoughtfully.
              </p>
            </div>

            <div className="pt-6 w-full border-t border-[#000000]/10">
              <p className="text-[16px] text-[#000000] font-['Inter'] md:text-[18px] font-normal leading-[120%] tracking-[0%] opacity-80">
                © 2026 PawPair. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
