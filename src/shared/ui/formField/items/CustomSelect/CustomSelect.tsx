import { forwardRef, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
  FloatingPortal,
} from "@floating-ui/react";
import type { CustomSelectProps } from "../../types/types";
import { useCustomSelect } from "./hooks/useCustomSelect";
import { SelectControl } from "./items/SelectControl";
import { SelectMenu } from "./items/SelectMenu";

/**
 * CustomSelect - A premium, accessible select component supporting
 * single/multi select, search, and async loading with pagination.
 */
const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  (props, ref) => {
    const {
      id,
      className,
      placeholder = "Select option...",
      labelKey = "label",
      valueKey = "value",
      isMulti = false,
      isSearchable = false,
      isClearable = false,
      loadingMessage,
      noOptionsMessage,
      disabled,
      fieldSize,
      ...rest
    } = props;

    const {
      isOpen,
      setIsOpen,
      searchTerm,
      setSearchTerm,
      handleSearchChange,
      highlightedIndex,
      setHighlightedIndex,
      isLoading,
      isLoadingMore,
      hasMore,
      filteredOptions,
      selectedOptions,
      selectedValues,
      hasValue,
      isAsync,
      containerRef,
      inputRef,
      listRef,
      sentinelRef,
      handleSelectOption,
      handleClear,
      handleRemoveMulti,
      handleKeyDown,
    } = useCustomSelect(props);

    const { refs, floatingStyles } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "bottom-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip({ fallbackPlacements: ["top-start", "bottom-start"] }),
        shift({ padding: 8 }),
        sizeMiddleware({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const setContainerRef = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        refs.setReference(node);
      },
      [containerRef, refs],
    );

    return (
      <div ref={setContainerRef} className="relative w-full" onKeyDown={handleKeyDown}>
        <SelectControl
          id={id}
          disabled={disabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isAsync={isAsync}
          isClearable={isClearable}
          placeholder={placeholder}
          searchTerm={searchTerm}
          selectedOptions={selectedOptions}
          hasValue={hasValue}
          isLoading={isLoading}
          isOpen={isOpen}
          labelKey={labelKey}
          valueKey={valueKey}
          className={className}
          ariaInvalid={rest["aria-invalid"]}
          inputRef={inputRef}
          onSearchChange={handleSearchChange}
          onToggle={() => setIsOpen((prev) => !prev)}
          onClear={handleClear}
          onRemoveMulti={handleRemoveMulti}
          forwardedRef={ref}
        />

        {isOpen && !disabled && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 99999 }}
            >
              <SelectMenu
                isOpen={isOpen}
                disabled={disabled}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                filteredOptions={filteredOptions}
                selectedValues={selectedValues}
                highlightedIndex={highlightedIndex}
                loadingMessage={loadingMessage}
                noOptionsMessage={noOptionsMessage}
                labelKey={labelKey}
                valueKey={valueKey}
                onSelect={handleSelectOption}
                onHighlight={setHighlightedIndex}
                listRef={listRef}
                sentinelRef={sentinelRef}
              />
            </div>
          </FloatingPortal>
        )}
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export { CustomSelect };

