-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User Profiles (Extends auth.users)
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  role text check (role in ('user', 'premium_user', 'bank_admin', 'shariah_auditor', 'investment_partner', 'super_admin')) default 'user',
  is_premium boolean default false,
  nationality text,
  risk_profile text check (risk_profile in ('low', 'medium', 'high')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Banks / Financial Institutions
create table public.banks (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  license_number text,
  country text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Financial Products
create table public.financial_products (
  id uuid default uuid_generate_v4() primary key,
  bank_id uuid references public.banks(id),
  name text not null,
  product_type text check (product_type in ('auto', 'real_estate', 'personal', 'business')),
  contract_type text check (contract_type in ('murabaha', 'ijarah', 'musharaka', 'tawarruq')),
  profit_rate numeric, -- Annual profit rate percentage
  min_term_months integer,
  max_term_months integer,
  is_active boolean default true,
  shariah_compliance_level text check (shariah_compliance_level in ('fully_compliant', 'conditional')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Financing Requests
create table public.financing_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.user_profiles(id),
  product_id uuid references public.financial_products(id),
  asset_value numeric not null,
  down_payment numeric not null,
  finance_amount numeric generated always as (asset_value - down_payment) stored,
  duration_months integer not null,
  monthly_payment numeric, -- Calculated value
  status text check (status in ('pending', 'approved', 'rejected', 'more_info_needed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Investment Portfolios
create table public.investment_portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.user_profiles(id),
  name text not null,
  portfolio_type text check (portfolio_type in ('stocks', 'etfs', 'sukuk', 'mixed')),
  risk_level text check (risk_level in ('low', 'medium', 'high')),
  total_value numeric default 0,
  total_profit numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sukuk Products (Marketplace)
create table public.sukuk_products (
  id uuid default uuid_generate_v4() primary key,
  issuer text not null,
  name text not null,
  sukuk_rating text,
  annual_yield numeric not null,
  duration_months integer,
  min_investment numeric default 1000,
  risk_level text check (risk_level in ('low', 'medium', 'high')),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Zakat Records
create table public.zakat_records (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.user_profiles(id),
  zakat_year integer not null,
  assets_type text check (assets_type in ('cash', 'gold', 'silver', 'stocks', 'business', 'mixed')),
  amount numeric not null, -- Zakat amount due
  paid_amount numeric default 0,
  status text check (status in ('pending', 'paid', 'partial')) default 'pending',
  paid_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Audit Logs (Blockchain-like immutability concept)
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  actor_id uuid references auth.users(id),
  action_type text not null,
  entity_name text not null,
  entity_id uuid not null,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Enable RLS)
alter table public.user_profiles enable row level security;
alter table public.banks enable row level security;
alter table public.financial_products enable row level security;
alter table public.financing_requests enable row level security;
alter table public.investment_portfolios enable row level security;
alter table public.sukuk_products enable row level security;
alter table public.zakat_records enable row level security;
alter table public.audit_logs enable row level security;

-- Basic Policies
-- Users can read their own profile
create policy "Users can view own profile" on public.user_profiles
  for select using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile" on public.user_profiles
  for update using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);

-- Public read access to active banks, products, and sukuk
create policy "Public read banks" on public.banks
  for select using (is_active = true);

create policy "Public read products" on public.financial_products
  for select using (is_active = true);

create policy "Public read sukuk" on public.sukuk_products
  for select using (is_active = true);

-- Users can See their own financing requests
create policy "Users see own requests" on public.financing_requests
  for select using (auth.uid() = user_id);

-- Users can Create financing requests
create policy "Users create requests" on public.financing_requests
  for insert with check (auth.uid() = user_id);

-- Users can See their own portfolios
create policy "Users see own portfolios" on public.investment_portfolios
  for select using (auth.uid() = user_id);

-- Users can Create portfolios
create policy "Users create portfolios" on public.investment_portfolios
  for insert with check (auth.uid() = user_id);
