import * as util from "node:util";

export default function console_log(...objects: any[]) {
  console.log(...objects.map((object) => util.inspect(object, {showHidden: false, depth: null, colors: true})));
}
