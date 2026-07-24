import { Geologica } from "next/font/google";

// Typeface used by the real Houston platform. Loaded only where the
// recreated app is rendered; exposed as --font-geologica for the hst tokens.
export const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
  display: "swap",
});
