/**
 * Converts any string into a usable url.
 * This is used for the country pages as using the raw name results in SEO unfriendly urls.
 * @param name - url to convert
 * @returns - converted url
 */
export default function toUrlConverter(name: string): string {
    return name.toLowerCase().replaceAll(" ", "-");
}