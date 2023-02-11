export interface IImageUrl {
  url: string;
}

export interface IVariant {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  variants: IVariant[];
  imageUrls: IImageUrl[];
}
