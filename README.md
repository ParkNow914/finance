# Finance Dashboard (Always-Free Stack)

Este projeto implementa um dashboard online para sinais de compra/venda de ativos.

## Stack

| Camada | Tecnologia | Plano Gratuito |
| ------ | ---------- | -------------- |
| Front/Backend | Next.js (React) hospedado no Vercel | Sempre grátis (serverless) |
| Banco de Dados + Auth | Supabase Postgres/Auth | Free tier (500 MB) |
| Coleta de dados | GitHub Actions + Yahoo Finance API (yfinance) | 2 000 min/mês grátis |

## Estrutura

```
finance/
├─ pages/           # Páginas Next.js
│  ├─ index.js      # Dashboard
│  └─ login.js      # Tela de login
├─ pages/api/       # Rotas API serverless
│  └─ sinais.js     # Endpoint JSON de sinais
├─ lib/
│  └─ supabase.js   # Cliente Supabase reutilizável
├─ .github/
│  └─ workflows/
│     └─ update_quotes.yml  # Job diário que populará o banco
└─ ...
```

### Variáveis de ambiente
Crie um arquivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<chave anon>
SUPABASE_SERVICE_ROLE=<chave service role>  # usada pelo GitHub Action
TICKERS=AAPL,MSFT,GOOG  # ativos a monitorar
```

## Scripts úteis

```bash
npm install        # instala dependências
npm run dev        # roda localmente em http://localhost:3000
```

## Deploy
1. Faça fork deste repositório no GitHub.
2. Conecte no Vercel (grátis) e importe o repositório.
3. Defina as variáveis de ambiente no Vercel.
4. Crie projeto no Supabase e copie URL + chaves.
5. GitHub Actions será executado automaticamente (precisa setar secrets SUPABASE_SERVICE_ROLE & TICKERS).

Pronto! Seu dashboard ficará online em minutos, totalmente dentro dos planos grátis.
