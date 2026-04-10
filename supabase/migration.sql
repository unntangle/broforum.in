-- =====================================================
-- BRO Forum Admin Dashboard — Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- =====================================================

-- 1. MEMBERS
create table if not exists members (
  id          bigserial primary key,
  name        text        not null,
  business    text        not null,
  category    text        not null,
  email       text,
  phone       text,
  status      text        not null default 'active' check (status in ('active','inactive')),
  website     text,
  created_at  timestamptz not null default now()
);

-- 2. EVENTS
create table if not exists events (
  id            bigserial primary key,
  title         text        not null,
  date          date        not null,
  time          text        not null default '8:30 AM',
  venue         text        not null default 'Chennai Chapter',
  type          text        not null default 'Weekly' check (type in ('Weekly','Special','Orientation')),
  status        text        not null default 'upcoming' check (status in ('upcoming','completed','cancelled')),
  registrations integer     not null default 0,
  created_at    timestamptz not null default now()
);

-- 3. GALLERY
create table if not exists gallery (
  id         bigserial primary key,
  title      text        not null,
  category   text        not null default 'Meetings' check (category in ('Meetings','Events','Awards','Networking')),
  date       text        not null,
  src        text        not null default '',
  created_at timestamptz not null default now()
);

-- 4. ENQUIRIES (submitted via public contact form)
create table if not exists enquiries (
  id         bigserial primary key,
  name       text        not null,
  email      text        not null,
  phone      text,
  business   text,
  interest   text        not null default 'General Enquiry',
  message    text        not null,
  status     text        not null default 'new' check (status in ('new','contacted','resolved')),
  created_at timestamptz not null default now()
);

-- =====================================================
-- Row Level Security
-- =====================================================

alter table members   enable row level security;
alter table events    enable row level security;
alter table gallery   enable row level security;
alter table enquiries enable row level security;

-- Public read access for members, events, gallery (shown on website)
create policy "Public read members"  on members  for select using (true);
create policy "Public read events"   on events   for select using (true);
create policy "Public read gallery"  on gallery  for select using (true);

-- Anyone can submit enquiries (contact form)
create policy "Public insert enquiries" on enquiries for insert with check (true);

-- Admin full access (uses secret key — bypasses RLS via service role)
-- The server-side createServerClient() uses the secret key which has service_role → full access

-- =====================================================
-- Seed Data — Members (22 members from BRO list)
-- =====================================================

insert into members (name, business, category, email, phone, status, website) values
  ('Mr. S. Virapan',        'SanVir Associates Pvt. Ltd.',         'MEP Consultant',              'virapans@gmail.com',            '9444036627', 'active', 'https://sanvirassociates.com/'),
  ('Mr. V. Ramesh Kumar',   'Srushti - SRRE Communications',       'Brand & Communication Agency', 'ramesh@srushticonnect.com',     '9444398464', 'active', null),
  ('Mr. S. Dinesh',         'RSD Foundations',                     'Civil Constructions & Builders','dinesh@RSDfoundations.com',    '9840472333', 'active', 'https://www.rsdfoundations.com/'),
  ('Mr. P. Manohar',        'Aqua Eco Green Technology Pvt. Ltd.', 'Pumps',                       'mano@aquaecogreen.com',         '9840066745', 'active', 'http://www.aquaecogreen.com/'),
  ('Mr. Sudharrson Raj',    'Sri Kaligambal Industries',           'Sand Supplier',               'msudharsonraj@gmai.com',        '8637431982', 'active', 'https://skifasteners.com/'),
  ('Mr. G M Muthu',         'GM Modular',                          'Interior Contractor',         'gmmmodular@gmail.com',          '9840190449', 'active', null),
  ('Mr. A. Perumal',        'V for U Financial Services',          'Loans',                       'info@vforuloans.com',           '9884323232', 'active', 'https://vforuloans.com/'),
  ('Mr. M. Ravi',           'TECH-O-MATE Solar Consultancy',       'Solar Power',                 'techomatesolar@gmail.com',      '9094934000', 'active', 'https://www.techomate.com/'),
  ('Mr. R. Deenadhayalan',  'Classical Pest Control',              'Pest Control',                'classicalpestcontrol@gmail.com','9150116447', 'active', 'https://classicalpestcontrol.com/'),
  ('Mr. Sathish Ganasekar', 'Oli Av Tech',                         'Home Automation',             'sathish@oli-avtech.in',         '9884180066', 'active', 'https://www.oli-avtech.in/'),
  ('Mr. G. Subramani',      'SJ Windows',                          'UPVC Window',                 'info@sjupvcwindows.com',        '9384869885', 'active', 'https://www.sjupvcwindows.com/'),
  ('Mr. N. Sakthivel',      'Property Consultant',                 'Property Consultant',         'sakthirioo222@gmail.com',       '9342234028', 'active', null),
  ('Mr. R. Rajesh',         'SS Cool Power Systems',               'Home Appliances Dealer',      'sscoolpowersystems@gmail.com',  '9600111070', 'active', 'https://sspowercool.com/'),
  ('Mr. Vinoth Suren Raj',  'Fotophactory',                        'Photography & Videography',   'Vinothsurenraj@gmail.com',      '9626220188', 'active', 'https://fotophactory.co.in/'),
  ('Mr. V. M. Mathiarasu',  'Techmaxx Engineering',                'Fire Fighting',               'techmaxengineering@gmail.com',  '9940222426', 'active', 'https://techmaxxengg.com/'),
  ('Mr. R. Ashokan',        'LED Star Light',                      'LED Lighting',                null,                            '9159828178', 'active', null),
  ('Mr. R. Neelakandan',    'VRN Power Control System',            'Electrical Panel',            'neelakandan1985@rediffmail.com','9790905051', 'active', null),
  ('Ms. D. Vijayalakshmi',  'Vida Brokerage Masters',              'Insurance',                   'dhana2411sekar@gmail.com',      '9382535646', 'active', null),
  ('Mr. Gokul Sridharan',   'unntangle',                           'IT & Home Automation',        'gokul@unntangle.com',           '7092747933', 'active', 'https://unntangle.com/'),
  ('Mr. Suresh Purushothaman','Rakshan Decors',                    'Commercial Furniture',        'sales@onestopservices.info',    '9500055772', 'active', 'https://rakshandecors.com/'),
  ('Mr. Sathish Kumar I',   'ASK Unique Solutions',                'STP',                         'askupl@gmail.com',              '9841145422', 'active', null),
  ('Mr. B. Ravindran',      'DI Constructions',                    'Civil Contractor',            'djconstructions570@gmail.com',  '6382776422', 'active', null)
on conflict do nothing;

-- =====================================================
-- Seed Data — Events
-- =====================================================

insert into events (title, date, time, venue, type, status, registrations) values
  ('BRO Forum Weekly Meeting', '2026-04-10', '8:30 AM', 'Chennai Chapter', 'Weekly',       'upcoming',  18),
  ('BRO Forum Weekly Meeting', '2026-04-17', '8:30 AM', 'Chennai Chapter', 'Weekly',       'upcoming',  12),
  ('Annual Awards Night 2026', '2026-05-15', '6:00 PM', 'Taj Coromandel, Chennai', 'Special', 'upcoming', 45),
  ('BRO Forum Weekly Meeting', '2026-03-27', '8:30 AM', 'Chennai Chapter', 'Weekly',       'completed', 20),
  ('New Member Orientation',   '2026-03-20', '9:00 AM', 'Chennai Chapter', 'Orientation',  'completed',  8)
on conflict do nothing;

-- =====================================================
-- Seed Data — Gallery
-- =====================================================

insert into gallery (title, category, date, src) values
  ('Chapter Weekly Meeting',     'Meetings',   'March 2025',    '/hero-image.png'),
  ('Business Networking Session','Networking', 'March 2025',    '/features-image.png'),
  ('Annual Gala 2025',           'Events',     'February 2025', '/tertiary-image.png'),
  ('Referral Celebration',       'Awards',     'January 2025',  '/hero-image.png'),
  ('Member of the Month Award',  'Awards',     'December 2024', '/features-image.png'),
  ('Power Breakfast – Chennai',  'Meetings',   'December 2024', '/tertiary-image.png')
on conflict do nothing;

-- =====================================================
-- Seed Data — Enquiries
-- =====================================================

insert into enquiries (name, email, phone, business, interest, message, status) values
  ('Arun Krishnamurthy', 'arun@example.com',   '9876543210', 'AK Plumbing',  'Membership Application', 'Looking to join the plumbing category.', 'new'),
  ('Priya Sundar',       'priya@example.com',  '9988776655', 'PS Interiors', 'Event Registration',     'Want to attend the next meeting as guest.', 'contacted'),
  ('Mohan Raj',          'mohan@example.com',  '9123456789', 'MR Paints',    'General Enquiry',        'What categories are still open?', 'resolved'),
  ('Kavitha Murali',     'kavitha@example.com','9000011111', 'KM Catering',  'Membership Application', 'Interested in food & catering seat.', 'new'),
  ('Rajan Pillai',       'rajan@example.com',  '9444555666', 'RP Electricals','Chapter Information',   'Is the electrical category open?', 'contacted')
on conflict do nothing;
