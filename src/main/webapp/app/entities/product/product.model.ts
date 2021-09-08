export interface IProduct {
  id?: number;
  name?: string | null;
  year?: number | null;
  region?: string | null;
  type?: string | null;
  price?: number | null;
  description?: string | null;
  alcoholPer?: number | null;
  recommandation?: string | null;
  ageLimit?: number | null;
  temperature?: number | null;
  percentPromo?: number | null;
  stock?: number | null;
  urlImage?: string | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string | null,
    public year?: number | null,
    public region?: string | null,
    public type?: string | null,
    public price?: number | null,
    public description?: string | null,
    public alcoholPer?: number | null,
    public recommandation?: string | null,
    public ageLimit?: number | null,
    public temperature?: number | null,
    public percentPromo?: number | null,
    public stock?: number | null,
    public urlImage?: string | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
