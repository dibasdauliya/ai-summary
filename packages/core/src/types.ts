/**
 * AI Service configuration
 */
export interface AIService {
  /** Unique identifier for the service */
  id: string;
  /** Display name */
  name: string;
  /** SVG icon as string */
  icon: string;
  /** Base URL for the chat/search interface */
  baseUrl: string;
  /** Query parameter name (default: 'q') */
  queryParam?: string;
}

/**
 * Custom styles configuration
 */
export interface AISummaryStyles {
  /** Container background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Icon color */
  iconColor?: string;
  /** Icon hover color */
  iconHoverColor?: string;
  /** Icon size in pixels */
  iconSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Border radius */
  borderRadius?: string;
  /** Padding */
  padding?: string;
}

/**
 * Main configuration for the AI Summary Widget
 */
export interface AISummaryConfig {
  /** Target element - CSS selector string or HTMLElement */
  target: string | HTMLElement;
  /** Title text (default: "Request an AI summary of") */
  title?: string;
  /** Subject name to display after title */
  subject: string;
  /** The query/prompt to send to AI services */
  query?: string;
  /** Override default AI services */
  services?: AIService[];
  /** Theme mode */
  theme?: 'light' | 'dark' | 'auto';
  /** Custom styles */
  styles?: Partial<AISummaryStyles>;
  /** Open links in new tab (default: true) */
  openInNewTab?: boolean;
}

/**
 * Options for the createAISummary function
 */
export type CreateAISummaryOptions = AISummaryConfig;
