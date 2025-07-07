import { Link } from "@inertiajs/react"
import * as React from "react"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Pagination = ({ className, ...props }: PaginationProps) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={["mx-auto flex w-full justify-center", className].join(" ")}
        {...props}
    />
)

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={["flex flex-row items-center gap-1", className].join(" ")}
        {...props}
    />
))

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
))

interface PaginationLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    isActive?: boolean
    href: string
}

const PaginationLink = ({
    className,
    isActive,
    children,
    ...props
}: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? "page" : undefined}
        className={[
            "flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            isActive
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "",
            className,
        ].join(" ")}
        {...props}
    >
        {children}
    </Link>
)

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        className={["gap-1 pl-2.5", className].join(" ")}
        {...props}
    >
        <span>«</span>
    </PaginationLink>
)

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        className={["gap-1 pr-2.5", className].join(" ")}
        {...props}
    >
        <span>»</span>
    </PaginationLink>
)

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}