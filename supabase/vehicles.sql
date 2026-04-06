create table if not exists public.vehicles (
  id text primary key,
  slug text not null unique,
  title text not null,
  brand text not null,
  model text not null,
  year integer,
  price bigint not null,
  currency text not null default 'TRY',
  km integer,
  fuel text not null,
  transmission text not null,
  location text not null,
  image text not null,
  gallery jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  source_url text,
  description text,
  expertise jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_sort_order_idx on public.vehicles (sort_order);
create index if not exists vehicles_featured_idx on public.vehicles (featured);

create or replace function public.set_vehicles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_vehicles_updated_at on public.vehicles;

create trigger set_vehicles_updated_at
before update on public.vehicles
for each row
execute function public.set_vehicles_updated_at();
