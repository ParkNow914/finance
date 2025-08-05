# Finance Dashboard

Um dashboard de sinais financeiros construído com Next.js, Supabase e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ Autenticação com Supabase
- ✅ Dashboard de sinais em tempo real
- ✅ Interface responsiva e moderna
- ✅ Atualização automática de dados
- ✅ Tratamento robusto de erros
- ✅ Otimizado para produção

## 📋 Pré-requisitos

- Node.js 18+ 
- npm 8+
- Conta no Supabase

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd finance-dashboard
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   ```

4. **Configure o Supabase**
   
   - Crie um projeto no [Supabase](https://supabase.com)
   - Crie uma tabela `sinais` com as colunas:
     - `id` (uuid, primary key)
     - `ticker` (text)
     - `variacao` (numeric)
     - `quantidade` (integer)
     - `acao` (text) - valores: 'COMPRA' ou 'VENDA'
     - `created_at` (timestamp with time zone)

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🏭 Produção

### Build para produção
```bash
# Limpar cache e fazer build
npm run build:prod

# Iniciar servidor de produção
npm start
```

### Deploy

#### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard do Vercel
3. Deploy automático a cada push

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Outros provedores
- **Netlify**: Configure build command como `npm run build` e publish directory como `.next`
- **Railway**: Deploy direto do GitHub
- **Heroku**: Use o buildpack do Node.js

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificar código
- `npm run lint:fix` - Corrigir problemas de linting
- `npm run clean` - Limpar cache
- `npm run build:prod` - Build limpo para produção

## 🛡️ Segurança

- ✅ Headers de segurança configurados
- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ Tratamento de erros robusto
- ✅ HTTPS obrigatório em produção

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔄 Atualizações

Os dados são atualizados automaticamente a cada 10 segundos.

## 🐛 Troubleshooting

### Erro de variáveis de ambiente
```
Supabase env vars are missing
```
**Solução**: Configure as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Erro de build
```
Error: supabaseUrl is required
```
**Solução**: Verifique se as variáveis de ambiente estão configuradas corretamente

### Erro de autenticação
```
Not authorized
```
**Solução**: Verifique se o usuário está logado e se o token é válido

## 📄 Licença

MIT License
