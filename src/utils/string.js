
export const ucfirst = string => string.replace(string[0], string[0].toUpperCase());

export const kebabCaseToTitle = string => string.split('_').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');