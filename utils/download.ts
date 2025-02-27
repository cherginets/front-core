export const download = (filename: string, text: string): void => {
  let element = document.createElement("a");
  const universalBOM = "\uFEFF";
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(universalBOM + text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
