/* Ver app/pt/opengraph-image.tsx: a convenção de arquivo do Next não
   atravessa segmentos, e sem este arquivo o case em português sai sem
   og:image. */
export { default, size, contentType, alt } from "@/app/work/revoluna/opengraph-image";
