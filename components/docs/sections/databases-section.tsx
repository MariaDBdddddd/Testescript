import { CodeBlock } from "@/components/docs/code-block"
import { EndpointBadge } from "@/components/docs/endpoint-badge"
import { ParamTable } from "@/components/docs/param-table"

export function DatabasesSection({ sub }: { sub?: string }) {
  if (sub === "databases-list") return <DatabasesListSection />
  if (sub === "databases-create") return <DatabasesCreateSection />

  return (
    <section id="databases" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gerenciamento de Databases</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Endpoints para gerenciar databases de servers atraves da Application API.
        </p>
      </div>
      <div className="space-y-3">
        <EndpointBadge method="GET" path="/api/application/servers/{server}/databases" />
        <EndpointBadge method="GET" path="/api/application/servers/{server}/databases/{database}" />
        <EndpointBadge method="POST" path="/api/application/servers/{server}/databases" />
        <EndpointBadge method="DELETE" path="/api/application/servers/{server}/databases/{database}" />
      </div>
    </section>
  )
}

function DatabasesListSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Listar Databases do Server</h2>
        <p className="mt-2 text-muted-foreground">
          Retorna todas as databases associadas a um server especifico.
        </p>
      </div>
      <EndpointBadge method="GET" path="/api/application/servers/{server}/databases" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "server", type: "integer", required: true, description: "ID do server" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl "https://seu-painel.com/api/application/servers/2/databases" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Response</h3>
        <CodeBlock
          language="json"
          title="200 OK"
          code={`{
  "object": "list",
  "data": [
    {
      "object": "server_database",
      "attributes": {
        "id": 3,
        "server": 2,
        "host": 1,
        "database": "s2_gamedata",
        "username": "u2_dbuser",
        "remote": "%",
        "max_connections": 50,
        "created_at": "2023-10-20T10:30:00+00:00",
        "updated_at": "2023-10-20T10:30:00+00:00"
      }
    }
  ]
}`}
        />
      </div>
    </section>
  )
}

function DatabasesCreateSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Criar Database</h2>
        <p className="mt-2 text-muted-foreground">
          Cria uma nova database para o server especificado.
        </p>
      </div>
      <EndpointBadge method="POST" path="/api/application/servers/{server}/databases" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "server", type: "integer", required: true, description: "ID do server" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "database", type: "string", required: true, description: "Nome da database" },
            { name: "remote", type: "string", required: true, description: "Hosts remotos permitidos (use % para todos)" },
            { name: "host", type: "integer", required: true, description: "ID do database host" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X POST "https://seu-painel.com/api/application/servers/2/databases" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "database": "s2_novadatabase",
    "remote": "%",
    "host": 1
  }'`}
        />
      </div>
    </section>
  )
}
