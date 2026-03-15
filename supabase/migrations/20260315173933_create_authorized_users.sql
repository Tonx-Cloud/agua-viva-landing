-- Tabela de usuários autorizados (whitelist controlada pelo autor)
CREATE TABLE IF NOT EXISTS public.authorized_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'reader' CHECK (role IN ('reader', 'admin')),
  authorized_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT
);

-- RLS
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode verificar se seu próprio email está autorizado
CREATE POLICY "Users can check own authorization"
  ON public.authorized_users FOR SELECT
  USING (email = (auth.jwt()->>'email'));

-- Admins podem gerenciar todos os registros
CREATE POLICY "Admins full access"
  ON public.authorized_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.authorized_users au
      WHERE au.email = (auth.jwt()->>'email') AND au.role = 'admin'
    )
  );

-- Índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_authorized_users_email ON public.authorized_users(email);

-- Seed: admins iniciais
INSERT INTO public.authorized_users (email, name, role, notes) VALUES
  ('hiltonsf@gmail.com', 'Hilton', 'admin', 'Desenvolvedor'),
  ('ancartor@yahoo.com', 'Antonio Carlos Tórtoro', 'admin', 'Autor'),
  ('ancartor@gmail.com', 'Antonio Carlos Tórtoro', 'admin', 'Autor (Gmail)')
ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, name = EXCLUDED.name;
