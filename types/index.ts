export type Game = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  library: string;
  libraryHero: string;
  logo: string;
  cover: string;
};

export type CartItem = Game & { quantity: number };

export type CarouselSlide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export type Order = {
  id: number;
  client: string;
  product: string;
  total: number;
  status: string;
}

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  category_name?: string;
};
