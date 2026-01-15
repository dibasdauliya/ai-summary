import type { AIService } from './types';
import { chatgptIcon, claudeIcon, geminiIcon, perplexityIcon, grokIcon } from './icons';

export const DEFAULT_QUERY = `As a potential client, I want to concretely understand what I will receive with {subject}. Detail step by step what the service includes: ...
Explain it simply, as if you were describing the real experience of the service.`;

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
    baseUrl: 'https://grok.x.ai/',
    queryParam: 'q',
  },
];
