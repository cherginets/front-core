import {APP_HOST} from "@/core/constants";

type LinkType = "relative" | "absolute";

export class LinkerItem {
  public absoluteUrl: string = "";
  public relativeUrl: string = "";
  public type: LinkType = "relative";
  public title: string | number = "";

  constructor(props: {absoluteUrl?: string; relativeUrl?: string; title?: string | number; type?: LinkType}) {
    if (props.absoluteUrl) this.absoluteUrl = props.absoluteUrl;
    if (props.relativeUrl) {
      this.relativeUrl = props.relativeUrl;
      if (!this.absoluteUrl) this.absoluteUrl = `${APP_HOST}${props.relativeUrl}`;
    }
    if (props.title) this.title = props.title;
    if (props.type) this.type = props.type;
  }

  href() {
    if (this.type === "relative") return this.relativeUrl || this.absoluteUrl;
    return this.absoluteUrl;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
    return this;
  }

  setRelativeUrl(url: string) {
    this.relativeUrl = url;
    this.absoluteUrl = `${APP_HOST}${url}`;
    return this;
  }

  relative() {
    this.type = "relative";
    return this;
  }

  absolute() {
    this.type = "absolute";
    return this;
  }

  jsx() {
    return (
      <a className={"link"} href={this.href()}>
        {this.title}
      </a>
    );
  }

  formatToTg(): string {
    return `<a href="${this.absoluteUrl}">${this.title}</a>`;
  }
}
