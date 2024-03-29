interface Props {
    text: string;
}

export const createListFromParagraph = (props: Props): (string | null)[] => {
    if (props.text === '') {
        return [];
    }
    
    return props.text.trim()
        .split(' \t ')
        .map((item, index) => item.trim() ? `${index+1}. ${item.trim()}` : null);
}
