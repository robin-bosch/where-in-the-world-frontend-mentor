export default function toUrlConverter(name: string): string {
    return name.toLowerCase().replaceAll(" ", "-");
}