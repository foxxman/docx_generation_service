interface Props {
    extension: string;
    name?: string;
}

export const generateFileName = (props: Props): string => {
    const {
        extension,
        name,
    } = props;

    return  `${(name ? name.replace(' ', '_') + '_' : '') + Date.now()}.${extension}`;;
}