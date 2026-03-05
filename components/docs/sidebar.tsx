"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Server,
  Users,
  Key,
  BookOpen,
  ChevronDown,
  Database,
  Shield,
  Zap,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  {
    id: "intro",
    label: "Introducao",
    icon: BookOpen,
    children: [],
  },
  {
    id: "auth",
    label: "Autenticacao",
    icon: Key,
    children: [],
  },
  {
    id: "users",
    label: "Usuarios",
    icon: Users,
    children: [
      { id: "users-list", label: "Listar Usuarios" },
      { id: "users-get", label: "Detalhes do Usuario" },
      { id: "users-create", label: "Criar Usuario" },
      { id: "users-update", label: "Atualizar Usuario" },
      { id: "users-delete", label: "Deletar Usuario" },
    ],
  },
  {
    id: "servers",
    label: "Servers",
    icon: Server,
    children: [
      { id: "servers-list", label: "Listar Servers" },
      { id: "servers-get", label: "Detalhes do Server" },
      { id: "servers-create", label: "Criar Server" },
      { id: "servers-update-details", label: "Atualizar Detalhes" },
      { id: "servers-update-build", label: "Atualizar Build" },
      { id: "servers-update-startup", label: "Atualizar Startup" },
      { id: "servers-suspend", label: "Suspender / Reativar" },
      { id: "servers-delete", label: "Deletar Server" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: Database,
    children: [
      { id: "databases-list", label: "Listar Databases" },
      { id: "databases-create", label: "Criar Database" },
    ],
  },
  {
    id: "errors",
    label: "Erros",
    icon: AlertTriangle,
    children: [],
  },
  {
    id: "ratelimit",
    label: "Rate Limiting",
    icon: Shield,
    children: [],
  },
  {
    id: "examples",
    label: "Exemplos",
    icon: Zap,
    children: [],
  },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["users", "servers", "databases"])
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleExpanded = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleClick = (id: string) => {
    onSectionChange(id)
    setMobileOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-card p-2 text-foreground lg:hidden"
        aria-label="Alternar menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto border-r border-border bg-card py-6 transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Server className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">Pterodactyl API</h1>
              <span className="text-xs text-muted-foreground">v1.0+ Docs</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1 px-3">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => {
                  if (section.children.length > 0) {
                    toggleExpanded(section.id)
                  }
                  handleClick(section.id)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeSection === section.id || activeSection.startsWith(section.id + "-")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <section.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{section.label}</span>
                {section.children.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform",
                      expandedSections.includes(section.id) && "rotate-180"
                    )}
                  />
                )}
              </button>
              {section.children.length > 0 && expandedSections.includes(section.id) && (
                <div className="ml-6 mt-1 space-y-0.5 border-l border-border pl-3">
                  {section.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleClick(child.id)}
                      className={cn(
                        "block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                        activeSection === child.id
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
