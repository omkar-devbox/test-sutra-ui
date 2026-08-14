# 🪟 Comprehensive Modal UI System Documentation

Welcome to the complete, in-depth architectural and usage guide for the **Modal UI Component System** located at `@/shared/ui/Modal`.

This modal component system provides a robust, accessible, highly customizable, animated modal dialog primitive for React applications, powered by **Framer Motion**, **React Portals**, and **Tailwind CSS**.

---

## 📚 Table of Contents
1. [Overview & Features](#-overview--features)
2. [Directory & Architectural Structure](#-directory--architectural-structure)
3. [Core Technical Architecture](#-core-technical-architecture)
   - [React Portal Rendering](#1-react-portal-rendering)
   - [Framer Motion Animations](#2-framer-motion-animations)
   - [Focus Trap & Initial Focus](#3-focus-trap--initial-focus)
   - [Accessibility (a11y) & Screen Readers](#4-accessibility-a11y--screen-readers)
   - [Body Scroll Locking & Focus Restoration](#5-body-scroll-locking--focus-restoration)
   - [Child Prop Injection](#6-automatic-child-prop-injection)
4. [State Management (`useModal` Hook)](#-state-management-usemodal-hook)
5. [Exhaustive Component API Reference](#-exhaustive-component-api-reference)
   - [`<Modal />` (Root Container)](#1-modal-root-container)
   - [`<ModalHeader />`](#2-modalheader)
   - [`<ModalBody />`](#3-modalbody)
   - [`<ModalFooter />`](#4-modalfooter)
   - [`ModalSize` Types](#5-modalsize-types)
   - [`ModalStyleConfig` Design Tokens](#6-modalstyleconfig-design-tokens)
6. [In-Depth Code Recipes & Usage Examples](#-in-depth-code-recipes--usage-examples)
   - [Recipe 1: Basic Confirmation Dialog](#recipe-1-basic-confirmation-dialog)
   - [Recipe 2: Interactive Form Modal with Initial Focus](#recipe-2-interactive-form-modal-with-initial-focus)
   - [Recipe 3: Modal Sizes & Fullscreen Viewport](#recipe-3-modal-sizes--fullscreen-viewport)
   - [Recipe 4: Custom Header Icons & Subtitles](#recipe-4-custom-header-icons--subtitles)
   - [Recipe 5: Footer Alignments (Left, Center, Right)](#recipe-5-footer-alignments-left-center-right)
   - [Recipe 6: Non-Dismissible / Sticky Modal](#recipe-6-non-dismissible--sticky-modal)
   - [Recipe 7: Custom Theme Overrides (`styleConfig`)](#recipe-7-custom-theme-overrides-styleconfig)
7. [Best Practices & Accessibility Guidelines](#-best-practices--accessibility-guidelines)
8. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview & Features

The Modal UI system is engineered to solve common dialogue window challenges in modern web interfaces:

- 🎯 **Portal-Rendered**: Appends to `document.body` to avoid clipping from CSS overflow or stacking context issues (`z-index`).
- ✨ **Fluid Motion & Animations**: Uses `framer-motion` for smooth scale, spring, and fade transitions on entry and exit.
- ♿ **Full Accessibility**: Built-in WAI-ARIA compliance (`role="dialog"`, `aria-modal="true"`), keyboard ESC handler, body scroll locking, and tab key focus trap.
- 📐 **10 Preset Responsive Sizes**: Ranging from `sm` (384px) up to `6xl` (1280px) and `full` screen viewport.
- 🎨 **Modular Component Composition**: Split into logical sub-components (`ModalHeader`, `ModalBody`, `ModalFooter`) for maximum flexibility.
- 🪝 **Ergonomic Hook**: Includes a helper `useModal()` hook for managing modal visibility state seamlessly.
- 💅 **Deep Customization**: Fully configurable themes and styles via `styleConfig` overrides.

---

## 📁 Directory & Architectural Structure

The Modal package is located at `src/shared/ui/Modal`:

```text
src/shared/ui/Modal/
├── index.ts              # Unified public API exports
├── README.md             # In-depth usage documentation (this file)
├── types/
│   ├── index.ts          # Types barrel export
│   └── modal.types.ts    # TypeScript interfaces and size definitions
├── hooks/
│   └── useModal.ts       # React hook for managing open/closed state
├── items/
│   ├── Modal.tsx         # Core root Modal container (Portal, Motion, Focus Trap)
│   ├── ModalHeader.tsx   # Title, description, icon, and close button sub-component
│   ├── ModalBody.tsx     # Content container with optional custom scrollbar
│   └── ModalFooter.tsx   # Action button wrapper with alignment options
└── style/
    └── style.ts          # Centralized default styles and theme merge utility
```

---

## ⚙️ Core Technical Architecture

### 1. React Portal Rendering
The `<Modal />` component utilizes `ReactDOM.createPortal(modalContent, document.body)`. This guarantees that the dialog renders outside of any parent CSS containers that might have `overflow: hidden`, fixed positioning, or lower `z-index` values.

### 2. Framer Motion Animations
Entrance and exit animations are wrapped in `<AnimatePresence>`:
- **Backdrop Overlay**: Fades opacity from `0` to `1` over `0.2s`.
- **Modal Panel**: Animates from `{ opacity: 0, scale: 0.95, y: 10 }` to `{ opacity: 1, scale: 1, y: 0 }` using a spring animation (`damping: 25`, `stiffness: 300`).

### 3. Focus Trap & Initial Focus
When the modal opens:
1. **Focus Trap**: Keyboard navigation (`Tab` and `Shift + Tab`) is intercepted via an event listener on the modal container, constraining navigation strictly to interactive focusable elements (`button`, `a[href]`, `input`, `select`, `textarea`, `[tabindex]`).
2. **Initial Focus**: If `initialFocusRef` is supplied, focus is directed to that specific ref on open. Otherwise, focus defaults to the first focusable element inside the modal.

### 4. Accessibility (a11y) & Screen Readers
- The wrapper container has attributes `role="dialog"` and `aria-modal="true"`.
- The close button in `<ModalHeader />` includes `aria-label="Close modal"`.
- Supports closing on pressing the **Escape** key (`closeOnEsc`).

### 5. Body Scroll Locking & Focus Restoration
- When the modal opens, `document.body.style.overflow` is set to `'hidden'` to prevent background page scrolling.
- Upon closing, body scroll is restored, and focus is returned to the element that triggered the modal opening (`previousFocus.current`).

### 6. Automatic Child Prop Injection
`<Modal />` uses `React.Children.map` and `React.cloneElement` to automatically forward the `onClose` callback and global `styleConfig` to nested children like `<ModalHeader />`, eliminating redundant prop drilling.

---

## 🪝 State Management (`useModal` Hook)

The `useModal` hook provides state logic for controlling open and close actions:

```tsx
import { useModal } from '@/shared/ui/Modal';

const MyComponent = () => {
  const { isOpen, openModal, closeModal, toggleModal, setIsOpen } = useModal(false);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal open={isOpen} onClose={closeModal}>
        ...
      </Modal>
    </>
  );
};
```

### Hook Return Values:
| Property | Type | Description |
| :--- | :--- | :--- |
| `isOpen` | `boolean` | Current visibility state of the modal. |
| `openModal` | `() => void` | Function to set `isOpen` to `true`. |
| `closeModal` | `() => void` | Function to set `isOpen` to `false`. |
| `toggleModal` | `() => void` | Function to toggle `isOpen` state. |
| `setIsOpen` | `React.Dispatch<SetStateAction<boolean>>` | Direct state setter function. |

---

## 📋 Exhaustive Component API Reference

### 1. `<Modal />` (Root Container)

The main entry wrapper component that handles opening, overlays, portals, and focus trapping.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | **Required** | Controlled boolean indicating whether the modal is visible. |
| `onClose` | `() => void` | **Required** | Function called when the user requests closing (overlay click, Esc key, close button). |
| `size` | `ModalSize` | `'md'` | Specifies maximum width preset (`sm` through `6xl`, or `full`). |
| `closeOnOverlay` | `boolean` | `true` | If `true`, clicking the backdrop overlay triggers `onClose`. |
| `closeOnEsc` | `boolean` | `true` | If `true`, pressing the `Escape` key triggers `onClose`. |
| `children` | `ReactNode` | **Required** | The modal content (typically `ModalHeader`, `ModalBody`, `ModalFooter`). |
| `className` | `string` | `undefined` | Custom CSS class names applied to the modal panel container. |
| `overlayClassName` | `string` | `undefined` | Custom CSS class names applied to the backdrop overlay element. |
| `styleConfig` | `ModalStyleConfig` | `undefined` | Custom style configuration object for fine-tuning styling tokens. |
| `initialFocusRef` | `React.RefObject<any>` | `undefined` | React ref to element that should be focused when modal opens. |

---

### 2. `<ModalHeader />`

Header section containing title, optional description, optional icon, and close button.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Modal title text or node. |
| `description` | `ReactNode` | `undefined` | Modal description / subtitle text or node. |
| `icon` | `ReactNode` | `undefined` | Icon element displayed to the left of title and description. |
| `onClose` | `() => void` | Auto-injected | Function called when close (X) button is clicked. Injected by parent `<Modal />`. |
| `className` | `string` | `undefined` | Custom CSS class names for header container. |
| `styleConfig` | `ModalStyleConfig` | Auto-injected | Style config override object. |

---

### 3. `<ModalBody />`

Main scrollable container for modal body content.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Required** | Body content. |
| `scrollable` | `boolean` | `true` | Enables max-height constraint (`70vh`) and vertical auto-scrolling with custom scrollbar. |
| `className` | `string` | `undefined` | Custom CSS class names for body container. |
| `styleConfig` | `ModalStyleConfig` | Auto-injected | Style config override object. |

---

### 4. `<ModalFooter />`

Footer container for action buttons (e.g., Submit, Cancel).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Required** | Action buttons or elements. |
| `align` | `'left' \| 'center' \| 'right'` | `'right'` | Horizontal alignment of children elements. |
| `className` | `string` | `undefined` | Custom CSS class names for footer container. |
| `styleConfig` | `ModalStyleConfig` | Auto-injected | Style config override object. |

---

### 5. `ModalSize` Types

```typescript
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
```

#### Size Presets & Maximum Widths:
- `'sm'`: `max-w-sm` (384px)
- `'md'`: `max-w-md` (448px) — *Default*
- `'lg'`: `max-w-lg` (512px)
- `'xl'`: `max-w-2xl` (672px)
- `'2xl'`: `max-w-3xl` (768px)
- `'3xl'`: `max-w-4xl` (896px)
- `'4xl'`: `max-w-5xl` (1024px)
- `'5xl'`: `max-w-6xl` (1152px)
- `'6xl'`: `max-w-7xl` (1280px)
- `'full'`: `max-w-[95vw] h-[95vh]` (Fullscreen dialog viewport)

---

### 6. `ModalStyleConfig` Design Tokens

Allows granular custom styling for every section of the modal without editing core code:

```typescript
export interface ModalStyleConfig {
  overlay?: {
    bg?: string;
    blur?: string;
    zIndex?: number;
  };
  panel?: {
    bg?: string;
    rounded?: string;
    shadow?: string;
    border?: string;
    maxWidths?: Record<ModalSize, string>;
  };
  header?: {
    bg?: string;
    border?: string;
    padding?: string;
    titleSize?: string;
    titleColor?: string;
    descSize?: string;
    descColor?: string;
    closeBtnColor?: string;
    closeBtnHoverBg?: string;
  };
  body?: {
    bg?: string;
    padding?: string;
    textColor?: string;
    maxHeight?: string;
  };
  footer?: {
    bg?: string;
    border?: string;
    padding?: string;
  };
}
```

---

## 💡 In-Depth Code Recipes & Usage Examples

### Recipe 1: Basic Confirmation Dialog

A clean, standard confirmation alert before performing a destructive action.

```tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/shared/ui/Modal';
import { AlertTriangle } from 'lucide-react';

export const DeleteItemModal = ({ onItemDelete }: { onItemDelete: () => void }) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const handleDelete = () => {
    onItemDelete();
    closeModal();
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
      >
        Delete Item
      </button>

      <Modal open={isOpen} onClose={closeModal} size="sm">
        <ModalHeader 
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          title="Delete Document" 
          description="Are you sure you want to delete this file?" 
        />
        <ModalBody>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            This action cannot be undone. All associated resume data will be permanently removed.
          </p>
        </ModalBody>
        <ModalFooter align="right">
          <button 
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
          >
            Confirm Delete
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
```

---

### Recipe 2: Interactive Form Modal with Initial Focus

Automatically focuses on the first input field when the modal opens.

```tsx
import React, { useRef, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/shared/ui/Modal';
import { Mail } from 'lucide-react';

export const UserInviteModal = () => {
  const { isOpen, openModal, closeModal } = useModal(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending invitation to:', email);
    setEmail('');
    closeModal();
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition"
      >
        Invite Team Member
      </button>

      <Modal 
        open={isOpen} 
        onClose={closeModal} 
        size="md"
        initialFocusRef={emailInputRef}
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader 
            icon={<Mail className="h-5 w-5 text-indigo-500" />}
            title="Invite Teammate"
            description="Send an invitation link to collaborate on Sutra-ui."
          />
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter align="right">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
            >
              Send Invite
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};
```

---

### Recipe 3: Modal Sizes & Fullscreen Viewport

Render large-scale preview dialogs using the `xl`, `4xl`, or `full` presets.

```tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/shared/ui/Modal';
import { Eye } from 'lucide-react';

export const FullscreenPreviewModal = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <button 
        onClick={openModal}
        className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
      >
        View Full CV Preview
      </button>

      <Modal open={isOpen} onClose={closeModal} size="full">
        <ModalHeader 
          icon={<Eye className="h-5 w-5 text-emerald-500" />}
          title="CV Real-Time Preview" 
          description="Live full-screen view of rendered PDF output."
        />
        <ModalBody scrollable={false} className="flex-1 p-0">
          <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-8">
            <div className="w-[800px] h-full bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-10 overflow-y-auto">
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-slate-500 mb-6">Senior Full-Stack Engineer</p>
              <div className="h-0.5 bg-slate-200 dark:bg-slate-800 my-4" />
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Extensive document content rendered inside a full viewport modal...
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter align="right">
          <button 
            onClick={closeModal}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-sm font-medium"
          >
            Close Preview
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
```

---

### Recipe 4: Custom Header Icons & Subtitles

Adding custom icon highlights for feedback dialogs.

```tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/shared/ui/Modal';
import { CheckCircle2 } from 'lucide-react';

export const SuccessModal = () => {
  const { isOpen, openModal, closeModal } = useModal(true);

  return (
    <Modal open={isOpen} onClose={closeModal} size="md">
      <ModalHeader 
        icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />}
        title="Resume Exported!"
        description="Your PDF version has been created successfully."
      />
      <ModalBody>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The file is ready and downloaded to your default Downloads folder.
        </p>
      </ModalBody>
      <ModalFooter align="center">
        <button 
          onClick={closeModal}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition"
        >
          Great, thanks!
        </button>
      </ModalFooter>
    </Modal>
  );
};
```

---

### Recipe 5: Footer Alignments (Left, Center, Right)

Use the `align` prop on `<ModalFooter />` to adjust key layout alignments:

```tsx
/* Left Aligned */
<ModalFooter align="left">
  <button onClick={onHelpClick}>Need Help?</button>
</ModalFooter>

/* Center Aligned */
<ModalFooter align="center">
  <button onClick={onGotItClick}>Got it</button>
</ModalFooter>

/* Right Aligned (Default) */
<ModalFooter align="right">
  <button onClick={onCancel}>Cancel</button>
  <button onClick={onSave}>Save Changes</button>
</ModalFooter>
```

---

### Recipe 6: Non-Dismissible / Sticky Modal

Prevent the user from closing the modal by clicking outside or pressing Escape (e.g., mandatory terms agreement or progress bar):

```tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody } from '@/shared/ui/Modal';
import { Loader2 } from 'lucide-react';

export const ProcessingModal = ({ isProcessing }: { isProcessing: boolean }) => {
  return (
    <Modal 
      open={isProcessing} 
      onClose={() => {}} // No-op callback
      closeOnOverlay={false} // Disable backdrop click
      closeOnEsc={false}     // Disable ESC key press
      size="sm"
    >
      <ModalHeader title="Generating AI Summary..." />
      <ModalBody>
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-sm text-slate-500">Please wait while AI analyzes your experience.</p>
        </div>
      </ModalBody>
    </Modal>
  );
};
```

---

### Recipe 7: Custom Theme Overrides (`styleConfig`)

Customizing colors, border radius, backdrop blur, and paddings directly via `styleConfig`.

```tsx
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalStyleConfig } from '@/shared/ui/Modal';

const glassmorphismStyle: ModalStyleConfig = {
  overlay: {
    bg: 'bg-indigo-950/30',
    blur: 'backdrop-blur-md',
  },
  panel: {
    bg: 'bg-slate-900/90',
    border: 'border border-indigo-500/20',
    rounded: 'rounded-3xl',
    shadow: 'shadow-2xl shadow-indigo-500/10',
  },
  header: {
    bg: 'bg-transparent',
    titleColor: 'text-indigo-200',
    descColor: 'text-indigo-400',
    closeBtnColor: 'text-indigo-400 hover:text-white',
  },
  body: {
    bg: 'bg-transparent',
    textColor: 'text-slate-300',
  },
  footer: {
    bg: 'bg-slate-900/40',
    border: 'border-t border-indigo-500/20',
  },
};

export const CustomStyledModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Modal open={open} onClose={onClose} styleConfig={glassmorphismStyle}>
      <ModalHeader title="Glassmorphic Theme" description="Custom design tokens applied" />
      <ModalBody>
        <p>This modal uses custom glassmorphism styling via the `styleConfig` prop!</p>
      </ModalBody>
      <ModalFooter align="right">
        <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-xl">
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};
```

---

## ♿ Best Practices & Accessibility Guidelines

1. **Always Provide Clear Titles**: Ensure every modal has a clear `<ModalHeader title="..." />` or explicit labels so screen readers identify the purpose of the dialog.
2. **Focus First Input**: For modals containing forms, set `initialFocusRef` to the first input field to reduce keyboard navigation steps for users.
3. **Keep Body Content Readable**: Avoid embedding massive forms into small `sm` modals; choose appropriate sizes (`lg` or `xl`) to allow clear input placement.
4. **Avoid Nesting Modals**: Opening a modal on top of another modal causes focus confusion and jarring accessibility experiences. Use multi-step wizard views within a single modal instead.
5. **Use Scrollable Body**: For long content, ensure `scrollable={true}` (default) is enabled on `<ModalBody />` so the header and footer remain pinned in view.

---

## ❓ Troubleshooting & FAQ

### Q1: The modal content is being clipped or hidden by another element on the page.
**Solution**: The modal uses React Portals by default (`document.body`). Ensure that no CSS global rules on `body` set `transform`, `perspective`, or `filter`, as these create new stacking contexts that can constrain fixed elements.

### Q2: How do I focus a specific input element when the modal opens?
**Solution**: Pass a ref to `initialFocusRef` on the `<Modal />` component:
```tsx
const inputRef = useRef<HTMLInputElement>(null);
<Modal open={isOpen} onClose={closeModal} initialFocusRef={inputRef}>
  <input ref={inputRef} />
</Modal>
```

### Q3: How do I disable closing when clicking outside the modal panel?
**Solution**: Set `closeOnOverlay={false}`.

### Q4: Can I use custom animations or disable Framer Motion?
**Solution**: The spring animation parameters are configured inside `Modal.tsx`. Custom styling and scaling can be customized via `styleConfig` panel classes or by wrapping custom content inside `<ModalBody />`.

---

## 📄 License & Attribution
Part of the **Sutra-ui UI Component Architecture**. Built with React, Framer Motion, Tailwind CSS, and Lucide Icons.
