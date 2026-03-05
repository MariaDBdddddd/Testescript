import { CodeBlock } from "@/components/docs/code-block"

export function AuthSection() {
  return (
    <section id="auth" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Autenticacao</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          A API do Pterodactyl usa <strong className="text-foreground">Bearer Token</strong>{" "}
          para todas as requisicoes. Existem dois tipos de chave dependendo da API que voce
          esta acessando.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-2 inline-block rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            ptlc_
          </div>
          <h3 className="text-base font-semibold text-foreground">Client API Key</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Criada pelo usuario em{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">
              /account/api
            </code>
            . Acessa apenas recursos que o usuario tem permissao.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-2 inline-block rounded bg-chart-5/10 px-2.5 py-1 text-xs font-bold text-chart-5">
            ptla_
          </div>
          <h3 className="text-base font-semibold text-foreground">Application API Key</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Criada pelo admin em{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">
              /admin/api
            </code>
            . Acesso administrativo completo ao painel.
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Headers Obrigatorios</h3>
        <CodeBlock
          title="Headers de Autenticacao"
          language="http"
          code={`Authorization: Bearer SUA_API_KEY_AQUI
Content-Type: application/json
Accept: Application/vnd.pterodactyl.v1+json`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo: Client API</h3>
        <CodeBlock
          title="Listar servers do usuario autenticado"
          language="bash"
          code={`curl "https://seu-painel.com/api/client" \\
  -H "Authorization: Bearer ptlc_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Exemplo: Application API
        </h3>
        <CodeBlock
          title="Listar todos os usuarios (admin)"
          language="bash"
          code={`curl "https://seu-painel.com/api/application/users" \\
  -H "Authorization: Bearer ptla_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>

      <div className="rounded-lg border border-chart-5/30 bg-chart-5/5 p-5">
        <h3 className="text-base font-semibold text-chart-5">Boas Praticas de Seguranca</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-chart-5">{"•"}</span>
            Nunca exponha suas chaves API em codigo client-side ou repositorios publicos
          </li>
          <li className="flex gap-2">
            <span className="text-chart-5">{"•"}</span>
            Use restricoes de IP quando possivel
          </li>
          <li className="flex gap-2">
            <span className="text-chart-5">{"•"}</span>
            Rotacione suas chaves regularmente
          </li>
          <li className="flex gap-2">
            <span className="text-chart-5">{"•"}</span>
            Sempre use HTTPS para requisicoes API
          </li>
        </ul>
      </div>
    </section>
  )
}
