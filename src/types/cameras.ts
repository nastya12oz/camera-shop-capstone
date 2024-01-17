 enum TCameraType {
  Retro = 'Коллекционная',
  Polaroid = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

 enum TCameraCategory {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат'
}

 enum TLevel {
  None = 'Нулевой',
  Amareur = 'Любительский',
  Prof = 'Профессиональный'
}

export type TCamera = {
  id: number;
  name: string;
  vendorCode: string;
  type: TCameraType;
  category: TCameraCategory;
  description: string;
  level: TLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type TCamerasList = TCamera[];
