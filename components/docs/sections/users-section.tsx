import { CodeBlock } from "@/components/docs/code-block"
import { EndpointBadge } from "@/components/docs/endpoint-badge"
import { ParamTable } from "@/components/docs/param-table"

export function UsersSection({ sub }: { sub?: string }) {
  if (sub === "users-list") return <UsersListSection />
  if (sub === "users-get") return <UsersGetSection />
  if (sub === "users-create") return <UsersCreateSection />
  if (sub === "users-update") return <UsersUpdateSection />
  if (sub === "users-delete") return <UsersDeleteSection />

  return (
    <section id="users" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gerenciamento de Usuarios</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Os endpoints de Application API para gerenciamento de usuarios permitem
          administradores gerenciar todas as contas no painel. Operacoes completas de CRUD
          (Create, Read, Update, Delete).
        </p>
      </div>
      <div className="rounded-lg border border-chart-5/30 bg-chart-5/5 p-4">
        <p className="text-sm text-chart-5">
          <strong>Acesso Administrativo Necessario:</strong> Esses endpoints requerem
          privilegios de administrador e devem ser usados apenas por aplicacoes confiaveis
          com autenticacao adequada.
        </p>
      </div>
      <div className="space-y-3">
        <EndpointBadge method="GET" path="/api/application/users" />
        <EndpointBadge method="GET" path="/api/application/users/{user}" />
        <EndpointBadge method="GET" path="/api/application/users/external/{external_id}" />
        <EndpointBadge method="POST" path="/api/application/users" />
        <EndpointBadge method="PATCH" path="/api/application/users/{user}" />
        <EndpointBadge method="DELETE" path="/api/application/users/{user}" />
      </div>
      <p className="text-sm text-muted-foreground">
        Selecione um endpoint no menu lateral para ver detalhes completos.
      </p>
    </section>
  )
}

function UsersListSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Listar Todos os Usuarios</h2>
        <p className="mt-2 text-muted-foreground">
          Retorna uma lista paginada de todos os usuarios no painel.
        </p>
      </div>
      <EndpointBadge method="GET" path="/api/application/users" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Query Parameters</h3>
        <ParamTable
          params={[
            { name: "page", type: "integer", description: "Numero da pagina para paginacao", default: "1" },
            { name: "per_page", type: "integer", description: "Resultados por pagina (1-100)", default: "50" },
            { name: "filter[email]", type: "string", description: "Filtrar por email" },
            { name: "filter[uuid]", type: "string", description: "Filtrar por UUID do usuario" },
            { name: "filter[username]", type: "string", description: "Filtrar por username" },
            { name: "filter[external_id]", type: "string", description: "Filtrar por ID externo" },
            { name: "sort", type: "string", description: "Campo de ordenacao: id, uuid, username, email, created_at, updated_at", default: "id" },
            { name: "include", type: "string", description: "Incluir relacionamentos (servers)" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl "https://seu-painel.com/api/application/users?include=servers&per_page=25" \\
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
      "object": "user",
      "attributes": {
        "id": 1,
        "external_id": null,
        "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
        "username": "system",
        "email": "[email protected]",
        "first_name": "System",
        "last_name": "Administrator",
        "language": "en",
        "root_admin": true,
        "2fa": false,
        "created_at": "2023-01-15T10:26:32+00:00",
        "updated_at": "2023-01-15T10:26:32+00:00"
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}`}
        />
      </div>
    </section>
  )
}

function UsersGetSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Detalhes do Usuario</h2>
        <p className="mt-2 text-muted-foreground">
          Retorna informacoes detalhadas de um usuario especifico.
        </p>
      </div>
      <EndpointBadge method="GET" path="/api/application/users/{user}" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "user", type: "integer", required: true, description: "ID do usuario" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Query Parameters</h3>
        <ParamTable
          params={[
            { name: "include", type: "string", description: "Incluir relacionamentos (servers)" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl "https://seu-painel.com/api/application/users/1?include=servers" \\
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
  "object": "user",
  "attributes": {
    "id": 1,
    "external_id": null,
    "uuid": "c4022c6c-9bf1-4a23-bff9-519cceb38335",
    "username": "system",
    "email": "[email protected]",
    "first_name": "System",
    "last_name": "Administrator",
    "language": "en",
    "root_admin": true,
    "2fa": false,
    "created_at": "2023-01-15T10:26:32+00:00",
    "updated_at": "2023-01-15T10:26:32+00:00"
  },
  "relationships": {
    "servers": {
      "object": "list",
      "data": []
    }
  }
}`}
        />
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground">Buscar por External ID</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Voce tambem pode buscar um usuario pelo external_id:
        </p>
        <div className="mt-3">
          <EndpointBadge method="GET" path="/api/application/users/external/{external_id}" />
        </div>
      </div>
    </section>
  )
}

function UsersCreateSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Criar Usuario</h2>
        <p className="mt-2 text-muted-foreground">
          Cria uma nova conta de usuario no painel.
        </p>
      </div>
      <EndpointBadge method="POST" path="/api/application/users" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "email", type: "string", required: true, description: "Email do usuario (deve ser unico)" },
            { name: "username", type: "string", required: true, description: "Username (deve ser unico)" },
            { name: "first_name", type: "string", required: true, description: "Primeiro nome" },
            { name: "last_name", type: "string", required: true, description: "Sobrenome" },
            { name: "password", type: "string", required: false, description: "Senha do usuario (se nao informada, usuario deve resetar)" },
            { name: "language", type: "string", required: false, description: "Idioma preferido", default: "en" },
            { name: "root_admin", type: "boolean", required: false, description: "Se o usuario tem privilegios admin" },
            { name: "external_id", type: "string", required: false, description: "ID externo para integracao" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X POST "https://seu-painel.com/api/application/users" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "[email protected]",
    "username": "novousuario",
    "first_name": "Novo",
    "last_name": "Usuario",
    "password": "senha_segura_123",
    "language": "pt",
    "root_admin": false
  }'`}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Response</h3>
        <CodeBlock
          language="json"
          title="201 Created"
          code={`{
  "object": "user",
  "attributes": {
    "id": 2,
    "external_id": null,
    "uuid": "f3b21b3e-4c5d-4f8e-9a1b-2c3d4e5f6789",
    "username": "novousuario",
    "email": "[email protected]",
    "first_name": "Novo",
    "last_name": "Usuario",
    "language": "pt",
    "root_admin": false,
    "2fa": false,
    "created_at": "2024-01-20T14:30:45+00:00",
    "updated_at": "2024-01-20T14:30:45+00:00"
  }
}`}
        />
      </div>
    </section>
  )
}

function UsersUpdateSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Atualizar Usuario</h2>
        <p className="mt-2 text-muted-foreground">
          Atualiza as informacoes de um usuario existente.
        </p>
      </div>
      <EndpointBadge method="PATCH" path="/api/application/users/{user}" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "user", type: "integer", required: true, description: "ID do usuario" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Request Body</h3>
        <ParamTable
          params={[
            { name: "email", type: "string", required: true, description: "Email do usuario" },
            { name: "username", type: "string", required: true, description: "Username" },
            { name: "first_name", type: "string", required: true, description: "Primeiro nome" },
            { name: "last_name", type: "string", required: true, description: "Sobrenome" },
            { name: "password", type: "string", required: false, description: "Nova senha" },
            { name: "language", type: "string", required: false, description: "Idioma preferido" },
            { name: "root_admin", type: "boolean", required: false, description: "Privilegios admin" },
            { name: "external_id", type: "string", required: false, description: "ID externo" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X PATCH "https://seu-painel.com/api/application/users/2" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "[email protected]",
    "username": "novousuario",
    "first_name": "Nome Atualizado",
    "last_name": "Sobrenome",
    "language": "pt"
  }'`}
        />
      </div>
    </section>
  )
}

function UsersDeleteSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Deletar Usuario</h2>
        <p className="mt-2 text-muted-foreground">
          Deleta uma conta de usuario do painel. <strong className="text-destructive">Essa acao e irreversivel.</strong>
        </p>
      </div>
      <EndpointBadge method="DELETE" path="/api/application/users/{user}" />
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Path Parameters</h3>
        <ParamTable
          params={[
            { name: "user", type: "integer", required: true, description: "ID do usuario" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Exemplo de Request</h3>
        <CodeBlock
          language="bash"
          title="cURL"
          code={`curl -X DELETE "https://seu-painel.com/api/application/users/2" \\
  -H "Authorization: Bearer ptla_SUA_API_KEY" \\
  -H "Accept: Application/vnd.pterodactyl.v1+json"`}
        />
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-foreground">
          <strong>Response:</strong> Retorna HTTP{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">204 No Content</code>{" "}
          em caso de delecao bem sucedida.
        </p>
      </div>
    </section>
  )
}
