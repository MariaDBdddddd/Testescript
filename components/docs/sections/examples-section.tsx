import { CodeBlock } from "@/components/docs/code-block"

export function ExamplesSection() {
  return (
    <section id="examples" className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Exemplos de Integracao</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Exemplos prontos para uso em JavaScript/Node.js mostrando como integrar com a API
          do Pterodactyl.
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Classe UserService</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Servico completo para gerenciamento de usuarios com todos os metodos CRUD.
        </p>
        <CodeBlock
          language="javascript"
          title="user-service.js"
          code={`class UserService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllUsers(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(
      \`\${this.baseUrl}/api/application/users?\${params}\`,
      { headers: this.headers }
    );
    return response.json();
  }

  async getUser(userId) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/users/\${userId}\`,
      { headers: this.headers }
    );
    return response.json();
  }

  async createUser(userData) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/users\`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(userData)
      }
    );
    return response.json();
  }

  async updateUser(userId, updateData) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/users/\${userId}\`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(updateData)
      }
    );
    return response.json();
  }

  async deleteUser(userId) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/users/\${userId}\`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    );
    return response.status === 204;
  }
}

// Uso:
const users = new UserService('ptla_SUA_API_KEY', 'https://seu-painel.com');

// Listar usuarios
const allUsers = await users.getAllUsers({ per_page: 25 });

// Criar usuario
const newUser = await users.createUser({
  email: '[email protected]',
  username: 'novousuario',
  first_name: 'Novo',
  last_name: 'Usuario',
  password: 'senha_segura_123'
});`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Classe ServerService</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Servico para gerenciamento de servers com criacao, update, suspensao e delecao.
        </p>
        <CodeBlock
          language="javascript"
          title="server-service.js"
          code={`class ServerService {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json'
    };
  }

  async getAllServers(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers?\${params}\`,
      { headers: this.headers }
    );
    return response.json();
  }

  async createServer(serverData) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers\`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(serverData)
      }
    );
    return response.json();
  }

  async updateServerDetails(serverId, updateData) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers/\${serverId}/details\`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(updateData)
      }
    );
    return response.json();
  }

  async updateServerBuild(serverId, buildData) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers/\${serverId}/build\`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(buildData)
      }
    );
    return response.json();
  }

  async suspendServer(serverId) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers/\${serverId}/suspend\`,
      { method: 'POST', headers: this.headers }
    );
    return response.status === 204;
  }

  async unsuspendServer(serverId) {
    const response = await fetch(
      \`\${this.baseUrl}/api/application/servers/\${serverId}/unsuspend\`,
      { method: 'POST', headers: this.headers }
    );
    return response.status === 204;
  }

  async deleteServer(serverId, force = false) {
    const url = \`\${this.baseUrl}/api/application/servers/\${serverId}\${
      force ? '?force=true' : ''
    }\`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.headers
    });
    return response.status === 204;
  }
}

// Uso:
const servers = new ServerService('ptla_SUA_API_KEY', 'https://seu-painel.com');

// Criar server Minecraft
const newServer = await servers.createServer({
  name: 'Meu Server Minecraft',
  user: 1,
  egg: 5,
  docker_image: 'quay.io/pterodactyl/core:java',
  startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}',
  environment: {
    MINECRAFT_VERSION: 'latest',
    SERVER_JARFILE: 'server.jar'
  },
  limits: { memory: 1024, swap: 0, disk: 2048, io: 500, cpu: 100 },
  feature_limits: { databases: 2, allocations: 1, backups: 5 },
  allocation: { default: 1 }
});

// Suspender server
await servers.suspendServer(2);`}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Wrapper com Error Handling</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Exemplo de wrapper com tratamento de erros, retry e rate limit handling.
        </p>
        <CodeBlock
          language="javascript"
          title="ptero-client.js"
          code={`class PteroClient {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async request(method, endpoint, body = null) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const options = {
      method,
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Rate limit handling
    const remaining = response.headers.get('X-RateLimit-Remaining');
    if (remaining && parseInt(remaining) < 10) {
      console.warn(\`Rate limit quase atingido: \${remaining} restantes\`);
    }

    // 429 - Rate limited
    if (response.status === 429) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      const waitMs = (parseInt(resetTime) * 1000) - Date.now();
      console.log(\`Rate limited. Aguardando \${waitMs}ms...\`);
      await new Promise(resolve => setTimeout(resolve, Math.max(waitMs, 1000)));
      return this.request(method, endpoint, body); // Retry
    }

    // 204 - No Content (delete, suspend, etc)
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    // Error handling
    if (!response.ok) {
      const error = data.errors?.[0];
      throw new Error(
        \`[\${error?.code || response.status}] \${error?.detail || 'Erro desconhecido'}\`
      );
    }

    return data;
  }

  // Atalhos
  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, body) { return this.request('POST', endpoint, body); }
  patch(endpoint, body) { return this.request('PATCH', endpoint, body); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

// Uso:
const ptero = new PteroClient('ptla_SUA_API_KEY', 'https://seu-painel.com');

try {
  const users = await ptero.get('/api/application/users');
  console.log(users);
} catch (err) {
  console.error('Erro na API:', err.message);
}`}
        />
      </div>
    </section>
  )
}
