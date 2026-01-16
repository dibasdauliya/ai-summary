import React, { useMemo, useEffect, useRef } from 'react';
import {
  DEFAULT_SERVICES,
  DEFAULT_QUERY,
  DEFAULT_TITLE,
  type AIService,
  type AISummaryStyles,
} from '@ai-summary/core';

const WIDGET_STYLES = `
.ai-summary-widget {
  --ai-summary-bg: #f5f5f4;
  --ai-summary-text: #1a1a1a;
  --ai-summary-icon: #525252;
  --ai-summary-icon-hover: #0a0a0a;
  --ai-summary-radius: 16px;
  --ai-summary-padding: 32px 40px;
  --ai-summary-icon-size: 28px;
  --ai-summary-font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.ai-summary-widget[data-theme="dark"] {
  --ai-summary-bg: #1a1a1a;
  --ai-summary-text: #f5f5f5;
  --ai-summary-icon: #a3a3a3;
  --ai-summary-icon-hover: #ffffff;
}
@media (prefers-color-scheme: dark) {
  .ai-summary-widget[data-theme="auto"] {
    --ai-summary-bg: #1a1a1a;
    --ai-summary-text: #f5f5f5;
    --ai-summary-icon: #a3a3a3;
    --ai-summary-icon-hover: #ffffff;
  }
}
.ai-summary-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: var(--ai-summary-padding);
  background-color: var(--ai-summary-bg);
  border-radius: var(--ai-summary-radius);
  font-family: var(--ai-summary-font);
  box-sizing: border-box;
}
.ai-summary-widget * { box-sizing: border-box; }
.ai-summary-title {
  font-size: 24px;
  font-weight: 400;
  color: var(--ai-summary-text);
  margin: 0;
  text-align: center;
  letter-spacing: -0.02em;
}
.ai-summary-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.ai-summary-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ai-summary-icon);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 8px;
  border-radius: 8px;
}
.ai-summary-icon-link:hover {
  color: var(--ai-summary-icon-hover);
  transform: scale(1.1);
}
.ai-summary-icon-link:focus {
  outline: 2px solid var(--ai-summary-icon-hover);
  outline-offset: 2px;
}
.ai-summary-icon-link svg {
  width: var(--ai-summary-icon-size);
  height: var(--ai-summary-icon-size);
}
.ai-summary-icon-link[data-tooltip] { position: relative; }
.ai-summary-icon-link[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  margin-bottom: 8px;
}
.ai-summary-widget[data-theme="dark"] .ai-summary-icon-link[data-tooltip]::after {
  background-color: #ffffff;
  color: #1a1a1a;
}
@media (prefers-color-scheme: dark) {
  .ai-summary-widget[data-theme="auto"] .ai-summary-icon-link[data-tooltip]::after {
    background-color: #ffffff;
    color: #1a1a1a;
  }
}
.ai-summary-icon-link[data-tooltip]:hover::after {
  opacity: 1;
  visibility: visible;
}
@media (max-width: 480px) {
  .ai-summary-widget {
    --ai-summary-padding: 24px 20px;
    --ai-summary-icon-size: 24px;
  }
  .ai-summary-title { font-size: 20px; }
  .ai-summary-icons { gap: 16px; }
}
`;

// Track if styles have been injected
let stylesInjected = false;

export interface AISummaryProps {
  /** Subject name to display after title */
  subject: string;
  /** Title text (default: "Request an AI summary of") */
  title?: string;
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
  /** Additional CSS class name */
  className?: string;
}

/**
 * AI Summary Widget React Component
 */
export const AISummary: React.FC<AISummaryProps> = ({
  subject,
  title = DEFAULT_TITLE,
  query,
  services = DEFAULT_SERVICES,
  theme = 'light',
  styles = {},
  openInNewTab = true,
  className = '',
}) => {
  // Inject styles on mount (client-side only)
  useEffect(() => {
    if (typeof document !== 'undefined' && !stylesInjected) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-ai-summary', 'true');
      styleEl.textContent = WIDGET_STYLES;
      document.head.appendChild(styleEl);
      stylesInjected = true;
    }
  }, []);

  // Compute the final query
  const finalQuery = useMemo(() => {
    return query ?? DEFAULT_QUERY.replace('{subject}', subject);
  }, [query, subject]);

  // Generate URL for a service
  const generateUrl = (service: AIService): string => {
    const queryParam = service.queryParam ?? 'q';
    const encodedQuery = encodeURIComponent(finalQuery);
    return `${service.baseUrl}?${queryParam}=${encodedQuery}`;
  };

  // Custom CSS variables
  const customStyles: React.CSSProperties = useMemo(() => {
    const vars: Record<string, string> = {};
    if (styles.backgroundColor) vars['--ai-summary-bg'] = styles.backgroundColor;
    if (styles.textColor) vars['--ai-summary-text'] = styles.textColor;
    if (styles.iconColor) vars['--ai-summary-icon'] = styles.iconColor;
    if (styles.iconHoverColor) vars['--ai-summary-icon-hover'] = styles.iconHoverColor;
    if (styles.iconSize) vars['--ai-summary-icon-size'] = `${styles.iconSize}px`;
    if (styles.fontFamily) vars['--ai-summary-font'] = styles.fontFamily;
    if (styles.borderRadius) vars['--ai-summary-radius'] = styles.borderRadius;
    if (styles.padding) vars['--ai-summary-padding'] = styles.padding;
    return vars as React.CSSProperties;
  }, [styles]);

  return (
    <div
      className={`ai-summary-widget ${className}`.trim()}
      data-theme={theme}
      style={customStyles}
    >
      <h3 className="ai-summary-title">
        {title} {subject}
      </h3>
      <div className="ai-summary-icons">
        {services.map((service) => (
          <a
            key={service.id}
            className="ai-summary-icon-link"
            href={generateUrl(service)}
            data-tooltip={service.name}
            aria-label={`Get AI summary from ${service.name}`}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            dangerouslySetInnerHTML={{ __html: service.icon }}
          />
        ))}
      </div>
    </div>
  );
};

export default AISummary;
