'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappPhone } from '@/lib/contact-schema'

export function WhatsAppFab() {
  const waLink = `https://wa.me/${whatsappPhone}?text=Hi%20French%20Compass%2C%20I%27d%20like%20to%20know%20more%20about%20your%20French%20classes`

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2440E8]"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
