export default function getIdFromUrl(url: string): string {
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    return id;
}