import { CodeBlock } from "@/components/docs/code-block"

export function RateLimitSection() {
  return (
    <section id="ratelimit" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Rate Limiting</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          A Application API implementa rate limiting para prevenir abuso. Os limites sao
          aplicados por chave API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 text-center">
          <p className="text-3xl font-bold text-primary">240</p>
          <p className="mt-1 text-sm text-muted-foreground">requisicoes / minuto</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 text-center">
          <p className="text-3xl font-bold text-primary">10</p>
          <p className="mt-1 text-sm text-muted-foreground">requisicoes / segundo (burst)</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 text-center">
          <p className="text-3xl font-bold text-primary">Per Key</p>
          <p className="mt-1 text-sm text-muted-foreground">por chave API</p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Headers de Rate Limit</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Toda resposta inclui headers indicando o estado atual do rate limit:
        </p>
        <CodeBlock
          language="http"
          title="Response Headers"
          code={`X-RateLimit-Limit: 240
X-RateLimit-Remaining: 235
X-RateLimit-Reset: 1642686400`}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-4 py-3 text-left font-medium text-foreground">Header</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Descricao</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-card">
              <td className="px-4 py-3">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">X-RateLimit-Limit</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">Numero maximo de requisicoes permitidas por minuto</td>
            </tr>
            <tr className="bg-secondary/50">
              <td className="px-4 py-3">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">X-RateLimit-Remaining</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">Numero de requisicoes restantes na janela atual</td>
            </tr>
            <tr className="bg-card">
              <td className="px-4 py-3">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">X-RateLimit-Reset</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">Timestamp Unix de quando o limite sera resetado</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-chart-5/30 bg-chart-5/5 p-5">
        <h3 className="text-base font-semibold text-chart-5">Dica</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Se voce receber um erro <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">429 Too Many Requests</code>,
          aguarde ate o timestamp indicado no header <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">X-RateLimit-Reset</code>{" "}
          antes de enviar novas requisicoes. Implemente um backoff exponencial para lidar com rate limits de forma elegante.
        </p>
      </div>
    </section>
  )
}
