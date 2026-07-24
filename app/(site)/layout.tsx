import { SiteHeader } from '@/components/site-header'
import { ContactDock } from '@/components/ContactDock'
import { ScrollProgress } from '@/components/motion/ScrollProgress'

/* Marketing-site chrome. Everything under app/(site) gets the header, the
   contact dock and the scroll-progress bar. The Studio route (app/studio) sits
   OUTSIDE this group and therefore renders bare.

   The header and dock are direct children here (not inside any transformed
   wrapper) so their position:fixed / backdrop-blur keep working. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-lg bg-azimuth px-4 py-2 text-sm font-medium text-foam focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <ScrollProgress />
      <main id="main">{children}</main>
      <ContactDock />
    </>
  )
}
