const REGEX = /https?:\/\//i;

export class SocialNetworkValidator {

  public static formatUrl(url: string): string {
    const matched = url.match(REGEX);
    if (matched) {
      const matchedString = matched[0].toLowerCase();
      const host = url.split(REGEX)[1];
      return matchedString + host;
    }
    return `https://${url}`;
  }
}
