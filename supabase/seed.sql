-- Seed Data for Sukuk Marketplace
insert into public.sukuk_products (issuer, name, sukuk_rating, annual_yield, duration_months, min_investment, risk_level)
values
('Saudi Aramco', 'Aramco Sukuk 2026', 'A+', 4.5, 60, 1000, 'low'),
('Al Rajhi Capital', 'Al Rajhi Tier 1 Sukuk', 'AA', 3.8, 36, 500, 'low'),
('Green Energy Co', 'Green Energy Solar Sukuk', 'BBB', 6.2, 84, 5000, 'medium'),
('SEC', 'Saudi Electricity Global Sukuk', 'A', 4.2, 120, 2000, 'low'),
('Riyad Bank', 'Riyad Bank Tier 2 Sukuk', 'A-', 5.1, 120, 1000, 'medium');
