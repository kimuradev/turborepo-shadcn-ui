import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";
import * as RPNInputSimple from "react-phone-number-input/input";

import flags from "react-phone-number-input/flags";

import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import { Input, InputProps } from "@ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";

import { cn } from "@ui/lib/utils";

export type PhoneInputValue = RPNInput.Value;

type PhoneInputSimpleProps = React.ComponentProps<
  typeof RPNInputSimple.default
>;

const PhoneInputSimple = ({
  className,
  children,
  ...props
}: PhoneInputSimpleProps) => (
  <RPNInputSimple.default
    placeholder="Digite o telefone"
    inputComponent={Input}
    {...props}
  />
);
PhoneInputSimple.displayName = "PhoneInputSimple";

type PhoneInputProps = React.ComponentProps<typeof RPNInput.default>;

const PhoneInput = ({ className, children, ...props }: PhoneInputProps) => (
  <RPNInput.default
    className={cn("flex", className)}
    placeholder={"Digite o telefone"}
    flagComponent={FlagComponent}
    countrySelectComponent={CountrySelect}
    inputComponent={InputComponent}
    {...props}
  />
);

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("rounded-s-none rounded-e-lg", className)}
      {...props}
      ref={ref}
    />
  ),
);

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  readOnly?: boolean;
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  readOnly,
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn("rounded-e-none rounded-s-lg pl-3 pr-1 flex gap-1")}
          disabled={disabled || readOnly}>
          <span className="flex items-center truncate">
            <div className="bg-foreground/20 rounded-sm flex w-6 h-4">
              {value && <FlagComponent country={value} countryName={value} />}
            </div>
          </span>
          <ChevronsUpDown className={`h-4 w-4 ${disabled ? "hidden" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    className={"text-sm gap-2"}
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}>
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    <span>{option.label}</span>
                    <span className="text-foreground/50">
                      {`+${RPNInput.getCountryCallingCode(option.value)}`}
                    </span>
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        option.value === value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span
      className={"inline object-contain w-6 h-4 overflow-hidden rounded-sm"}>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput, PhoneInputSimple };
