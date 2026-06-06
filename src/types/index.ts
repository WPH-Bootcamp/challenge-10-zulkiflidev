export interface Menu {
  id: number;
  name?: string;
  foodName?: string;
  image?: string;
  description?: string;
  price?: number;
  type?: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  menu: {
    id: number;
  };
}

export interface Review {
  id?: string | number;
  user?: { name: string };
  name?: string;
  star?: number;
  rating?: number;
  comment?: string;
}
