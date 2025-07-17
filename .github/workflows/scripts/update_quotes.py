import os
import yfinance as yf
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone

url: str = os.getenv('SUPABASE_URL') or os.getenv('NEXT_PUBLIC_SUPABASE_URL')
key: str = os.getenv('SUPABASE_SERVICE_ROLE')

tickers = os.getenv('TICKERS', 'AAPL,MSFT').split(',')

if not url or not key:
    raise RuntimeError('Missing Supabase env vars')

supabase: Client = create_client(url, key)

end = datetime.now(timezone.utc)
start = end - timedelta(days=2)

rows = []
for t in tickers:
    df = yf.download(t, start=start, end=end, progress=False)
    if df.empty:
        continue
    last_close = df['Close'].iloc[-1]
    prev_close = df['Close'].iloc[0]
    variation = (last_close - prev_close) / prev_close * 100
    # Simple rule example
    if variation > 3:
        action = 'COMPRA'
        qty = 100
    elif variation < -3:
        action = 'VENDA'
        qty = 100
    else:
        action = 'NEUTRO'
        qty = 0
    rows.append({
        'ticker': t,
        'variacao': variation,
        'acao': action,
        'quantidade': qty
    })

if rows:
    supabase.table('sinais').insert(rows).execute()
    print(f'Inserted {len(rows)} rows')
else:
    print('No data')
