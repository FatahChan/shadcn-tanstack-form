import type { HtmlHTMLAttributes } from "react";

export function Iframe(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  return <iframe {...props} />;
}
