import { useCallback, useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
const addr = '0x48731cF7e84dc94C5f84577882c14Be11a5B7456';
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export enum FeedState {
  INIT = 'INIT',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  ERROR = 'ERROR',
}

export function useChainlinkFeed() {
  const provider = useProvider();
  const [lastRoundData, setLastRoundData] = useState<Record<string, unknown>>();
  const [state, setState] = useState(FeedState.INIT);
  const priceFeed = useContract({
    addressOrName: addr,
    contractInterface: aggregatorV3InterfaceABI,
    signerOrProvider: provider,
  });

  const refresh = useCallback(() => {
    setState(FeedState.FETCHING);
    priceFeed
      .latestRoundData()
      .then((roundData: Record<string, unknown>) => {
        setState(FeedState.FETCHED);
        setLastRoundData(roundData);
        // Do something with roundData
        // eslint-disable-next-line no-console
        console.log('Latest Round Data', roundData);
      })
      .catch(() => {
        setState(FeedState.ERROR);
        setLastRoundData(undefined);
      });
  }, [priceFeed]);

  useEffect(() => refresh(), [refresh]);

  return { lastRoundData, state, refresh };
}