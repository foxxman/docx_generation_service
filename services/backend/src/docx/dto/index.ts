import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Properties } from '../types/properties';
import { RequestsBody } from 'types/reqests';

class DocumentContentDto implements Properties.CreateDocumentTemplate {
    @IsString()
    @IsNotEmpty()
    readonly to: string;
    
    @IsString()
    @IsNotEmpty()
    readonly from: string;
    
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    
    @IsString()
    @IsNotEmpty()
    readonly text: string;
    
    @IsString()
    @IsNotEmpty()
    readonly addressee: string;
}

export class PostGenerateDocumentDto implements RequestsBody.PostGenerateDocument {
    @IsString()
    readonly documentName?: string;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => DocumentContentDto)
    readonly content: DocumentContentDto;
}


export class PostCompareDocumentDto implements RequestsBody.PostCompareDocument {
    @IsString()
    readonly to: string;
    
    @IsString()
    readonly from: string;
    
    @IsString()
    readonly title: string;
    
    @IsString()
    readonly text: string;
    
    @IsString()
    readonly addressee: string;
}
