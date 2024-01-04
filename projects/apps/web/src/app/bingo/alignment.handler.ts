import { TextareaFactory } from './textarea.factory';

type AlignCache = { fontSize: number; paddingTop: number };

export class AlignmentHandler {
  private static cache: Record<string, AlignCache> = {};

  public static align(textarea: HTMLTextAreaElement): void {
    const div = document.createElement('div');
    div.innerText = textarea.value;
    const cacheKey = div.innerHTML;

    if (cacheKey) {
      let cache = AlignmentHandler.cache[cacheKey];

      if (!cache) {
        const computedStyle = getComputedStyle(textarea);
        textarea.style.paddingTop = '0';
        const height = computedStyle.getPropertyValue('height');
        const width = computedStyle.getPropertyValue('width');
        const cellHeight = parseInt(height.substring(0, height.length - 2));
        const availableHeight = cellHeight - 10;
        const mockTextarea = TextareaFactory.makeTextarea();

        mockTextarea.style.width = width;
        mockTextarea.style.height = `${availableHeight}px`;
        mockTextarea.style.whiteSpace = 'pre-wrap';
        mockTextarea.innerHTML = cacheKey;

        const fontSize = AlignmentHandler.setupFontStyles(mockTextarea, 32, 1);
        mockTextarea.style.height = 'auto';
        const rendered_height = mockTextarea.scrollHeight;
        const paddingTop = cellHeight / 2 - rendered_height / 2;

        cache = { fontSize: fontSize, paddingTop: paddingTop } as AlignCache;
        AlignmentHandler.cache[cacheKey] = cache;
      }

      textarea.style.fontSize = `${cache.fontSize}px`;
      textarea.style.paddingTop = `${cache.paddingTop}px`;
    }
  }

  private static checkForOverflow(
    div: HTMLDivElement,
    fontSize: number
  ): boolean {
    div.style.fontSize = `${fontSize}px`;

    return (
      div.scrollWidth > div.clientWidth || div.scrollHeight > div.clientHeight
    );
  }

  private static calculateFontSize(
    div: HTMLDivElement,
    maxFontSize: number
  ): number {
    let high = maxFontSize;
    let low = -1;

    while (high > low + 1) {
      const fontSize = low + ((high - low) >> 1);

      [low, high] = AlignmentHandler.checkForOverflow(div, fontSize)
        ? [low, fontSize]
        : [fontSize, high];
    }

    return high;
  }

  private static setupFontStyles(
    div: HTMLDivElement,
    maxFontSize: number,
    minFontSize: number
  ): number {
    const fontSize = Math.max(
      minFontSize,
      Math.min(
        AlignmentHandler.calculateFontSize(div, maxFontSize + 1) - 1,
        maxFontSize
      )
    );
    div.style.fontSize = `${fontSize}px`;

    return fontSize;
  }
}
