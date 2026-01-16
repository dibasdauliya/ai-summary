import type { AIService } from './types';
import { chatgptIcon, claudeIcon, geminiIcon, perplexityIcon, grokIcon } from './icons';

export const DEFAULT_QUERY = `Give me a summary of {subject}. Explain what it is, what it does, and why someone might use it.`;

export const DEFAULT_TITLE = 'Request an AI summary of';

export const DEFAULT_SERVICES: AIService[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: chatgptIcon,
    baseUrl: 'https://chat.openai.com/',
    queryParam: 'q',
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: claudeIcon,
    baseUrl: 'https://claude.ai/new',
    queryParam: 'q',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: geminiIcon,
    baseUrl: 'https://gemini.google.com/app',
    queryParam: 'q',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: perplexityIcon,
    baseUrl: 'https://perplexity.ai/search',
    queryParam: 'q',
  },
  {
    id: 'grok',
    name: 'Grok',
    icon: grokIcon,
    baseUrl: 'https://grok.com/',
    queryParam: 'q',
  },
];
