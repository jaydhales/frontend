declare module "*.svg" {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */

  const content: import("../dist/shared/lib/image-external").StaticImageData;
  export default content;
}
