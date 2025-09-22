import type React from "react"
import "./globals.css"

export const metadata = {
  title: "FrenchQuest",
  description: "Learn French A1",
    generator: 'v0.app'
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
