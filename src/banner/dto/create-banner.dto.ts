import { IsNotEmpty, IsString, IsUrl } from 'class-validator'
import { Language } from 'src/language/entities/language.entity'

export class CreateBannerDto {
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string

  @IsNotEmpty()
  @IsString()
  heading1: string

  @IsNotEmpty()
  @IsString()
  heading2: string

  @IsNotEmpty()
  languageId: Language
}
