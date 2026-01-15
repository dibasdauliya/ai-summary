// Main component
export { AISummary, default } from './AISummary';
export type { AISummaryProps } from './AISummary';

// Re-export types and utilities from core
export {
  type AIService,
  type AISummaryStyles,
  DEFAULT_SERVICES,
  DEFAULT_QUERY,
  DEFAULT_TITLE,
  chatgptIcon,
  claudeIcon,
  geminiIcon,
  perplexityIcon,
  grokIcon,
  icons,
} from '@ai-summary/core';
