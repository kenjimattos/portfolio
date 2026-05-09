# Portfolio - Kenji Mattos

Portfólio pessoal construído com Next.js (App Router), TypeScript, Tailwind CSS v4 e animações com GSAP.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Resend (envio de formulário de contato)

## Funcionalidades

- Página principal com seções:
  - Hero
  - About
  - Work
  - Tech Stack
  - Contact
- Case studies em rotas dedicadas:
  - `/work/revoluna`
  - `/work/houston`
- Template reutilizável de case study em `components/case-study/case-study-template.tsx`
- Rota de contato em `app/api/contact/route.ts` com:
  - validação de payload
  - honeypot
  - rate limiting básico

## Executando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: gera build de produção
- `npm run start`: inicia build de produção
- `npm run lint`: roda ESLint

## Variáveis de ambiente

Crie um `.env.local` com:

```bash
RESEND_API_KEY=...
CONTACT_EMAIL=...
```

- `RESEND_API_KEY`: chave da API da Resend
- `CONTACT_EMAIL`: e-mail de destino das mensagens do formulário

## Estrutura principal

- `app/`: rotas e layout da aplicação
- `components/`: componentes visuais e seções
- `config/`: configurações centralizadas (ex.: links de perfil)
- `public/img/`: assets de imagem
