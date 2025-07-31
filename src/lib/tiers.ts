export const tiers = ['free', 'silver', 'gold', 'platinum'] as const
export type Tier = typeof tiers[number]

export function isTier(val: unknown): val is Tier {
  return tiers.includes(val as Tier)
}

export function tierValue(tier: Tier) { return tiers.indexOf(tier) }
