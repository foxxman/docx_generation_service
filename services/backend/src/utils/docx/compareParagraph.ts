import { createListFromParagraph } from './createListFromParagraph';

interface Props {
    incoming: string;
    existing: string;
}

export interface ICompareResults {
    incoming: string;
    existing: string;
}


export const compareParagraph = ({
    incoming,
    existing,
}: Props): ICompareResults | null => {
    if (incoming === existing ) {
        return null;
    }

    const dividedIncoming = createListFromParagraph({text: incoming});
    const dividedExisting = createListFromParagraph({text: existing});

    let i = 0;
    const compareResult: ICompareResults = {
        incoming: "",
        existing: "",
    }
    
    while (dividedExisting[i] || dividedIncoming[i]) {
        if(dividedExisting[i] !== dividedIncoming[i]) {
            compareResult.incoming += `${dividedIncoming[i] || `${i+1}. -`} \n`;
            compareResult.existing += `${dividedExisting[i] || `${i+1}. -`} \n`;
        }
        i++;
    }

    return compareResult;
}
