import { cn } from "@/lib/utils"

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

interface EndpointBadgeProps {
  method: Method
  path: string
}

const methodColors: Record<Method, string> = {
  GET: "bg-primary/15 text-primary border-primary/30",
  POST: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  PATCH: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  PUT: "bg-chart-5/15 text-chart-5 border-chart-5/30",
  DELETE: "bg-destructive/15 text-destructive border-destructive/30",
}

export function EndpointBadge({ method, path }: EndpointBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3">
      <span
        className={cn(
          "inline-flex shrink-0 items-center rounded-md border px-2.5 py-1 text-xs font-bold",
          methodColors[method]
        )}
      >
        {method}
      </span>
      <code className="text-sm text-foreground">{path}</code>
    </div>
  )
}
