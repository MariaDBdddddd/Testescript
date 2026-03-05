import { CodeBlock } from "@/components/docs/code-block"
import { EndpointBadge } from "@/components/docs/endpoint-badge"
import { ParamTable } from "@/components/docs/param-table"

export function ServersSection({ sub }: { sub?: string }) {
  if (sub === "servers-list") return <ServersListSection />
  if (sub === "servers-get") return <ServersGetSection />
  if (sub === "servers-create") return <ServersCreateSection />
  if (sub === "servers-update-details") return <ServersUpdateDetailsSection />
  if (sub === "servers-update-build") return <ServersUpdateBuildSection />
  if (sub === "servers-update-startup") return <ServersUpdateStartupSection />
  if (sub === "servers-suspend") return <ServersSuspendSection />
  if (sub === "servers-delete") return <ServersDeleteSection />

  return (
    <section id="servers" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gerenciamento de Servers</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Endpoints para gerenciamento completo do ciclo de vida dos servers, incluindo
          criacao, configuracao, suspensao e delecao.
        </p>
      </div>
      <div className="rounded-lg border border-chart-5/30 bg-chart-5/5 p-4">
        <p className="text-sm text-chart-5">
          <strong>Acesso Administrativo Necessario:</strong> Todos esses endpoints requerem
          uma Application API Key com privilegios de admin.
        </p>
      </div>
      <div className="space-y-3">
        <EndpointBadge method="GET" path="/api/application/servers" />
        <EndpointBadge method="GET" path="/api/application/servers/{server}" />
        <EndpointBadge method="POST" path="/api/application/servers" />
        <EndpointBadge method="PATCH" path="/api/application/servers/{server}/details" />
        <EndpointBadge method="PATCH" path="/api/application/servers/{server}/build" />
        <EndpointBadge method="PATCH" path="/api/application/servers/{server}/startup" />
        <EndpointBadge method="POST" path="/api/application/servers/{server}/suspend" />
        <EndpointBadge method="POST" path="/api/application/servers/{server}/unsuspend" />
        <EndpointBadge method="POST" path="/api/application/servers/{server}/reinstall" />
        <EndpointBadge method="DELETE" path="/api/application/servers/{server}" />
      </div>
      <p className="text-sm text-muted-foreground">
        Selecione um endpoint no menu lateral para ver detalhes completos.
      </p>
    </section>
  )
}

function ServersListSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Listar Todos os Servers</h2>
        <p className="mt-2 text-muted-foreground">
          Retorna uma lista paginada de todos os servers no painel.
        </p>
      </div>
      <EndpointBadge method="GET" path="/api/application/servers" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Query Parameters</h3>
        <ParamTable
          params={[
            { name: "page", type: "integer", description: "Numero da pagina", default: "1" },
            { name: "per_page", type: "integer", description: "Resultados por pagina (1-100)", default: "50" },
            { name: "filter[name]", type: "string", description: "Filtrar por nome do server" },
            { name: "filter[uuid]", type: "string", description: "Filtrar por UUID" },
            { name: "filter[external_id]", type: "string", description: "Filtrar por ID externo" },
            { name: "filter[image]", type: "string", description: "Filtrar por imagem Docker" },
            { name: "sort", type: "string", description: "Ordenar: id, uuid, name, created_at, updated_at", default: "id" },
            { name: "include", type: "string", description: "Relacionamentos: allocations, user, subusers, nest, egg, variables, node, databases, backups" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl "https://seu-painel.com/api/application/servers?include=user,node&per_page=25" \\
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
      "object": "server",
      "attributes": {
        "id": 1,
        "external_id": null,
        "uuid": "d3aac109-e5e0-4331-b03e-3454f7e02bbe",
        "identifier": "d3aac109",
        "name": "Minecraft Server",
        "description": "Um server de Minecraft para amigos",
        "status": null,
        "suspended": false,
        "limits": {
          "memory": 512,
          "swap": 0,
          "disk": 1024,
          "io": 500,
          "cpu": 100,
          "threads": null,
          "oom_disabled": false
        },
        "feature_limits": {
          "databases": 1,
          "allocations": 1,
          "backups": 1
        },
        "user": 1,
        "node": 1,
        "allocation": 1,
        "nest": 1,
        "egg": 1,
        "created_at": "2024-01-15T10:26:32+00:00",
        "updated_at": "2024-01-15T10:26:32+00:00"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1
    }
  }
}`}
        />
      </div>
    </section>
  )
}

function ServersGetSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Detalhes do Server</h2>
        <p className="mt-2 text-muted-foreground">
          Retorna informacoes detalhadas de um server especifico.
        </p>
      </div>
      <EndpointBadge method="GET" path="/api/application/servers/{server}" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "server", type: "integer", required: true, description: "ID do server" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Query Parameters</h3>
        <ParamTable
          params={[
            { name: "include", type: "string", description: "Relacionamentos: allocations, user, subusers, nest, egg, variables, node, databases, backups" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl "https://seu-painel.com/api/application/servers/1?include=allocations,user,node" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground">Buscar por External ID</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Use o endpoint alternativo para buscar por external_id:
        </p>
        <div className="mt-3">
          <EndpointBadge method="GET" path="/api/application/servers/external/{external_id}" />
        </div>
      </div>
    </section>
  )
}

function ServersCreateSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Criar Server</h2>
        <p className="mt-2 text-muted-foreground">
          Cria um novo server no painel. Este e o endpoint mais complexo, exigindo
          configuracao de limites, egg e allocation.
        </p>
      </div>
      <EndpointBadge method="POST" path="/api/application/servers" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "name", type: "string", required: true, description: "Nome do server" },
            { name: "user", type: "integer", required: true, description: "ID do usuario dono do server" },
            { name: "egg", type: "integer", required: true, description: "ID do Egg a ser usado" },
            { name: "docker_image", type: "string", required: false, description: "Override da imagem Docker padrão" },
            { name: "startup", type: "string", required: false, description: "Override do comando de startup" },
            { name: "environment", type: "object", required: false, description: "Variaveis de ambiente" },
            { name: "limits", type: "object", required: true, description: "Limites de recursos (veja abaixo)" },
            { name: "feature_limits", type: "object", required: true, description: "Limites de funcionalidades (veja abaixo)" },
            { name: "allocation", type: "object", required: true, description: "Configuracao de allocation (veja abaixo)" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Limits Object</h3>
        <ParamTable
          params={[
            { name: "memory", type: "integer", required: true, description: "Limite de memoria em MB" },
            { name: "swap", type: "integer", required: true, description: "Limite de swap em MB (0 para desabilitar)" },
            { name: "disk", type: "integer", required: true, description: "Espaco em disco em MB" },
            { name: "io", type: "integer", required: true, description: "Block IO weight (10-1000)" },
            { name: "cpu", type: "integer", required: true, description: "Limite de CPU em porcentagem" },
            { name: "threads", type: "string", required: false, description: "CPU thread pinning" },
            { name: "oom_disabled", type: "boolean", required: false, description: "Desabilitar OOM killer" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Feature Limits Object</h3>
        <ParamTable
          params={[
            { name: "databases", type: "integer", required: true, description: "Maximo de databases permitidas" },
            { name: "allocations", type: "integer", required: true, description: "Maximo de allocations permitidas" },
            { name: "backups", type: "integer", required: true, description: "Maximo de backups permitidos" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Allocation Object</h3>
        <ParamTable
          params={[
            { name: "default", type: "integer", required: true, description: "ID da allocation primaria" },
            { name: "additional", type: "array", required: false, description: "IDs de allocations adicionais" },
          ]}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X POST "https://seu-painel.com/api/application/servers" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Meu Novo Server",
    "user": 1,
    "egg": 5,
    "docker_image": "quay.io/pterodactyl/core:java",
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "environment": {
      "MINECRAFT_VERSION": "latest",
      "SERVER_JARFILE": "server.jar"
    },
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 2048,
      "io": 500,
      "cpu": 100,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 5
    },
    "allocation": {
      "default": 1
    }
  }'`}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Response</h3>
        <CodeBlock
          language="json"
          title="201 Created"
          code={`{
  "object": "server",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "bf3b26c0-9d2e-4d8f-8c8a-1234567890ab",
    "identifier": "bf3b26c0",
    "name": "Meu Novo Server",
    "description": "",
    "status": null,
    "suspended": false,
    "limits": {
      "memory": 1024,
      "swap": 0,
      "disk": 2048,
      "io": 500,
      "cpu": 100,
      "threads": null,
      "oom_disabled": false
    },
    "feature_limits": {
      "databases": 2,
      "allocations": 1,
      "backups": 5
    },
    "user": 1,
    "node": 1,
    "allocation": 1,
    "nest": 1,
    "egg": 5,
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T14:30:45+00:00"
  }
}`}
        />
      </div>
    </section>
  )
}

function ServersUpdateDetailsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Atualizar Detalhes do Server</h2>
        <p className="mt-2 text-muted-foreground">
          Atualiza nome, descricao e dono do server.
        </p>
      </div>
      <EndpointBadge method="PATCH" path="/api/application/servers/{server}/details" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "name", type: "string", required: false, description: "Nome do server" },
            { name: "user", type: "integer", required: false, description: "ID do usuario dono" },
            { name: "external_id", type: "string", required: false, description: "ID externo" },
            { name: "description", type: "string", required: false, description: "Descricao do server" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X PATCH "https://seu-painel.com/api/application/servers/2/details" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Nome Atualizado",
    "description": "Descricao atualizada do server"
  }'`}
        />
      </div>
    </section>
  )
}

function ServersUpdateBuildSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Atualizar Build do Server</h2>
        <p className="mt-2 text-muted-foreground">
          Atualiza os limites de recursos e funcionalidades do server.
        </p>
      </div>
      <EndpointBadge method="PATCH" path="/api/application/servers/{server}/build" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "allocation", type: "integer", required: true, description: "ID da allocation primaria" },
            { name: "memory", type: "integer", required: true, description: "Memoria em MB" },
            { name: "swap", type: "integer", required: true, description: "Swap em MB" },
            { name: "disk", type: "integer", required: true, description: "Disco em MB" },
            { name: "io", type: "integer", required: true, description: "Block IO weight (10-1000)" },
            { name: "cpu", type: "integer", required: true, description: "CPU em porcentagem" },
            { name: "threads", type: "string", required: false, description: "CPU thread pinning" },
            { name: "feature_limits", type: "object", required: true, description: "Limites de funcionalidades" },
            { name: "add_allocations", type: "array", required: false, description: "IDs de allocations para adicionar" },
            { name: "remove_allocations", type: "array", required: false, description: "IDs de allocations para remover" },
            { name: "oom_disabled", type: "boolean", required: false, description: "Desabilitar OOM killer" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X PATCH "https://seu-painel.com/api/application/servers/2/build" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "allocation": 1,
    "memory": 2048,
    "swap": 0,
    "disk": 4096,
    "io": 500,
    "cpu": 200,
    "feature_limits": {
      "databases": 5,
      "allocations": 2,
      "backups": 10
    }
  }'`}
        />
      </div>
    </section>
  )
}

function ServersUpdateStartupSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Atualizar Startup do Server</h2>
        <p className="mt-2 text-muted-foreground">
          Atualiza o comando de startup e variaveis de ambiente do server.
        </p>
      </div>
      <EndpointBadge method="PATCH" path="/api/application/servers/{server}/startup" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "startup", type: "string", required: true, description: "Comando de startup do server" },
            { name: "environment", type: "object", required: true, description: "Variaveis de ambiente" },
            { name: "egg", type: "integer", required: true, description: "ID do Egg" },
            { name: "image", type: "string", required: false, description: "Override da imagem Docker" },
            { name: "skip_scripts", type: "boolean", required: false, description: "Pular scripts de instalacao" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X PATCH "https://seu-painel.com/api/application/servers/2/startup" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "environment": {
      "MINECRAFT_VERSION": "1.20.4",
      "SERVER_JARFILE": "server.jar",
      "BUILD_TYPE": "recommended"
    },
    "egg": 5,
    "image": "quay.io/pterodactyl/core:java",
    "skip_scripts": false
  }'`}
        />
      </div>
    </section>
  )
}

function ServersSuspendSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Suspender / Reativar Server</h2>
        <p className="mt-2 text-muted-foreground">
          Suspender um server impede que ele seja iniciado. Reativar remove a suspensao.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">Suspender</h3>
          <EndpointBadge method="POST" path="/api/application/servers/{server}/suspend" />
          <div className="mt-3">
            <CodeBlock
              language="bash"
              title="cURL"
              code={`curl -X POST "https://seu-painel.com/api/application/servers/2/suspend" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">Reativar</h3>
          <EndpointBadge method="POST" path="/api/application/servers/{server}/unsuspend" />
          <div className="mt-3">
            <CodeBlock
              language="bash"
              title="cURL"
              code={`curl -X POST "https://seu-painel.com/api/application/servers/2/unsuspend" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">Reinstalar</h3>
          <EndpointBadge method="POST" path="/api/application/servers/{server}/reinstall" />
          <div className="mt-3">
            <CodeBlock
              language="bash"
              title="cURL"
              code={`curl -X POST "https://seu-painel.com/api/application/servers/2/reinstall" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-foreground">
          <strong>Response:</strong> Todos retornam HTTP{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">204 No Content</code>{" "}
          em caso de sucesso.
        </p>
      </div>
    </section>
  )
}

function ServersDeleteSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Deletar Server</h2>
        <p className="mt-2 text-muted-foreground">
          Deleta um server do painel. <strong className="text-destructive">Essa acao e irreversivel.</strong>
        </p>
      </div>
      <EndpointBadge method="DELETE" path="/api/application/servers/{server}" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Query Parameters</h3>
        <ParamTable
          params={[
            { name: "force", type: "boolean", required: false, description: "Forcar delecao mesmo se o server estiver rodando" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X DELETE "https://seu-painel.com/api/application/servers/2?force=true" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">
          <strong>Cuidado:</strong> Use o parametro <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">force=true</code>{" "}
          com cautela, pois pode causar perda de dados irreversivel.
        </p>
      </div>
    </section>
  )
}
