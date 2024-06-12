'use client';

import { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Data, Reward } from './types';

interface ClientSideTableProps {
  data: Data;
}

function shortenAddress(address?: string): string {
  if (!address || address.length <= 10) return address || '';
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

function copyToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch((err) => alert(`Failed to copy text: ${err}`));
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      alert(`Failed to copy text: ${err}`);
    }
    document.body.removeChild(textArea);
  }
}

export default function ClientSideTable({ data }: ClientSideTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredResults = searchTerm
    ? data.leaderboard_data.rewards.filter((reward) =>
        reward.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.leaderboard_data.rewards;

  return (
    <div className="max-w-screen-xl mx-3 md:mx-8">
      {data.leaderboard_data?.block && (
        <div className="ml-auto mr-auto text-zinc-400 mb-10">
          Leaderboard synced to block {data.leaderboard_data.block}
        </div>
      )}
      <input
        type="text"
        placeholder="Search by address"
        className="w-full p-2 border rounded-md bg-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-0.5">
        <table className="w-full text-sm text-left rtl:text-right text-zinc-400">
          <thead className="text-xs uppercase bg-zinc-700 text-zinc-400">
            <tr>
              <th scope="col" className="px-2 py-3" style={{ width: '4em', maxWidth: '4em' }}>Rank</th>
              <th scope="col" className="px-3 py-3 text-center" style={{ width: '8em' }}>Address</th>
              <th scope="col" className="px-3 py-3 text-center">Amount&nbsp;🏦</th>
              <th scope="col" className="px-2 py-3 text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length > 0 ? (
              <>
                {filteredResults.sort((a: Reward, b: Reward) => b.amount - a.amount).map((reward: Reward, index: number) => (
                  <tr key={reward.address} className="border-b bg-zinc-800 border-zinc-700 hover:bg-zinc-600 font-mono">
                    <td scope="row" className="pl-1 py-4 whitespace-nowrap text-center">{index + 1}</td>
                    <td scope="row" className="pl-1 py-4 whitespace-nowrap flex items-center">
                      {isNarrowScreen ? shortenAddress(reward.address) : reward.address}
                      <FaCopy className="ml-0.5 cursor-pointer" onClick={() => copyToClipboard(reward.address)} title="Copy Address" />
                    </td>
                    <td className="px-1.5 py-4 text-center">{reward.amount?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-1.5 py-4 text-center">
                      {data.btcPriceData.bitcoin.usd && reward.amount && data.bamkRuneData.curPrice
                        ? `$${((reward.amount * data.bamkRuneData.curPrice) / 100000000 * data.btcPriceData.bitcoin.usd).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : '-'}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="bg-zinc-800 hover:bg-zinc-600">
                <td scope="row" className="px-6 py-4 text-white">No data</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}