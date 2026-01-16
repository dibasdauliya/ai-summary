# @ai-summary/react

A React component that allows website visitors to request AI-generated summaries from popular AI services like ChatGPT, Claude, Gemini, Perplexity, and Grok.

![Preview](https://raw.githubusercontent.com/dibasdauliya/ai-summary/main/preview.png)

## Features

- 🎨 **Light & Dark themes** with auto-detection
- 🔧 **Fully customizable** - colors, fonts, sizes
- ⚡ **Lightweight** - ~3KB (+ @ai-summary/core peer dependency)
- ⚛️ **React-first** - proper hooks and TypeScript support
- 📱 **Responsive** - mobile-friendly design
- ♿ **Accessible** - proper ARIA labels and keyboard navigation

## Installation

```bash
npm install @ai-summary/react
# or
pnpm add @ai-summary/react
```

## Usage

```tsx
import { AISummary } from '@ai-summary/react';
import '@ai-summary/core/styles';

function App() {
  return (
    <AISummary 
      subject="YourProduct"
      theme="light" // or 'dark' or 'auto'
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `subject` | `string` | **required** | The subject to summarize |
| `title` | `string` | `"Request an AI summary of"` | Title text before subject |
| `query` | `string` | See docs | The prompt sent to AI services |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Color theme |
| `openInNewTab` | `boolean` | `true` | Open AI links in new tab |
| `className` | `string` | `''` | Additional CSS class |

## For Vanilla JS

Use [@ai-summary/core](https://www.npmjs.com/package/@ai-summary/core) for a framework-agnostic version.

## License

MIT
