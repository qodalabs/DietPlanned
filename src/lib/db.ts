import type { User, Assessment, DietPlan } from '@/types/db'
import type { SupabaseClient } from '@supabase/supabase-js'

// Supabase-backed CRUD wrapper. Requires tables defined in supabase/schema.sql

function mapUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
  }
}

function mapAssessment(row: any): Assessment {
  return {
    id: row.id,
    userId: row.user_id,
    age: row.age,
    sex: row.sex,
    heightCm: row.height_cm,
    weightKg: row.weight_kg,
    activity: row.activity,
    goal: row.goal,
    bmi: row.bmi,
    bmr: row.bmr,
    recommendedCalories: row.recommended_calories,
    summary: row.summary,
    createdAt: row.created_at,
  }
}

function mapPlan(row: any): DietPlan {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    summary: row.summary,
    days: row.days,
    meta: row.meta,
    createdAt: row.created_at,
  }
}

export function createDb(supabase: SupabaseClient) {
  return {
  // Profiles
  async upsertProfile(input: { id: string; email: string; name: string }): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: input.id, email: input.email, name: input.name })
      .select('*')
      .single()
    if (error) throw error
    return mapUser(data)
  },
  async findUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    if (error) throw error
    return data ? mapUser(data) : undefined
  },
  async findUserById(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data ? mapUser(data) : undefined
  },

  // Assessments
  async createAssessment(input: Omit<Assessment, 'id' | 'createdAt'>): Promise<Assessment> {
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        user_id: input.userId,
        age: input.age,
        sex: input.sex,
        height_cm: input.heightCm,
        weight_kg: input.weightKg,
        activity: input.activity,
        goal: input.goal,
        bmi: input.bmi,
        bmr: input.bmr,
        recommended_calories: input.recommendedCalories,
        summary: input.summary,
      })
      .select('*')
      .single()
    if (error) throw error
    return mapAssessment(data)
  },
  async latestAssessmentForUser(userId: string): Promise<Assessment | undefined> {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error) throw error
    return data ? mapAssessment(data) : undefined
  },

  // Diet Plans
  async createPlan(input: Omit<DietPlan, 'id' | 'createdAt'>): Promise<DietPlan> {
    const { data, error } = await supabase
      .from('diet_plans')
      .insert({
        user_id: input.userId,
        title: input.title,
        summary: input.summary,
        days: input.days,
        meta: input.meta,
      })
      .select('*')
      .single()
    if (error) throw error
    return mapPlan(data)
  },
  async findPlansByUser(userId: string): Promise<DietPlan[]> {
    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(mapPlan)
  },
  async findPlanById(id: string): Promise<DietPlan | undefined> {
    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data ? mapPlan(data) : undefined
  },
  }
}

export type DB = ReturnType<typeof createDb>
