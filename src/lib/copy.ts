export function titleForDashboard(name?: string) {
  return name ? `Welcome back, ${name.split(' ')[0]}!` : 'Welcome back!'
}

export function ctaGetAssessed() {
  return 'Get Assessed'
}

export function ctaGeneratePlan() {
  return 'Generate Diet Plan'
}

export function metaDescriptionHome() {
  return 'Personalized diet planning with friendly guidance, not jargon.'
}

export function planSummaryHumanized(calories: number) {
  return `A balanced plan centered around ~${calories} kcal/day, with approachable meals and easy swaps.`
}

