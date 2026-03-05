"use client"

import { useState } from "react"
import { Sidebar } from "@/components/docs/sidebar"
import { IntroSection } from "@/components/docs/sections/intro-section"
import { AuthSection } from "@/components/docs/sections/auth-section"
import { UsersSection } from "@/components/docs/sections/users-section"
import { ServersSection } from "@/components/docs/sections/servers-section"
import { DatabasesSection } from "@/components/docs/sections/databases-section"
import { ErrorsSection } from "@/components/docs/sections/errors-section"
import { RateLimitSection } from "@/components/docs/sections/ratelimit-section"
import { ExamplesSection } from "@/components/docs/sections/examples-section"
import { Search } from "lucide-react"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro")

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderContent = () => {
    if (activeSection === "intro") return <IntroSection />
    if (activeSection === "auth") return <AuthSection />
    if (activeSection === "errors") return <ErrorsSection />
    if (activeSection === "ratelimit") return <RateLimitSection />
    if (activeSection === "examples") return <ExamplesSection />

    if (activeSection === "users" || activeSection.startsWith("users-")) {
      return <UsersSection sub={activeSection !== "users" ? activeSection : undefined} />
    }
    if (activeSection === "servers" || activeSection.startsWith("servers-")) {
      return <ServersSection sub={activeSection !== "servers" ? activeSection : undefined} />
    }
    if (activeSection === "databases" || activeSection.startsWith("databases-")) {
      return <DatabasesSection sub={activeSection !== "databases" ? activeSection : undefined} />
    }

    return <IntroSection />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
          <div className="flex items-center gap-3 pl-10 lg:pl-0">
            <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              v1.0+
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Application API Reference
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar na documentacao..."
              className="h-9 w-48 rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
            />
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
          {renderContent()}
        </main>

        <footer className="border-t border-border px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm text-muted-foreground">
              Documentacao da API do Pterodactyl Panel v1.0+ &mdash; Gerada para estudo e
              referencia
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
