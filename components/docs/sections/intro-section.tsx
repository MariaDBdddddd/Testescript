import { CodeBlock } from "@/components/docs/code-block"
import { Server, Users, Database, Key, Shield, Zap } from "lucide-react"

export function IntroSection() {
  return (
    <section id="intro" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Pterodactyl Panel API
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
          Referencia completa da API do Pterodactyl Panel. Dois tipos de API estao
          disponiveis: a <strong className="text-foreground">Client API</strong> para
          usuarios gerenciarem seus proprios servers, e a{" "}
          <strong className="text-foreground">Application API</strong> para administradores
          controlarem todo o painel.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: Server,
            title: "Server Management",
            desc: "Criar, atualizar, suspender e deletar servers com controle total de recursos.",
          },
          {
            icon: Users,
            title: "User Management",
            desc: "CRUD completo de contas de usuario com permissoes e external IDs.",
          },
          {
            icon: Database,
            title: "Database Management",
            desc: "Gerenciar databases de servers, hosts e permissoes de acesso.",
          },
          {
            icon: Key,
            title: "Autenticacao",
            desc: "Bearer Token com chaves Client (ptlc_) e Application (ptla_).",
          },
          {
            icon: Shield,
            title: "Rate Limiting",
            desc: "240 requests/min por chave API, com burst de ate 10 req/seg.",
          },
          {
            icon: Zap,
            title: "JSON API",
            desc: "Respostas padronizadas em JSON com paginacao e includes.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-base font-semibold text-foreground">Base URLs</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Application API:</span>
            <CodeBlock
              code="https://seu-painel.com/api/application"
              language="text"
            />
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Client API:</span>
            <CodeBlock
              code="https://seu-painel.com/api/client"
              language="text"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
