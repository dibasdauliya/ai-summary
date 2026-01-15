import React, { useMemo } from 'react';
import {
  DEFAULT_SERVICES,
  DEFAULT_QUERY,
  DEFAULT_TITLE,
  type AIService,
  type AISummaryStyles,
} from '@ai-summary/core';

// Note: Users should import styles separately:
// import '@ai-summary/core/styles';

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
