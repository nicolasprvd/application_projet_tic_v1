import { IDocument } from 'app/shared/model/document.model';

export interface IProjet {
  id?: number;
  nom?: string;
  descriptionPDFContentType?: string;
  descriptionPDF?: any;
  descriptionTexte?: string;
  nbEtudiant?: number;
  automatique?: boolean;
  archive?: boolean;
  groupeId?: number;
  userExtraId?: number;
  documents?: IDocument[];
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public nom?: string,
    public descriptionPDFContentType?: string,
    public descriptionPDF?: any,
    public descriptionTexte?: string,
    public nbEtudiant?: number,
    public automatique?: boolean,
    public archive?: boolean,
    public groupeId?: number,
    public userExtraId?: number,
    public documents?: IDocument[]
  ) {
    this.automatique = this.automatique || false;
    this.archive = this.archive || false;
  }
}
