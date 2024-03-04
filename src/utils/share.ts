export async function sharePoem() {
  const shareText = window.location.href;
  try {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch (e) {
      console.error(e);
      // Fallback for browsers without Clipboard API support
      const ID_CONTENT_WRAPPER = "share-content-wrapper";
      const ATTR_HIDDEN = "hidden";
      const moveChildInto = (parentElement: Element, childElement: Element) => {
        if (childElement.parentElement === parentElement) return;
        parentElement.appendChild(childElement);
      };
      const textarea =
        Array.from(document.getElementsByTagName("textarea")).find(
          (elem) => elem.id === ID_CONTENT_WRAPPER
        ) ?? document.createElement("textarea");
      textarea.id = ID_CONTENT_WRAPPER;
      textarea.value = shareText;
      textarea.style.visibility = "invisible";
      textarea.setAttribute(ATTR_HIDDEN, "true");
      moveChildInto(document.body, textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  } catch (e) {
    console.error(e);
  }
}
