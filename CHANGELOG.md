# Changelog

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
