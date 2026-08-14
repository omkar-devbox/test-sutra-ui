import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils";
import { formFieldBaseStyles as s } from "../../styles/style";
import { useNumberInput, usePII } from "../../utils/hooks";
import type { TextFieldProps } from "../../types/types";

type InputFieldProps = TextFieldProps;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      type,
      disabled,
      required,
      className,
      spellCheck,
      error,
      isPII = false,
      onKeyDown,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
    const {
      idIndex,
      fieldSize,
      colSpan,
      helperText,
      prefixIcon,
      suffixIcon,
      startIcon,
      endIcon,
      prefix,
      suffix,
      prefixClassName,
      suffixClassName,
      showPasswordToggle,
      wrapperClassName,
      styleConfig,
      hint,
      label,
      errorMessage,
      meta,
      roles,
      permissions,
      permissionResource,
      permissionAction,
      roleAction,
      userRoles,
      userPermissions,
      hasPermission,
      fullWidth,
      ...domRest
    } = rest as any;

    const [showPassword, setShowPassword] = useState(false);

    const safeValue = value === null ? "" : value;
    const valueProps =
      safeValue !== undefined
        ? { value: safeValue }
        : defaultValue !== undefined
        ? { defaultValue }
        : { value: "" };

    const {
      isMasked,
      toggleMask,
      inputType: maskedType,
    } = usePII(isPII, type as string);
    const { handleKeyDown } = useNumberInput(type as string, onKeyDown);

    const isPasswordType = type === "password";
    const enablePasswordToggle = (showPasswordToggle ?? true) && isPasswordType && !disabled;

    const effectiveInputType = isPasswordType
      ? (showPassword ? "text" : "password")
      : maskedType;

    const startContent = prefixIcon ?? startIcon ?? prefix;
    let endContent = suffixIcon ?? endIcon ?? suffix;

    if (!endContent && enablePasswordToggle) {
      endContent = (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          className={cn(
            s.piiToggleButton,
            disabled && s.piiToggleButtonDisabled,
          )}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className={s.piiIcon} />
          ) : (
            <Eye className={s.piiIcon} />
          )}
        </button>
      );
    } else if (!endContent && isPII && !disabled) {
      endContent = (
        <button
          type="button"
          onClick={toggleMask}
          disabled={disabled}
          className={cn(
            s.piiToggleButton,
            disabled && s.piiToggleButtonDisabled,
          )}
          aria-label={
            isMasked
              ? "Show sensitive information"
              : "Hide sensitive information"
          }
        >
          {isMasked ? (
            <Eye className={s.piiIcon} />
          ) : (
            <EyeOff className={s.piiIcon} />
          )}
        </button>
      );
    }

    const hasPrefix = Boolean(startContent);
    const hasSuffix = Boolean(endContent) || enablePasswordToggle || isPII || disabled;

    const inputElement = (
      <input
        ref={ref}
        id={id}
        type={effectiveInputType}
        disabled={disabled}
        required={required}
        className={cn(
          s.input,
          hasPrefix && "pl-11",
          hasSuffix && "pr-11",
          disabled && s.inputDisabled,
          error && s.inputError,
          isPII && s.inputPII,
          className,
        )}
        spellCheck={spellCheck ?? (isPII ? false : undefined)}
        aria-invalid={!!error}
        onKeyDown={handleKeyDown}
        onChange={(e) => onChange?.(e)}
        {...valueProps}
        {...domRest}
      />
    );

    if (hasPrefix || hasSuffix) {
      return (
        <div className="relative w-full flex items-center group/input">
          {startContent && (
            <div
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 dark:text-slate-500 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none z-10",
                prefixClassName
              )}
            >
              {startContent}
            </div>
          )}

          {inputElement}

          {endContent && (
            <div
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 dark:text-slate-500 z-10",
                suffixClassName
              )}
            >
              {endContent}
            </div>
          )}

          {!endContent && disabled && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400/60 pointer-events-none z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          )}
        </div>
      );
    }

    return inputElement;
  },
);

InputField.displayName = "InputField";
