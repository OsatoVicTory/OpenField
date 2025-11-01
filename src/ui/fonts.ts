import localFont from 'next/font/local';

export const jetBrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Medium.ttf', weight: '570', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/JetBrainsMono-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-jetbrainsmono',
  display: 'swap',
});