# @ai-summary/core

A lightweight, framework-agnostic widget that allows website visitors to request AI-generated summaries from popular AI services like ChatGPT, Claude, Gemini, Perplexity, and Grok.

![Preview](https://raw.githubusercontent.com/dibasdauliya/ai-summary/main/preview.png)

## Features

- 🎨 **Light & Dark themes** with auto-detection
- 🔧 **Fully customizable** - colors, fonts, sizes
- ⚡ **Lightweight** - ~10KB
- 🌐 **Framework agnostic** - works with vanilla JS, React, Vue, etc.
- 📱 **Responsive** - mobile-friendly design
- ♿ **Accessible** - proper ARIA labels and keyboard navigation

## Installation

```bash
npm install @ai-summary/core
# or
pnpm add @ai-summary/core
```

## Usage

```html
<div id="ai-summary"></div>

<script type="module">
  import { createAISummary } from '@ai-summary/core';
  import '@ai-summary/core/styles';

  createAISummary({
    target: '#ai-summary',
    subject: 'YourProduct',
    theme: 'light', // or 'dark' or 'auto'
  });
</script>
```

## Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `subject` | `string` | **required** | The subject to summarize |
| `title` | `string` | `"Request an AI summary of"` | Title text before subject |
| `query` | `string` | See docs | The prompt sent to AI services |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Color theme |
| `openInNewTab` | `boolean` | `true` | Open AI links in new tab |

## For React

Use [@ai-summary/react](https://www.npmjs.com/package/@ai-summary/react) for a React-specific wrapper.

## License

MIT
