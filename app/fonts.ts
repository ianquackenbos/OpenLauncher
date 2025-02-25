import { Quicksand, SUSE } from 'next/font/google'

export const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})

export const suse = SUSE({
  subsets: ['latin'],
  variable: '--font-suse',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
}) 