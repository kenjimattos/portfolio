# Portfolio - Kenji Mattos

Portfólio pessoal construído com Next.js (App Router), TypeScript, Tailwind CSS v4 e animações com GSAP. Bilíngue (EN/PT-BR), com case studies que trazem recriações interativas em React no lugar de screenshots.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- react-icons e lucide-react (ícones)
- Resend (envio do formulário de contato)
- Vercel Analytics

## Funcionalidades

- Página principal com seções: Hero, About, Work, Tech Stack e Contact
- Case studies em rotas dedicadas:
  - `/work/houston`
  - `/work/sebrae-opp`
  - `/work/revoluna`
  - `/work/finance`
- Internacionalização EN/PT-BR: inglês na raiz (`/`) e português espelhado em `/pt/*`, com o locale derivado do pathname e um toggle de idioma no header
- Recriações interativas dos produtos, em React, dentro de cada case:
  - `components/houston-demo/`: recriação da plataforma, incluindo o Schedule Builder animado com cursor fantasma e detecção real de conflitos
  - `components/sebrae-demo/`: telas da plataforma OPP com mapa da Paraíba, tokens de cor e tipografia originais
  - `components/revoluna-demo/`: telas do app em frames de iPhone
  - `components/finance-demo/`: recriação estática das telas do produto financeiro
- Sistema composable de case study em `components/case-study/case-layout.tsx` (`CaseLayout`, `CaseHero`, `CaseStory`, `CaseFeatures`, `CaseResults`, `CaseDesignLanguage`, `CaseEvidence`, `CaseContact`)
- SEO: metadata por página, Open Graph gerado por rota, `hreflang`, `manifest`, `robots` e `sitemap`
- Acessibilidade: suporte a `prefers-reduced-motion`, labels no formulário e alt texts descritivos
- Rota de contato em `app/api/contact/route.ts` com validação de payload, honeypot e rate limiting básico

## Executando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

- `npm run dev`: inicia o ambiente de desenvolvimento (limpa o cache `.next` antes)
- `npm run build`: gera build de produção
- `npm run start`: inicia build de produção
- `npm run lint`: roda ESLint
- `npm run test:smoke`: roda o smoke test do fluxo de contato

## Variáveis de ambiente

Crie um `.env.local` com:

```bash
RESEND_API_KEY=...
CONTACT_EMAIL=...
NEXT_PUBLIC_SITE_URL=...
```

- `RESEND_API_KEY`: chave da API da Resend
- `CONTACT_EMAIL`: e-mail de destino das mensagens do formulário
- `NEXT_PUBLIC_SITE_URL`: URL pública do site, usada em metadata, sitemap e Open Graph (opcional; tem fallback em `config/site.ts`)

## Estrutura principal

- `app/`: rotas, layout, metadata e a API de contato (`/pt/*` espelha as rotas em português)
- `components/`: seções da home, sistema de case study e as recriações `*-demo`
- `lib/`: locale (`i18n.tsx`), helpers de animação (`motion.ts`) e de Open Graph (`og.tsx`)
- `config/site.ts`: configuração central (URL, marca, links de perfil)
- `public/img/`: assets de imagem
- `tests/`: smoke test do handler de contato
