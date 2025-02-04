import {ReactNode} from "react";

export const switchValue = function(value: any, map: {[key: string]: any} ): any {
  return map[value];
}