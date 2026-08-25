# Changelog

## [2.3.2] - 2026-08-25

### Added

- Novo case study Finance (`/work/finance` e `/pt/work/finance`), gestor de gastos self-hosted sobre uma API de Open Finance: entrada na seção Work, imagem Open Graph própria e registro no sitemap
- Recriação estática do produto em `components/finance-demo/`, no lugar de screenshots:
  - Telas de dashboard (fatura, inbox de transações, split de despesas e abas de categoria), fluxo de caixa e importação de fatura
  - Exhibits narrativos: diagrama de identidade, tabela da máquina de estados do sync, tira de sintomas, mapa de arquitetura, pipeline de slug, tabela de testes e prateleira de docs
  - Frame de tela, primitivos de UI e fontes próprias do case (Fraunces, JetBrains Mono e Inter)
- Tokens de cor e tipografia do Finance em `app/globals.css`, com o efeito de grão de papel (`.fin-grain`) e a neutralização de estilos base (`.fin-app`) equivalente à do Houston
- README reescrito, cobrindo os quatro cases, o esquema EN/PT, as recriações interativas e a variável `NEXT_PUBLIC_SITE_URL`
- Página 404 própria (`app/not-found.tsx`), bilíngue e no visual do site, com o numeral em contorno e link de volta para a home
- Acessibilidade: link "pular para o conteúdo" no início da página, visível apenas ao navegar por teclado e traduzido conforme o locale
- Header com scroll-spy: o link da seção em vista ganha estado ativo enquanto a página rola

### Changed

- `CaseStory` aceita `media` como alternativa a `image`, permitindo telas recriadas onde antes só cabia uma foto
- `CaseEvidence` aceita `children` como alternativa a `items`, para evidências livres (diagramas e painéis recriados) no lugar da grade de screenshots
- Sebrae OPP passa a apontar para Finance como próximo projeto
- Copy do site padronizada em sentence case (Work, Tech Stack e Contact), com correção de typos e de capitalização de títulos

### Removed

- Bloco de "assinatura em código" da seção About
- Classes utilitárias sem uso em `app/globals.css`

## [2.3.1] - 2026-08-20

### Added

- Case Houston: exibição da biblioteca de componentes, um specimen sheet dos primitivos shadcn/ui + Radix retokenizados ao lado da camada de domínio escrita do zero, deixando explícita a divisão entre base e código próprio
- Case Houston: nota de atribuição de time, creditando o módulo de pagamentos ao dev supervisionado

### Changed

- Título profissional atualizado de "Product Engineer" para "Software Engineer" em metadata, manifest, Open Graph e na home (EN e PT)
- Copy revisada em todo o site: em dashes substituídos por vírgulas, dois-pontos e fraseado mais natural
- Chips de data atualizados: Houston para 2025 e Sebrae OPP para 2026
- Componente `Labeled` extraído no conteúdo do case Houston

## [2.3.0] - 2026-08-03

### Added

- Internacionalização EN/PT: contexto de locale (`lib/i18n.tsx`), locale derivado do pathname, toggle de idioma no header e rotas espelho em `/pt` para a home e todos os case studies
- SEO: alternates `hreflang` e entradas PT no sitemap
- Recreações interativas em React substituindo screenshots nos case studies:
  - Houston — recriação da plataforma e o Schedule Builder como animação com cursor fantasma, detecção real de conflitos e respeito a `prefers-reduced-motion`
  - Sebrae OPP — recriação estática da plataforma com mapa da Paraíba, tokens de cor e tipografia originais
  - Revoluna — telas do app em frames de iPhone
- Case Houston: narrativa de UX ampliada com personas, ownership, trade-off de calendário e de papéis; tag "UI/UX Design"
- Links de hero dos cases: suporte a GitHub e texto de dica

### Changed

- Layout de case study extraído em um sistema de componentes composable (`components/case-study`), com Houston, Sebrae OPP e Revoluna reescritos sobre ele
- Animações de scroll dos cases suavizadas no mobile

### Fixed

- Triggers de animação obsoletos nas páginas de case study
- Violações das regras de hooks do React: `useLocale()` chamado condicionalmente no layout de case study e `setState` síncrono dentro de efeito no Schedule Builder

### Removed

- Navegação e links sociais não utilizados do footer, além de código morto na tela de agendas

## [2.2.1] - 2026-07-16

### Changed

- Imagens do case Houston atualizadas com maior resolução e qualidade
- Template de case study: imagem da solução movida para depois do texto, com fundo tingido pela cor de destaque do projeto
- Script `dev` limpa o cache `.next` antes de iniciar o servidor de desenvolvimento

## [2.2.0] - 2026-07-15

### Added

- Novo case study Sebrae OPP com screenshots reais, entrada na seção Work e no sitemap
- SEO: metadata por página, Open Graph e Twitter cards, ícones gerados (favicon e apple icon), `manifest`, `robots` e `sitemap`
- Imagens Open Graph geradas para a home e para os case studies
- Vercel Analytics
- Acessibilidade: suporte a `prefers-reduced-motion`, labels no formulário de contato e alt texts mais descritivos
- Cores de destaque (accent) por projeto no template de case study

### Changed

- Reposicionamento do copy como full-stack product engineer: Hero, bio da About, Tech Stack, tagline do Footer e descrições dos cases na seção Work
- Redesign dos cards de projeto da seção Work com imagens de fundo full-bleed e migração para os tokens de tema claro
- Extração do conteúdo dos cases Houston e Revoluna para componentes próprios (`houston-content`, `revoluna-content`)
- Substituição do GIF de 6.7MB do Schedule Builder (Houston) por vídeo de ~100KB (mp4/webm)
- Qualidade das imagens do Next.js Image padronizada em 90
- Reordenação das seções da página principal e da navegação
- Tagline do Hero dividida em duas linhas

### Fixed

- Metas do Lighthouse de acessibilidade: contraste, landmarks e LCP

### Removed

- Badge de disponibilidade da seção Contact
- Números das seções
- Grid de conteúdo principal do Footer

## [2.1.0] - 2026-07-09

### Added

- Nova dependência `react-icons` para ícones de tecnologia
- Terminal animado na seção Tech Stack com `TextPlugin` do GSAP

### Changed

- Redesign da seção Tech Stack: grade de ícones por categoria (Frontend, Backend & Data, Languages & Tools) no lugar das barras de skill
- Atualização das skills da seção About para refletir o stack real
- Atualização das tags de tecnologia dos cases Houston e Revoluna na seção Work
- Nova foto da seção About com alt text mais descritivo
- Animação de stagger do Header ampliada para incluir logo e botão do menu mobile
- Textos das secções do Hero e About

### Removed
- Botão Resume/CV da navegação do Header

## [2.0.0] - 2026-02-16

### Added

- Novo smoke test do fluxo de contato com `node:test` em `tests/contact-handler.smoke.test.ts`
- Novo script `test:smoke` no `package.json`
- Novo handler desacoplado da rota em `app/api/contact/handler.ts`
- Novas variações visuais com cores no tema global

### Changed

- Novo design das seções da página principal: About, Work, Tech Stack, Header, Contact, Footer e Hero
- Novo design dos case studies Houston e Revoluna
- Ajustes de conteúdo textual dos cases Houston e Revoluna
- Reordenação dos cases na seção Work
- Template compartilhado para estrutura dos case studies
- Ocultação do Header/Footer globais nas rotas de case study (`/work/*`)
- Centralização dos links e dados de perfil em configuração única (`config/site.ts`)
- Atualização completa do README para refletir a arquitetura e fluxos atuais
- Substituição de hovers imperativos por abordagem declarativa com classes CSS

### Fixed

- Correção dos links de GitHub e LinkedIn
- Ajuste de layout da imagem da feature Deep Linking no case Revoluna
- Reforço da validação e do tratamento de erros da rota de contato
- Evolução do rate limiting da rota de contato (incluindo retorno de `Retry-After`)
- Correção de entidades HTML para conformidade do lint

### Removed

- Remoção de indicadores da seção About
- Remoção do componente `Nav` não utilizado
- Remoção de código morto e blocos comentados

## [1.2.3] - 2026-01-20

### Changed

- Atualiza imagens para os cases Houston e Revoluna e substitui background images por componente Next.js Image para melhor desempenho
- Adiciona novas imagens para seção Work dos cases Houston e Revoluna

### Fixed

- Padroniza paddings das seções da página principal
- Melhora a responsividade dos botões

## [1.2.2] - 2026-01-05

### Fixed

- Reponsividade do hero e about na página principal, especialmente em telas 16:9

## [1.2.1] - 2026-01-05

### Changed

- Limpeza de código e melhora na responsividade do hero principal

### Fixed

- Reponsividade do hero principal, especialmente em telas com zoom 125% ou mais

## [1.2.0] - 2026-01-05

### Added
- Honeypot field e rate limiting para submissões no formulário de contato

## [1.1.1] - 2026-01-05

### Removed
- Imagem de API Call do FlutterFlow no case Revoluna

### Fixed
- Tradução do changelog

## [1.1.0] - 2026-01-05

### Changed
- Substitui anchor tags por Next Link para melhor navegação
- Atualiza seção de Deep Linking do case Revoluna para melhor responsividade

### Fixed
- Remove importação desnecessária

## [1.0.1] - 2026-01-05

### Added
- Seção Deep Linking no case Revoluna

## [1.0.0] - 2026-01-05

### Added
- Release inicial do portfólio
- Página inicial com seções hero, about, work e contact
- Página de estudo de caso Revoluna
- Página de estudo de caso da Houston
- Componente de navegação com link para o próximo projeto
- Design responsivo com dimensionamento baseado em clamp
- Estilos globais com propriedades personalizadas CSS
