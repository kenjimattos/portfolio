# Changelog

## [3.0.0] - 2026-09-03

### Added

- Vocabulário de marcação à mão (`components/marks.tsx` e `lib/pen.ts`): a caneta de revisão como peça do site, com três laços, duas sublinhas, a seta e o visto. O traço não é uma curva com espessura constante, é um contorno preenchido gerado a partir de uma linha de centro mais um perfil de largura — a espessura muda com a direção, como a ponta chanfrada de um marcador segurado num ângulo fixo. Quem anda na animação é uma máscara por cima do preenchimento, e um `ResizeObserver` redesenha a marcação quando a palavra cresce
- Régua de uso da caneta: uma marcação por seção, sempre sobre a afirmação de que o leitor deveria desconfiar. Marca de revisor repetida em tudo vira textura, e textura não afirma nada
- Nota manuscrita sobre o masthead da home: um recorte de papel pousado no centro da tela, com o laço em volta de "em produção" e a seta apontando para baixo. Ela é desenhada na carga, não na rolagem — uma pista de rolagem que só aparece depois de rolar chega tarde demais — e sai presa ao scrub no primeiro meio-viewport
- A mesma nota abre os cases, com uma frase do projeto (nunca sobre o site ou o método) e um `href` que leva à decisão que prova aquilo que ela afirma. `note` é campo opcional do hero: um case sem nada de surpreendente para afirmar não tem nota
- Sistema editorial de case study (`components/case-study/case-editorial.tsx`): o case deixa de ser um tour de produto e vira um problema com duas ou três decisões, na espinha CaseHero → CaseConstraints → CaseDecisions → CaseOutcome → CaseEvidence → CaseCTA, com orçamento de leitura de 90 segundos. `CaseDecision` põe lado a lado a escolha de design e a de implementação para o mesmo problema, com duas regras nos tipos: `cost` é obrigatório (decisão sem custo declarado ou não foi decisão, ou está sendo vendida) e `authorship: "assisted"` existe para o verbo ser honesto onde a implementação profunda foi escrita com IA
- Hero de plano dividido: uma fronteira `--split` governa onde o campo escuro começa, onde a manchete troca tinta por papel e quanto da capa já está descoberto. A manchete é escrita duas vezes com a mesma quebra, para uma linha só de texto poder ser preta no papel e branca no escuro, cortada no meio da palavra
- Rolagem suave com Lenis (`lib/smooth-scroll.tsx`), com reset de posição na troca de rota
- Botão de recorte como padrão de ação (`.pen-btn`): papel, filete de tinta, sombra dura e a caneta escrevendo a seta no gesto. Cobre o envio do formulário, a chamada do case, o "próximo projeto", o "ver case" das linhas de projeto e o GitHub, com `data-size="lg"` e `.pen-btn-self` para quem responde ao próprio cursor
- O e-mail vai para a área de transferência: três caminhos (`navigator.clipboard`, o `execCommand` antigo e, em último caso, o endereço selecionado com a instrução certa para o sistema de quem lê), e um aviso com o visto sendo escrito na hora, também anunciado por `aria-live`
- Novas provas dentro dos cases: specimen do sistema e exhibit de acesso no Houston, exhibit de design system e tela de WhatsApp no Revoluna, tela de conciliação e exhibit de design system no Finance, e o arco de fundação → IndicatorBar → sistema em uso no Sebrae
- Imagem de Open Graph redesenhada no sistema editorial: papel, tinta e o campo vermelho no pé, no lugar do fundo escuro com os gradientes que saíram do site no redesign. O cartão passa a ser o masthead, e os quatro cases usam o mesmo desenho com a stack como linha de índice sob o wordmark
- Archivo (500 e 900) e Martian Mono (400) versionados em `assets/fonts/`, com as licenças OFL: o Satori desenha o Open Graph no servidor e não enxerga as fontes carregadas pelo `next/font`
- Capas novas dos quatro projetos, e o mesmo enquadramento da lista de trabalhos passa a valer no topo de cada case

### Changed

- Redesign editorial de todo o site: papel e tinta com acentos vermelho e violeta, no lugar do sistema anterior. Masthead da home reanimado e colunas verticais de palavras no Sobre com queda por rolagem
- Os quatro cases reescritos sobre o sistema editorial — Sebrae OPP, Houston, Revoluna e Finance — cada um com as recriações em React deixando de ser vitrine no topo para virar prova dentro da decisão que sustentam
- Finance muda de premissa: cai "nenhum banco mostra a fatura em aberto" e entra o eixo verdadeiro, os apps mostram a fatura e a despesa mas não ligam as duas na data certa, porque arquivam a compra pela data da transação
- Sebrae abre a lista de projetos na home
- O acento de cada linha de projeto alterna entre vermelho e violeta, com a cor escrita uma vez na linha: nome, sombra do recorte e caneta acendem juntos em vez de três regras precisando concordar
- As setas tipográficas (`→`, `↗`, `←`) somem de todo o site, substituídas pela caneta escrita no gesto — índice do masthead, lista de redes, botões e a volta no cabeçalho do case
- O cabeçalho do case troca o link único de volta por Home / Work / About, no mesmo padrão do header global
- O hero do case passa a ter um caminho só, a capa do projeto, e a etiqueta de crédito sai de cima da imagem para uma faixa própria abaixo dela — com o palco crescendo pela faixa, para a capa não encolher
- Título profissional e copy revisados; travessões padronizados fora dos textos; nomes de tecnologia escritos em palavras neutras de idioma
- O preto do site vira um token só (`ink`)
- Seção Tech Stack oculta na home
- Fontes e imagens do Revoluna reorganizadas, com logos e ícones refeitos

### Fixed

- Navegação com âncora abre a página no lugar pedido: o Next levava o leitor até a âncora e o Lenis o trazia de volta ao topo no quadro seguinte. Agora a navegação resolve um alvo em vez de um zero, e a âncora é remedida depois do refresh porque a página continua crescendo enquanto as fontes assentam e as recriações montam
- A seta do gesto passa a seguir o `:hover` do anfitrião, e não o tipo de dispositivo: no toque o navegador mantém um hover pegajoso, e perguntar por `(hover: hover)` desligava a caneta justamente no estado que ela deveria acompanhar
- A nota do case sai antes de a manchete se escrever: as duas ocupavam o mesmo trecho de rolagem, e a frase era escrita debaixo do papel
- Manchetes de case com altura de linha corrigida, resolvendo o corte de letras que passam da baseline
- Números do Revoluna auditados contra o repositório do app: 25 custom actions (não 27), 3 custom widgets (não 5), 16 versões no CHANGELOG (o 38 era o build do pubspec) e uma categoria inteira que faltava, as 9 custom functions — o número honesto é maior que o publicado, 37 peças de Dart próprio em três categorias
- Números do Sebrae auditados no repositório do projeto: 17 fontes oficiais e 29 geradores de ETL, no lugar dos 13 e 27 desatualizados
- Páginas em português não emitiam `og:image`: a convenção de arquivo do Next só vale no segmento onde o arquivo mora, e não havia nenhum sob `app/pt/`
- Botão de menu volta a ficar visível no mobile
- Fiapos de tinta nas marcações em repouso e a ponta arredondada pintando um pingo no começo do caminho — dois defeitos que sumiram junto com a máquina de traço esticado
- A Intel One Mono, a monoespaçada do design system do OPP, ganha pilha de fallback: ela não está na base de métricas do `next/font`, então o build avisava a cada compilação e uma falha no download caía no `monospace` genérico, que no Windows é a Courier New. A ordem da pilha é por avanço e não por x-height, porque numa recriação de interface monoespaçada a largura do caractere é a largura das colunas

### Removed

- Os dois layouts antigos de case (`case-layout` e `case-study-template`) e os módulos que nenhuma página importa depois dos redesigns: embeds de biblioteca de componentes, montagem de escala e times do Houston, tela de plantões do Revoluna, exhibit de glass e tela de riscos do Sebrae, com os dados e primitivos que só eles usavam
- As capturas de tela dos projetos em `public/`, já substituídas pelas recriações em React
- `non-scaling-stroke` e os três remendos que ele obrigava (medir o caminho no espaço da tela, o vão triplo do tracejado e a folga da ponta arredondada): o traço passa a ser gerado na medida da palavra em vez de esticado até ela
- Botão de currículo no header

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
