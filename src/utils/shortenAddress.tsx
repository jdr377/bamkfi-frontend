

function shortenAddress(showCharacterCount: number, address?: string): string {
    if (!address || address.length <= (3 + (showCharacterCount * 2)))
      return address || '';
    return `${address.slice(0, showCharacterCount)}...${address.slice(-showCharacterCount)}`;
}

export default shortenAddress