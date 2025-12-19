import { fontProviders } from 'astro/config';

export default [
  {
    name: "Inter",
    provider: fontProviders.google(),
    cssVariable: "--font-sans",
    fallbacks: ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Lucida Grande', 'Arial', 'sans-serif'],
    //subsets: ["latin"],
    weights: ["300 700"],
  },
  {
    name: "Cormorant Garamond",
    provider: fontProviders.google(),
    //subsets: ["latin"],
    cssVariable: "--font-serif",
    fallbacks: [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    weights: [300, 400, 500, 600, 700, 800],
  },
]