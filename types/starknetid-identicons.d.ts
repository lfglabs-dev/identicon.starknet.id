declare module "starknetid-identicons" {
  export default class Identicons {
    static svgPath: string;
    static svg(tokenId: string): Promise<string>;
  }
}
