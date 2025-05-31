"use client";

import * as React from "react";

import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type VariantProps, cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Renders a styled toolbar container using Radix UI primitives.
 *
 * @param className - Additional class names to customize styling.
 */
export function Toolbar({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Root>) {
  return (
    <ToolbarPrimitive.Root
      className={cn("relative flex select-none items-center", className)}
      {...props}
    />
  );
}

/**
 * Renders a group of toggleable toolbar items with horizontal flex layout.
 *
 * @param className - Additional CSS classes to apply to the group container.
 */
export function ToolbarToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToolbarToggleGroup>) {
  return (
    <ToolbarPrimitive.ToolbarToggleGroup
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled toolbar link with underline and medium font weight.
 *
 * Extends the Radix ToolbarPrimitive.Link component with additional styling for use within toolbars.
 */
export function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Link>) {
  return (
    <ToolbarPrimitive.Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled separator for visually dividing groups of toolbar items.
 *
 * Applies horizontal and vertical margins, a fixed width, and border color for consistent appearance within the toolbar.
 */
export function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return (
    <ToolbarPrimitive.Separator
      className={cn("mx-2 my-1 w-px shrink-0 bg-border", className)}
      {...props}
    />
  );
}

// From toggleVariants
const toolbarButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-checked:bg-accent aria-checked:text-accent-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 min-w-9 px-2",
        lg: "h-10 min-w-10 px-2.5",
        sm: "h-8 min-w-8 px-1.5",
      },
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
    },
  },
);

const dropdownArrowVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-r-md text-sm font-medium text-foreground transition-colors disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 w-6",
        lg: "h-10 w-8",
        sm: "h-8 w-4",
      },
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground",
        outline:
          "border border-l-0 border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
    },
  },
);

type ToolbarButtonProps = {
  isDropdown?: boolean;
  pressed?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
  "asChild" | "value"
> &
  VariantProps<typeof toolbarButtonVariants>;

export const ToolbarButton = withTooltip(function ToolbarButton({
  children,
  className,
  isDropdown,
  pressed,
  size = "sm",
  variant,
  ...props
}: ToolbarButtonProps) {
  return typeof pressed === "boolean" ? (
    <ToolbarToggleGroup disabled={props.disabled} value="single" type="single">
      <ToolbarToggleItem
        className={cn(
          toolbarButtonVariants({
            size,
            variant,
          }),
          isDropdown && "justify-between gap-1 pr-1",
          className,
        )}
        value={pressed ? "single" : ""}
        {...props}
      >
        {isDropdown ? (
          <>
            <div className="flex flex-1 items-center gap-2 whitespace-nowrap">
              {children}
            </div>
            <div>
              <ChevronDown
                className="size-3.5 text-muted-foreground"
                data-icon
              />
            </div>
          </>
        ) : (
          children
        )}
      </ToolbarToggleItem>
    </ToolbarToggleGroup>
  ) : (
    <ToolbarPrimitive.Button
      className={cn(
        toolbarButtonVariants({
          size,
          variant,
        }),
        isDropdown && "pr-1",
        className,
      )}
      {...props}
    >
      {children}
    </ToolbarPrimitive.Button>
  );
});

/**
 * Renders a split button for toolbars, grouping primary and secondary actions with appropriate styling.
 *
 * @param className - Additional class names to apply to the split button.
 */
export function ToolbarSplitButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToolbarButton>) {
  return (
    <ToolbarButton
      className={cn("group flex gap-0 px-0 hover:bg-transparent", className)}
      {...props}
    />
  );
}

type ToolbarSplitButtonPrimaryProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
  "value"
> &
  VariantProps<typeof toolbarButtonVariants>;

/**
 * Renders the primary section of a split toolbar button with appropriate styling.
 *
 * Applies size and variant styles, removes right border radius, and visually indicates the pressed state.
 *
 * @param children - The content to display inside the primary split button.
 */
export function ToolbarSplitButtonPrimary({
  children,
  className,
  size = "sm",
  variant,
  ...props
}: ToolbarSplitButtonPrimaryProps) {
  return (
    <span
      className={cn(
        toolbarButtonVariants({
          size,
          variant,
        }),
        "rounded-r-none",
        "group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Renders the secondary part of a split toolbar button as a dropdown arrow button.
 *
 * Stops event propagation on click to prevent parent handlers from triggering.
 */
export function ToolbarSplitButtonSecondary({
  className,
  size,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof dropdownArrowVariants>) {
  return (
    <button
      className={cn(
        dropdownArrowVariants({
          size,
          variant,
        }),
        "group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <ChevronDown className="size-3.5 text-muted-foreground" data-icon />
    </button>
  );
}

/**
 * A styled toggle item for use within a toolbar toggle group.
 *
 * Applies toolbar button variants for consistent size and appearance.
 */
export function ToolbarToggleItem({
  className,
  size = "sm",
  variant,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleItem> &
  VariantProps<typeof toolbarButtonVariants>) {
  return (
    <ToolbarPrimitive.ToggleItem
      className={cn(toolbarButtonVariants({ size, variant }), className)}
      {...props}
    />
  );
}

/**
 * Groups toolbar items together and conditionally displays a vertical separator.
 *
 * The group is only visible if it contains at least one button. The separator is hidden for the last group.
 */
export function ToolbarGroup({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/toolbar-group",
        "relative hidden has-[button]:flex",
        className,
      )}
    >
      <div className="flex items-center">{children}</div>

      <div className="group-last/toolbar-group:hidden! mx-1.5 py-0.5">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}

type TooltipProps<T extends React.ElementType> = {
  tooltip?: React.ReactNode;
  tooltipContentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipContent>,
    "children"
  >;
  tooltipProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Tooltip>,
    "children"
  >;
  tooltipTriggerProps?: React.ComponentPropsWithoutRef<typeof TooltipTrigger>;
} & React.ComponentProps<T>;

/**
 * Higher-order component that wraps a given component with a tooltip if a `tooltip` prop is provided.
 *
 * The tooltip is rendered using Radix UI Tooltip primitives and is only mounted on the client to prevent server/client rendering mismatches.
 *
 * @param Component - The React component to be wrapped with tooltip functionality.
 * @returns A new component that displays a tooltip when the `tooltip` prop is set.
 *
 * @remark Tooltip-related props (`tooltip`, `tooltipContentProps`, `tooltipProps`, `tooltipTriggerProps`) are passed through to the underlying tooltip primitives.
 */
function withTooltip<T extends React.ElementType>(Component: T) {
  return function ExtendComponent({
    tooltip,
    tooltipContentProps,
    tooltipProps,
    tooltipTriggerProps,
    ...props
  }: TooltipProps<T>) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component {...(props as React.ComponentProps<T>)} />;

    if (tooltip && mounted) {
      return (
        <Tooltip {...tooltipProps}>
          <TooltipTrigger asChild {...tooltipTriggerProps}>
            {component}
          </TooltipTrigger>

          <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return component;
  };
}

/**
 * Renders styled tooltip content inside a portal.
 *
 * @param children - The content to display within the tooltip.
 * @param className - Additional CSS classes for custom styling.
 * @param sideOffset - The offset distance from the tooltip trigger, defaults to 4.
 */
function TooltipContent({
  children,
  className,
  // CHANGE
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs",
          className,
        )}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {/* CHANGE */}
        {/* <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" /> */}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/**
 * Renders a grouped section within a dropdown menu, optionally with a label, and conditionally displays the group and separator based on the presence of menu items.
 *
 * @param label - Optional label displayed at the top of the group.
 * @remark The group and its separator are only visible if the group contains menu items, menu item radios, or options.
 */
export function ToolbarMenuGroup({
  children,
  className,
  label,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup> & { label?: string }) {
  return (
    <>
      <DropdownMenuSeparator
        className={cn(
          "hidden",
          "mb-0 shrink-0 peer-has-[[role=menuitem]]/menu-group:block peer-has-[[role=menuitemradio]]/menu-group:block peer-has-[[role=option]]/menu-group:block",
        )}
      />

      <DropdownMenuRadioGroup
        {...props}
        className={cn(
          "hidden",
          "peer/menu-group group/menu-group my-1.5 has-[[role=menuitem]]:block has-[[role=menuitemradio]]:block has-[[role=option]]:block",
          className,
        )}
      >
        {label && (
          <DropdownMenuLabel className="select-none font-semibold text-muted-foreground text-xs">
            {label}
          </DropdownMenuLabel>
        )}
        {children}
      </DropdownMenuRadioGroup>
    </>
  );
}
