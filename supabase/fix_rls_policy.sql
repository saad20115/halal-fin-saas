-- Add INSERT policy for user_profiles
-- Run this SQL in Supabase SQL Editor

-- Users can insert their own profile
create policy "Users can insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);
