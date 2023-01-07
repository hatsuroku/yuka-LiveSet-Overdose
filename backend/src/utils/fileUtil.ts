export const getSuffix = (filename: string): string | undefined => {
    return filename.split('.').pop()?.toLowerCase();
}

export const removeSuffix = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf('.'));
}

export const suffixToLowerCase = (filename: string): string => {
    const suffix = getSuffix(filename);
    if (!suffix) {
        return filename;
    }
    return `${removeSuffix(filename)}.${suffix.toLowerCase()}`;
}