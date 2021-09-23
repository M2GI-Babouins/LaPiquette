import { IOrderLine } from 'app/entities/order-line/order-line.model';

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
  imageContentType?: string | null;
  image?: string | null;
  orderLine?: IOrderLine | null;
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
    public imageContentType?: string | null,
    public image?: string | null,
    public orderLine?: IOrderLine | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}

export enum Region {
  Alsace = 'Alsace',
  Aquitaine = 'Aquitaine',
  Auvergne = 'Auvergne',
  BasseNormandie = 'Basse-Normandie',
  Bourgogne = 'Bourgogne',
  Bretagne = 'Bretagne',
  Centre = 'Centre',
  ChampagneArdenne = 'Champagne-Ardenne',
  Corse = 'Corse',
  FrancheCompte = 'Franche-Compté',
  HauteNormandie = 'Haute-Normandie',
  IleDeFrance = 'Ile de France',
  LanquedocRoussillon = 'Lanquedoc-Roussillon',
  Limousin = 'Limousin',
  MidiPyrene = 'Midi-Pyréné',
  NordPasDeCalais = 'Nord Pas de Calais',
  PaysDeLaLoire = 'Pays de la Loire',
  PoitouCharentes = 'Poitou-Charentes',
  ProvenceAlpesCoteDAzur = "Provence Alpes Cote D'Azure",
  RhoneAlpes = 'Rhone Alpes',
}

export enum Recommandation {
  ViandeRouge = 'Viande Rouge',
  ViandeBlanche = 'Viande Blanche',
  Poisson = 'Poisson',
  Aperitif = 'Apéritif',
}

export enum TypeVin {
  Rouge = 'rouge',
  Blanc = 'blanc',
  Rose = 'rosé',
}
