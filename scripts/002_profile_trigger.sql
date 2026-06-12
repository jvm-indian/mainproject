-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  mapped_role user_role;
  raw_role text;
BEGIN
  raw_role := (new.raw_user_meta_data ->> 'role')::text;
  
  IF raw_role = 'admin' THEN
    mapped_role := 'Admin'::user_role;
  ELSIF raw_role = 'institution' THEN
    mapped_role := 'Institution'::user_role;
  ELSIF raw_role = 'shg_worker' THEN
    mapped_role := 'SHG_Worker'::user_role;
  ELSE
    mapped_role := 'SHG_Worker'::user_role;
  END IF;

  INSERT INTO public.users (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    mapped_role
  )
  ON CONFLICT (email) DO UPDATE SET id = new.id;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
