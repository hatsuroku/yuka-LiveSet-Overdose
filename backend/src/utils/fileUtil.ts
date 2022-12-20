export const getSuffixName = (filename: string): string | undefined => {
    return filename.split('.').pop()?.toLowerCase();
}