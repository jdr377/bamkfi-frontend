'use client';

import Image from 'next/image';
import MELogo from '../../public/logos/me.svg';
import OKXLogo from '../../public/logos/okx.png';
import OWLogo from '../../public/logos/ow.png';
import UnisatLogo from '../../public/logos/unisat.svg';
//import BitcoinMagazineLogo from '../../public/logos/bitcoin-magazine-logo-white.svg';
import SaturnLogo from '../../public/logos/saturn.svg';
import DotswapLogo from '../../public/logos/dotswap.png';

export default function Externals() {
  return (
    <div className="relative h-28 sm:h-36 mt-6">
      <div className="flex justify-center items-center h-full px-4 md:px-8">
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-lg mx-auto" style={{ maxWidth: '600px' }}>
          <a href="https://magiceden.io/runes/NUSD%E2%80%A2NUSD%E2%80%A2NUSD%E2%80%A2NUSD" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={MELogo}
              alt="Magic Eden"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://www.okx.com/web3/marketplace/runes/token/NUSD%E2%80%A2NUSD%E2%80%A2NUSD%E2%80%A2NUSD/845005:178" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={OKXLogo}
              alt="OKX"
              width={75}
              height={60}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://ordinalswallet.com/collection/rune-NUSD%E2%80%A2NUSD%E2%80%A2NUSD%E2%80%A2NUSD" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={OWLogo}
              alt="Ordinals Wallet"
              width={120}
              height={140}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://unisat.io/runes/market?tick=NUSD%E2%80%A2NUSD%E2%80%A2NUSD%E2%80%A2NUSD" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={UnisatLogo}
              alt="Unisat"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          {/*
          <a href="https://bitcoinmagazine.com/" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={BitcoinMagazineLogo}
              alt="Bitcoin Magazine"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          */}
          <a href="https://www.saturnbtc.io/app/swap/nusdnusdnusdnusd-sat" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={SaturnLogo}
              alt="Saturn"
              width={120}
              height={100}
              className="grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <a href="https://www.dotswap.app/pools#R_NUSD%E2%80%A2NUSD%E2%80%A2NUSD%E2%80%A2NUSD_BTC" target="_blank" rel="noopener noreferrer" className="group flex-1 min-w-[120px] max-w-[33%] flex justify-center items-center">
            <Image
              src={DotswapLogo}
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
