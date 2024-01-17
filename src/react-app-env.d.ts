/// <reference types="react-scripts" />
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare namespace ReactListX {
  export type ItemRenderer = (
    index: number,
    key: number | string
  ) => JSX.Element;
  export type ItemSizeGetter = (index: number) => number;
}
