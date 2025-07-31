export const tiers = ['free', 'silver', 'gold', 'platinum'] as const
export type Tier = typeof tiers[number]

export function isTier(val: any): val is Tier {
  return tiers.includes(val)
}

export function tierValue(tier: Tier) { return tiers.indexOf(tier) }
