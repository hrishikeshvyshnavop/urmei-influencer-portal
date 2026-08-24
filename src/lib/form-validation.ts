export function scrollToFirstError(form: HTMLFormElement) {
  window.requestAnimationFrame(() => {
    const field = form.querySelector<HTMLElement>(
      '[aria-invalid="true"], input:invalid, select:invalid, textarea:invalid',
    );
    if (!field) return;

    field.focus({ preventScroll: true });
    field.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
