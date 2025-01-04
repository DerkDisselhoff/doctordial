import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
} | null>(null)

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("Sidebar must be used within SidebarProvider")

  return (
    <div
      className={cn(
        "h-screen bg-white shadow-lg transition-all duration-300 flex flex-col",
        context.collapsed ? "w-14" : "w-56",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4 p-4", className)}>
      {children}
    </div>
  )
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("SidebarGroupLabel must be used within SidebarProvider")

  return (
    <div className={cn(
      "text-sm font-semibold text-forest", 
      context.collapsed && "sr-only"
    )}>
      {children}
    </div>
  )
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

type SidebarMenuButtonProps = {
  className?: string
  children: React.ReactNode
} & (
  | ({ asChild: true } & React.HTMLAttributes<HTMLDivElement>)
  | ({ asChild?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>)
)

export function SidebarMenuButton({
  className,
  children,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("SidebarMenuButton must be used within SidebarProvider")

  if (asChild) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest transition-colors hover:bg-mint/10 hover:text-forest",
          context.collapsed && "justify-center",
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest transition-colors hover:bg-mint/10 hover:text-forest",
        context.collapsed && "justify-center",
        className
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}