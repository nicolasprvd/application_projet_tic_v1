import { TypeUtilisateur } from 'app/shared/model/enumerations/type-utilisateur.model';

export interface IUserExtra {
  id?: number;
  actif?: boolean;
  typeUtilisateur?: TypeUtilisateur;
  groupeId?: number;
  evaluationId?: number;
  userId?: number;
}

export class UserExtra implements IUserExtra {
  constructor(
    public id?: number,
    public actif?: boolean,
    public typeUtilisateur?: TypeUtilisateur,
    public groupeId?: number,
    public evaluationId?: number,
    public userId?: number
  ) {
    this.actif = this.actif || false;
  }
}
