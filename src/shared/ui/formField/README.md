# 📝 Form Field & Dynamic JSON Renderer (`@/shared/ui/formField`)

Welcome to the comprehensive documentation for the **FormField & Form System Component** in the `Sutra-ui` design system.

The `<FormField />` component provides a unified, accessible form input interface supporting standard text inputs, textareas, custom selects, custom date pickers, checkboxes, radio button groups, field-level Role-Based Access Control (RBAC), and dynamic JSON schema form generation via `<JsonFormRenderer />`.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Props Specification](#-exhaustive-api--props-specification)
   - [`<FormField />` Props](#formfield--props)
   - [`<JsonFormRenderer />` Props](#jsonformrenderer--props)
   - [RBAC Field Security Props](#rbac-field-security-props)
4. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Standard Input with Validation & Icons](#recipe-1-standard-input-with-validation--icons)
   - [Recipe 2: Custom Searchable Select & Multi-Select](#recipe-2-custom-searchable-select--multi-select)
   - [Recipe 3: Field-Level RBAC Access Control](#recipe-3-field-level-rbac-access-control)
   - [Recipe 4: Dynamic Form Rendering from JSON Schema](#recipe-4-dynamic-form-rendering-from-json-schema)
5. [Design System Tokens & Customization](#-design-system-tokens--customization)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🚀 Overview & Core Architecture

The form module provides a single entrypoint component (`<FormField />`) that dynamically branches into dedicated primitive components based on the `type` prop (`text`, `password`, `email`, `number`, `textarea`, `select`, `date`, `checkbox`, `radio`).

### Key Capabilities:
- 🛡️ **Built-in RBAC Security**: Control field visibility (`hide`, `disable`, `readonly`) dynamically based on user roles and permissions.
- 🎨 **Dynamic Design Tokens**: Custom styling configurations (`styleConfig`) for sizes, borders, error highlights, and hints.
- 📆 **Integrated Custom DatePicker & CustomSelect**: Access floating menus, clear handles, search filtering, and multi-selection tags.
- 📜 **JSON Form Schema Renderer**: Build complex dynamic forms from server-driven JSON configurations using `<JsonFormRenderer />`.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [index.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/index.ts)
- Main Component: [items/FormField.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/FormField.tsx)
- Dynamic JSON Renderer: [items/JsonFormRenderer.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/JsonFormRenderer.tsx)
- Types & Interfaces: [types/types.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/types/types.ts)
- Base Field Primitives:
  - Input: [items/BaseFields/InputField.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/BaseFields/InputField.tsx)
  - TextArea: [items/BaseFields/TextAreaField.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/BaseFields/TextAreaField.tsx)
  - Checkbox: [items/BaseFields/CheckboxField.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/BaseFields/CheckboxField.tsx)
  - Radio: [items/BaseFields/RadioField.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/items/BaseFields/RadioField.tsx)
- Styling Tokens: [styles/style.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/styles/style.ts)
- RBAC Utilities: [utils/permissionUtils.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/formField/utils/permissionUtils.ts)

---

## 🛠 Exhaustive API & Props Specification

### `<FormField />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"text" \| "password" \| "email" \| "number" \| "textarea" \| "select" \| "date" \| "checkbox" \| "radio"` | `"text"` | Input field type variant. |
| `label` | `string` | `undefined` | Label text displayed above input. |
| `name` | `string` | `undefined` | Form control name attribute. |
| `value` | `any` | `undefined` | Controlled value binding. |
| `onChange` | `(e: any) => void` | `undefined` | Change event handler callback. |
| `error` | `string` | `undefined` | Error message string (renders red alert message). |
| `hint` | `string` | `undefined` | Descriptive helper text string. |
| `required` | `boolean` | `false` | Displays mandatory asterisk `*`. |
| `disabled` | `boolean` | `false` | Disables input interactions. |
| `fieldSize` | `"sm" \| "md" \| "lg"` | `"md"` | Input size configuration. |
| `roles` | `string[]` | `undefined` | Required user roles to view/interact with field. |
| `roleAction` | `"hide" \| "disable" \| "readonly"` | `"hide"` | Behavior when RBAC security check fails. |

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Standard Input with Validation & Icons

```tsx
import { FormField } from "@/shared/ui/formField";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <FormField
      type="email"
      label="Email Address"
      placeholder="alex@sutra-ui.com"
      value={email}
      onChange={handleChange}
      error={error}
      required
    />
  );
}
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: How does dynamic RBAC filtering work on a form field?**
> Pass `userRoles={["editor"]}` and `roles={["admin"]}` with `roleAction="hide"`. If the user lacks the `admin` role, the field will automatically unmount from the DOM.

**Q: How do I load options asynchronously in `<CustomSelect />`?**
> Pass `loadOptions={async (query) => fetchUsers(query)}` with `type="select"`.

---

Part of the **Sutra-ui UI Component Architecture**. Built with React, TypeScript, and Tailwind CSS.
