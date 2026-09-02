# Fontes do cartão de compartilhamento

O `next/font` carrega as fontes para o browser; o Satori, que desenha o
Open Graph no servidor, não enxerga nada disso e precisa dos arquivos.
Por isso as duas famílias do site estão versionadas aqui, nos cortes que
o cartão usa — e não buscadas no Google Fonts durante o build, para a
imagem sair igual em qualquer build.

| Arquivo | Família | Uso no cartão |
| --- | --- | --- |
| `archivo-900.ttf` | [Archivo](https://fonts.google.com/specimen/Archivo) 900 | o wordmark justificado e a assinatura do colophon |
| `archivo-500.ttf` | Archivo 500 | a tagline no campo vermelho |
| `martian-mono-400.ttf` | [Martian Mono](https://fonts.google.com/specimen/Martian+Mono) 400 | as linhas de meta (stack, etiqueta, domínio) |

São os subsets latinos servidos pelo Google Fonts. As duas famílias estão
sob a SIL Open Font License 1.1: `OFL-Archivo.txt` e `OFL-MartianMono.txt`.
