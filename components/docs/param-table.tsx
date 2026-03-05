interface ParamTableProps {
  params: {
    name: string
    type: string
    required?: boolean
    description: string
    default?: string
  }[]
}

export function ParamTable({ params }: ParamTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th className="px-4 py-3 text-left font-medium text-foreground">Campo</th>
            <th className="px-4 py-3 text-left font-medium text-foreground">Tipo</th>
            <th className="px-4 py-3 text-left font-medium text-foreground">Obrigatorio</th>
            <th className="px-4 py-3 text-left font-medium text-foreground">Descricao</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, i) => (
            <tr key={param.name} className={i % 2 === 0 ? "bg-card" : "bg-secondary/50"}>
              <td className="px-4 py-3">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-primary">
                  {param.name}
                </code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{param.type}</td>
              <td className="px-4 py-3">
                {param.required !== undefined && (
                  <span
                    className={
                      param.required
                        ? "text-chart-5 font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {param.required ? "Sim" : "Nao"}
                  </span>
                )}
                {param.default && (
                  <span className="text-muted-foreground"> ({param.default})</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
