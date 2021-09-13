function fallbackCopyToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");

  document.body.removeChild(textArea);
}

export default async function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text);
    return;
  }
  await navigator.clipboard.writeText(text);
}
