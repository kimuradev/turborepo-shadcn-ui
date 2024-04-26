import * as React from "react"
import { cn } from "@ui/lib/utils"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { Badge } from "@ui/components/ui/badge"
import { Button } from "@ui/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover"

export type OptionType = Record<"value" | "label", string>

interface MultiSelectProps {
  defaultValues?: Record<"value" | "label", string>[]
  options: Record<"value" | "label", string>[]
  selectedValue: Record<"value" | "label", string>[]
  onChange: React.Dispatch<
    React.SetStateAction<Record<"value" | "label", string>[]>
  >
  disabled?: boolean,
  className?: string
  placeholder?: string
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, defaultValues = [], selectedValue = [], onChange, disabled, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState([...defaultValues, ...selectedValue])

    const handleUnselect = (item: Record<"value" | "label", string>) => {
      const unselected = selected.filter((i) => i.value !== item.value)
      onChange(unselected)
      setSelected(unselected)
    }

    // on delete key press, remove last selected item
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Backspace" && selected.length > 0) {
          const removed = selected.filter((_, index) => index !== selected.length - 1)
          onChange(removed)
          setSelected(removed)
        }

        // close on escape
        if (e.key === "Escape") {
          setOpen(false)
        }
      }

      document.addEventListener("keydown", handleKeyDown)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [onChange, selected])

    const handleSelectChange = (option: any) => {
      if (selected.some((item) => item.value === option.value)) {
        const filtered = selected.filter((item) => item.value !== option.value)
        setSelected(filtered);
        return filtered
      } else {
        const merged = [...selected, option];
        setSelected(merged);
        return merged
      }
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`group w-full justify-between h-full`}
            onClick={() => setOpen(!open)}
            disabled={disabled}
          >
            <div className="flex flex-wrap items-center gap-1">
              {selected.map((item) => (
                <Badge
                  variant="outline"
                  key={item.value}
                  className="flex items-center gap-1 group-hover:bg-background"
                  onClick={() => handleUnselect(item)}
                >
                  {item.label}
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-none h-8 w-5"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </Button>
                </Badge>
              ))}
              {selected.length === 0 && (
                <span>{props.placeholder ?? "Selecionar ..."}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className={className}>
            <CommandInput placeholder="Procurar ..." />
            <CommandEmpty>Nenhum jogador encontrado.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(handleSelectChange(option))
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.some((item) => item.value === option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }