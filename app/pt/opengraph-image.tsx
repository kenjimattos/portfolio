/* O cartão do /pt é o mesmo do /. Não é um re-export por preguiça: a
   convenção de arquivo do Next só vale no segmento onde o arquivo mora,
   então sem isto a página em português sai SEM og:image nenhuma, e
   compartilhar o link em português não mostra imagem. */
export { default, size, contentType, alt } from "@/app/opengraph-image";
