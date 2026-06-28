import type { Metadata } from "next"
import "./globals.css"
import "./nrs-tokens.css"

export const metadata: Metadata = {
  title: "NRS Taxpayer Feedback | Nigeria Revenue Service",
  description:
    "Share your experience at any NRS office. This 3-minute anonymous survey helps the Nigeria Revenue Service improve service delivery.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
