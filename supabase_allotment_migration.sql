-- Run this entire script in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

-- 1. Create the allotments table
CREATE TABLE IF NOT EXISTS public.allotments (
  id uuid default gen_random_uuid() primary key,
  shg_id uuid references public.users(id) not null,
  campus_id uuid references public.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  UNIQUE(shg_id, campus_id)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.allotments ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Allow anyone to view allotments (so SHGs and Campuses can see their own, and Admin can see all)
CREATE POLICY "Allotments are viewable by everyone." ON public.allotments
  FOR SELECT USING (true);

-- Allow only admins to create new allotments
CREATE POLICY "Allotments are insertable by admin only." ON public.allotments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role = 'Admin'
    )
  );

-- Allow only admins to delete allotments
CREATE POLICY "Allotments are deletable by admin only." ON public.allotments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role = 'Admin'
    )
  );

-- 4. Enable Realtime for the allotments table
ALTER PUBLICATION supabase_realtime ADD TABLE allotments;
