export class TextareaFactory {
  private static textarea: HTMLDivElement | null = null;

  private constructor() {}

  public static makeTextarea(): HTMLDivElement {
    if (TextareaFactory.textarea) {
      return TextareaFactory.textarea;
    }

    const current = document.querySelector(
      '.card textarea'
    ) as HTMLTextAreaElement;
    const textarea = document.createElement('div') as HTMLDivElement;

    textarea.style.fontFamily = current.style.fontFamily;
    textarea.style.fontSize = current.style.fontSize;
    textarea.style.width = current.style.width;
    textarea.style.display = 'inline-block';
    textarea.style.left = '-10000px';
    textarea.style.lineHeight = 'normal';
    textarea.style.overflow = 'auto';
    textarea.style.position = 'absolute';
    textarea.style.top = '0';
    textarea.style.visibility = 'hidden';

    document.querySelector('body')?.append(textarea);

    TextareaFactory.textarea = textarea;

    return textarea;
  }
}
