import test from 'node:test'
import assert from 'node:assert/strict'
import { bmi, bmr, recommendedCalories } from '@/lib/assessment'

test('bmi calculation', () => {
  assert.equal(bmi(180, 81), 25.0)
})

test('bmr calculation (male)', () => {
  const val = bmr('male', 180, 81, 30)
  assert.ok(val > 1500 && val < 2200)
})

test('recommended calories for maintenance', () => {
  const cals = recommendedCalories('female', 165, 60, 28, 'moderate', 'maintain')
  assert.ok(cals > 1600 && cals < 2600)
})

