import { CodeBlock } from "@/components/docs/code-block"

export function ErrorsSection() {
  return (
    <section id="errors" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Codigos de Erro</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          A API retorna codigos HTTP padrao para indicar sucesso ou falha de uma requisicao.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-4 py-3 text-left font-medium text-foreground">Status Code</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Descricao</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: "200", desc: "OK - Requisicao bem sucedida" },
              { code: "201", desc: "Created - Recurso criado com sucesso" },
              { code: "204", desc: "No Content - Acao executada com sucesso (delete, suspend)" },
              { code: "400", desc: "Bad Request - Dados de entrada invalidos" },
              { code: "401", desc: "Unauthorized - Chave API invalida" },
              { code: "403", desc: "Forbidden - Permissoes insuficientes" },
              { code: "404", desc: "Not Found - Recurso nao existe" },
              { code: "422", desc: "Validation Error - Valores de campos invalidos" },
              { code: "429", desc: "Too Many Requests - Rate limit excedido" },
              { code: "500", desc: "Internal Server Error - Erro interno do servidor" },
            ].map((error, i) => (
              <tr key={error.code} className={i % 2 === 0 ? "bg-card" : "bg-secondary/50"}>
                <td className="px-4 py-3">
                  <code
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      error.code.startsWith("2")
                        ? "bg-primary/10 text-primary"
                        : error.code.startsWith("4")
                          ? "bg-chart-5/10 text-chart-5"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {error.code}
                  </code>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{error.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Formato do Erro</h3>
        <CodeBlock
          language="json"
          title="Exemplo de Resposta de Erro (422)"
          code={`{
  "errors": [
    {
      "code": "ValidationException",
      "status": "422",
      "detail": "The email field is required.",
      "source": {
        "field": "email"
      }
    }
  ]
}`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Erro de Autenticacao</h3>
        <CodeBlock
          language="json"
          title="401 Unauthorized"
          code={`{
  "errors": [
    {
      "code": "InvalidCredentialsException",
      "status": "401",
      "detail": "The credentials provided were invalid."
    }
  ]
}`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Erro de Permissao</h3>
        <CodeBlock
          language="json"
          title="403 Forbidden"
          code={`{
  "errors": [
    {
      "code": "InsufficientPermissionsException",
      "status": "403",
      "detail": "This action requires additional permissions."
    }
  ]
}`}
        />
      </div>
    </section>
  )
}
