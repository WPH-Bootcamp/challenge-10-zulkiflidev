export type MenuType = "drink" | "food";

export interface SampleMenu {

  id: number;
  foodName: string;
  price: number;
  type: MenuType;
  image: string;
}

export interface Restaurant {

  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;

  long: number;
  logo: string;
  images: string[];
  
  category: string;
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;

}