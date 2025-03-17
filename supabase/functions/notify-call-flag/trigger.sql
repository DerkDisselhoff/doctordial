
-- Create function to notify the Edge Function
create or replace function public.handle_new_call_flag()
returns trigger
language plpgsql
security definer
as $$
begin
  perform
    net.http_post(
      url := 'https://ngtckhrzlxgfuprgfjyp.supabase.co/functions/v1/notify-call-flag',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (select value from public.secrets where name = 'SUPABASE_SERVICE_ROLE_KEY')
      ),
      body := to_jsonb(new)
    );
  return new;
end;
$$;

-- Create trigger
create trigger on_call_flag_created
  after insert on public.call_flags
  for each row
  execute function public.handle_new_call_flag();
