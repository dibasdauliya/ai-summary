import type { AISummaryConfig, AISummaryStyles, AIService } from './types';
import { DEFAULT_SERVICES, DEFAULT_QUERY, DEFAULT_TITLE } from './defaults';
import './styles.css';

/**
 * AI Summary Widget - Renders a widget for requesting AI summaries
 */
export class AISummaryWidget {
  private container: HTMLElement | null = null;
  private config: Required<Omit<AISummaryConfig, 'target' | 'styles'>> & { styles: Partial<AISummaryStyles> };
  private targetElement: HTMLElement;

  constructor(config: AISummaryConfig) {
    // Resolve target element
    if (typeof config.target === 'string') {
      const el = document.querySelector<HTMLElement>(config.target);
      if (!el) {
        throw new Error(`AI Summary Widget: Target element "${config.target}" not found`);
      }
      this.targetElement = el;
    } else {
      this.targetElement = config.target;
    }

    // Merge with defaults
    this.config = {
      title: config.title ?? DEFAULT_TITLE,
      subject: config.subject,
      query: config.query ?? DEFAULT_QUERY.replace('{subject}', config.subject),
      services: config.services ?? DEFAULT_SERVICES,
      theme: config.theme ?? 'light',
      openInNewTab: config.openInNewTab ?? true,
      styles: config.styles ?? {},
    };

    this.render();
  }

  /**
   * Generate the URL for an AI service with the query
   */
  private generateUrl(service: AIService): string {
    const queryParam = service.queryParam ?? 'q';
    const encodedQuery = encodeURIComponent(this.config.query);
    return `${service.baseUrl}?${queryParam}=${encodedQuery}`;
  }

  /**
   * Apply custom styles to the container
   */
  private applyCustomStyles(): void {
    if (!this.container) return;
    const styles = this.config.styles;

    if (styles.backgroundColor) {
      this.container.style.setProperty('--ai-summary-bg', styles.backgroundColor);
    }
    if (styles.textColor) {
      this.container.style.setProperty('--ai-summary-text', styles.textColor);
    }
    if (styles.iconColor) {
      this.container.style.setProperty('--ai-summary-icon', styles.iconColor);
    }
    if (styles.iconHoverColor) {
      this.container.style.setProperty('--ai-summary-icon-hover', styles.iconHoverColor);
    }
    if (styles.iconSize) {
      this.container.style.setProperty('--ai-summary-icon-size', `${styles.iconSize}px`);
    }
    if (styles.fontFamily) {
      this.container.style.setProperty('--ai-summary-font', styles.fontFamily);
    }
    if (styles.borderRadius) {
      this.container.style.setProperty('--ai-summary-radius', styles.borderRadius);
    }
    if (styles.padding) {
      this.container.style.setProperty('--ai-summary-padding', styles.padding);
    }
  }

  /**
   * Render the widget to the DOM
   */
  render(): void {
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'ai-summary-widget';
    this.container.setAttribute('data-theme', this.config.theme);

    // Apply custom styles
    this.applyCustomStyles();

    // Create title
    const title = document.createElement('h3');
    title.className = 'ai-summary-title';
    title.textContent = `${this.config.title} ${this.config.subject}`;
    this.container.appendChild(title);

    // Create icons container
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'ai-summary-icons';

    // Create icon links
    this.config.services.forEach((service) => {
      const link = document.createElement('a');
      link.className = 'ai-summary-icon-link';
      link.href = this.generateUrl(service);
      link.setAttribute('data-tooltip', service.name);
      link.setAttribute('aria-label', `Get AI summary from ${service.name}`);
      
      if (this.config.openInNewTab) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      link.innerHTML = service.icon;
      iconsContainer.appendChild(link);
    });

    this.container.appendChild(iconsContainer);

    // Clear and append to target
    this.targetElement.innerHTML = '';
    this.targetElement.appendChild(this.container);
  }

  /**
   * Update the query and re-render links
   */
  setQuery(query: string): void {
    this.config.query = query;
    this.render();
  }

  /**
   * Update the subject and re-render
   */
  setSubject(subject: string): void {
    this.config.subject = subject;
    this.config.query = DEFAULT_QUERY.replace('{subject}', subject);
    this.render();
  }

  /**
   * Get the current configuration
   */
  getConfig(): typeof this.config {
    return { ...this.config };
  }

  /**
   * Destroy the widget and clean up
   */
  destroy(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
  }
}

/**
 * Create an AI Summary Widget instance
 * @param config - Widget configuration
 * @returns AISummaryWidget instance
 */
export function createAISummary(config: AISummaryConfig): AISummaryWidget {
  return new AISummaryWidget(config);
}
