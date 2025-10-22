import test from 'node:test'
import assert from 'node:assert/strict'
import { generatePlanFromAssessment } from '@/lib/gemini'

test('gemini proxy stub returns structured plan', async () => {
  const plan = await generatePlanFromAssessment('u1', {
    id: 'a1', userId: 'u1', age: 30, sex: 'male', heightCm: 180, weightKg: 80, activity: 'moderate', goal: 'maintain', bmi: 24.7, bmr: 1800, recommendedCalories: 2400, summary: 'ok', createdAt: new Date().toISOString()
  })
  assert.equal(plan.userId, 'u1')
  assert.ok(plan.days.length === 7)
  assert.ok(plan.meta && plan.meta.calories > 0)
})

