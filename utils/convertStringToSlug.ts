import slugify from "slugify";

export function convertStringToSlug(title: string): string {
  return slugify(title.replace(/\p{Emoji}/gu, ""), {
    replacement: "-",
    remove: /[*+~.()'"!:;,·@]/g,
    lower: true,
    trim: true,
  })
    .replaceAll(/[^a-z0-9\-_]/g, "")
    .replace(/^[^a-z]+|[^a-z]+$/gi, "")
    .replaceAll(/[\-]+/g, "-");
}
