export interface IGroupe {
  id?: number;
  valide?: boolean;
  projetId?: number;
  userExtraId?: number;
}

export class Groupe implements IGroupe {
  constructor(public id?: number, public valide?: boolean, public projetId?: number, public userExtraId?: number) {
    this.valide = this.valide || false;
  }
}
