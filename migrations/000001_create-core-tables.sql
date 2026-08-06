-- 0001_create_core_tables.sql
-- Creates profiles, agent_runs, jobs, and agent_logs tables with RLS policies

-- profiles: use user id as primary key and reference auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  email text,
  phone text,
  location text,
  current_title text,
  experience_level text,
  years_experience integer,
  skills text[],
  industries text[],
  work_experience jsonb,
  education jsonb,
  job_titles_seeking text[],
  remote_preference text,
  preferred_locations text[],
  salary_expectation text,
  cover_letter_tone text,
  linkedin_url text,
  portfolio_url text,
  work_authorization text,
  resume_pdf_url text,
  is_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_profiles_auth_users FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable row level security and policy for profiles: only the user can select/modify their row
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY profiles_delete_own ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- agent_runs
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text,
  job_title_searched text,
  location_searched text,
  jobs_found integer,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_agent_runs_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY agent_runs_user_only ON public.agent_runs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid,
  user_id uuid NOT NULL,
  source text,
  source_url text,
  external_apply_url text,
  title text,
  company text,
  location text,
  salary text,
  job_type text,
  about_role text,
  responsibilities text[],
  requirements text[],
  nice_to_have text[],
  benefits text[],
  about_company text,
  match_score integer,
  match_reason text,
  matched_skills text[],
  missing_skills text[],
  company_research jsonb,
  found_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_jobs_agent_runs FOREIGN KEY (run_id) REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  CONSTRAINT fk_jobs_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY jobs_user_only ON public.jobs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- agent_logs
CREATE TABLE IF NOT EXISTS public.agent_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid,
  user_id uuid,
  message text,
  level text,
  job_id uuid,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_agent_logs_runs FOREIGN KEY (run_id) REFERENCES public.agent_runs(id) ON DELETE CASCADE,
  CONSTRAINT fk_agent_logs_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY agent_logs_user_only ON public.agent_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_agent_runs_user_id ON public.agent_runs (user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON public.jobs (user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_run_id ON public.jobs (run_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_run_id ON public.agent_logs (run_id);

-- NOTE: Creating the "resumes" storage bucket is typically done via the InsForge/Supabase storage API or CLI.
-- Add a migration step or run the InsForge CLI to create a storage bucket named "resumes" with authenticated, owner-only access:
--   insforge storage create-bucket resumes --public false
-- or via the dashboard/CLI provided by your InsForge instance.
