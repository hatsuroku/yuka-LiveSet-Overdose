export const getSuffix = (filename: string): string | undefined => {
    return filename.split('.').pop()?.toLowerCase();
}

export const removeSuffix = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf('.'));
}