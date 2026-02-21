/**
 * Smoothly scrolls to a target element with offset to account for sticky header
 * @param targetId - The ID of the target element (with or without #)
 * @param offset - Additional offset in pixels (default: 80 for navbar height)
 */
export function smoothScrollToElement(targetId: string, offset: number = 80): void {
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);
  
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Triggers a highlight effect on the target element
 * @param targetId - The ID of the target element (with or without #)
 */
export function triggerHighlightEffect(targetId: string): void {
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);
  
  if (!element) {
    return;
  }

  // Dispatch custom event to trigger highlight
  const event = new CustomEvent('scrollHighlight', { detail: { targetId: id } });
  element.dispatchEvent(event);
}

/**
 * Scrolls to a section by ID and optionally triggers highlight effect
 * @param sectionId - The ID of the section to scroll to (without #)
 * @param highlight - Whether to trigger highlight effect (default: true)
 */
export function scrollToSection(sectionId: string, highlight: boolean = true): void {
  smoothScrollToElement(sectionId);
  if (highlight) {
    setTimeout(() => {
      triggerHighlightEffect(sectionId);
    }, 500);
  }
}
