import { RISK, STARKEX } from './common'
import { Project } from './types'

export const sorare: Project = {
  name: 'Sorare',
  slug: 'sorare',
  bridges: [
    {
      address: '0xF5C9F957705bea56a7e806943f98F7777B995826',
      sinceBlock: 12831579,
      tokens: ['ETH'],
    },
  ],
  details: {
    links: {
      websites: ['https://sorare.com/'],
      apps: [],
      documentation: ['https://docs.starkware.co/starkex-docs-v2/'],
      explorers: [],
      repositories: ['https://github.com/starkware-libs/starkex-contracts'],
      socialMedia: [
        'https://discord.gg/TSjtHaM',
        'https://reddit.com/r/Sorare/',
        'https://twitter.com/sorarehq',
        'https://instagram.com/sorare_official/',
      ],
    },
    technologyName: 'Validium',
    technologyDetails: "Powered by StarkWare's StarkEx",
    purpose: 'NFT, Exchange',
    provider: 'StarkEx',
    riskView: {
      stateValidation: RISK.STATE_ZKP_ST,
      dataAvailability: RISK.DATA_EXTERNAL,
      upgradeability: RISK.UNKNOWN, // TODO: check
      operatorCensoring: RISK.CENSORING_WITHDRAW_L1,
      operatorDown: RISK.DOWN_ESCAPE_MP,
    },
    technology: {
      category: {
        name: 'Validium',
        description: "Powered by StarkWare's StarkEx",
        references: [
          {
            text: 'Sorare Contracts - StarkEx documentation',
            href: 'https://docs.starkware.co/starkex-v3/starkex-deep-dive/smart-contracts-1/deployments-addresses#sorare-contracts',
          },
        ],
      },
      stateCorrectness: STARKEX.VALIDITY_PROOFS,
      dataAvailability: STARKEX.VALIDIUM_DATA_AVAILABILITY,
      newCryptography: STARKEX.CRYPTOGRAPHY,
      operator: STARKEX.OPERATOR,
      forceTransactions: STARKEX.FORCE_OPERATIONS('spot'),
      exitMechanisms: [STARKEX.OFF_CHAIN_WITHDRAWAL, STARKEX.FORCED_WITHDRAWAL],
      contracts: {
        addresses: [
          {
            name: 'Bridge',
            address: '0xF5C9F957705bea56a7e806943f98F7777B995826',
            upgradeability: {
              type: 'StarkWare',
              implementation: '0xB8563AD5aF1F79dd04937BE8B572318c8e6f43AC',
              upgradeDelay: 0,
              isFinal: false,
            },
          },
          {
            name: 'Committee',
            address: '0x90CEb3bD97284df8c3240f3a8C4Aab29c1ee9542',
          },
          {
            name: 'SHARP Verifier',
            address: '0x2cAbD63F6f28b493f33D13E34060f0959F3570aE',
            upgradeability: {
              type: 'StarkWare',
              implementation: '0x0f58e286eDeaC10a197bA1906eA348beD3eE41a0',
              callImplementation: '0x9bca5C55137057208ee5b14F3e269133bDCaC1f8',
              upgradeDelay: 0,
              isFinal: false,
            },
          },
        ],
        risks: [
          // TODO: Risks
        ],
      },
    },
    parameters: [
      {
        name: 'Primary use case',
        value: 'NFT, Exchange',
      },
      {
        name: 'Hypothetical level of decentralization',
        value: 'High',
      },
      {
        name: 'Current level of decentralization',
        tooltip: 'Contracts are upgradable',
        sentiment: 'bad',
        value: 'Low',
      },
      {
        name: 'Can funds be stolen by the operator?',
        tooltip: 'Contracts are upgradable',
        sentiment: 'warning',
        pointers: [
          {
            name: 'Bridge contract - source on Etherscan',
            href: 'https://etherscan.io/address/0xF5C9F957705bea56a7e806943f98F7777B995826#code',
          },
        ],
        value: 'Yes, through contract upgrade',
      },
      {
        name: 'Permissionless?',
        sentiment: 'bad',
        tooltip: 'Only Sorare can produce new blocks',
        value: 'No',
      },
      {
        name: 'Force TX mechanism?',
        sentiment: 'good',
        value: 'Yes but only for withdrawals',
      },
      {
        name: 'Privacy',
        value: 'No',
      },
      {
        name: 'Smart contracts',
        value: 'No',
      },
    ],
    news: [
      {
        date: '2021-07-26',
        name: 'We’re live on our Scaling Solution: Starkware',
        link: 'https://medium.com/sorare/were-live-on-our-scaling-solution-starkware-62438abee9a8',
      },
    ],
  },
}
