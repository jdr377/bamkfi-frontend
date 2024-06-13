'use client';

export default function Externals() {
  return (
    <div className="relative h-28 sm:h-36 mt-6">
      <div className="flex justify-center items-center h-full px-4 md:px-8">
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-lg mx-auto" style={{ maxWidth: '600px' }}>
          <a href="https://magiceden.io/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/me.svg"
              alt="Magic Eden"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://www.okx.com/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/okx.png"
              alt="OKX"
              width={75}
              height={60}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://ordinalswallet.com/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/ow.png"
              alt="Ordinals Wallet"
              width={120}
              height={140}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://unisat.io/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/unisat.svg"
              alt="Unisat"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://www.saturnbtc.io/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/saturn.svg"
              alt="Saturn"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://www.dotswap.app/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <img
              src="/logos/dotswap.png"
              alt="Dotswap"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
}