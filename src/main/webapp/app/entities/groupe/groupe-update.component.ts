import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGroupe, Groupe } from 'app/shared/model/groupe.model';
import { GroupeService } from './groupe.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet/projet.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra/user-extra.service';

type SelectableEntity = IProjet | IUserExtra;

@Component({
  selector: 'jhi-groupe-update',
  templateUrl: './groupe-update.component.html'
})
export class GroupeUpdateComponent implements OnInit {
  isSaving = false;
  projets: IProjet[] = [];
  userextras: IUserExtra[] = [];

  editForm = this.fb.group({
    id: [],
    valide: [null, [Validators.required]],
    projetId: [],
    userExtraId: []
  });

  constructor(
    protected groupeService: GroupeService,
    protected projetService: ProjetService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupe }) => {
      this.updateForm(groupe);

      this.projetService
        .query({ filter: 'groupe-is-null' })
        .pipe(
          map((res: HttpResponse<IProjet[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProjet[]) => {
          if (!groupe.projetId) {
            this.projets = resBody;
          } else {
            this.projetService
              .find(groupe.projetId)
              .pipe(
                map((subRes: HttpResponse<IProjet>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProjet[]) => (this.projets = concatRes));
          }
        });

      this.userExtraService
        .query({ filter: 'groupe-is-null' })
        .pipe(
          map((res: HttpResponse<IUserExtra[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserExtra[]) => {
          if (!groupe.userExtraId) {
            this.userextras = resBody;
          } else {
            this.userExtraService
              .find(groupe.userExtraId)
              .pipe(
                map((subRes: HttpResponse<IUserExtra>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUserExtra[]) => (this.userextras = concatRes));
          }
        });
    });
  }

  updateForm(groupe: IGroupe): void {
    this.editForm.patchValue({
      id: groupe.id,
      valide: groupe.valide,
      projetId: groupe.projetId,
      userExtraId: groupe.userExtraId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupe = this.createFromForm();
    if (groupe.id !== undefined) {
      this.subscribeToSaveResponse(this.groupeService.update(groupe));
    } else {
      this.subscribeToSaveResponse(this.groupeService.create(groupe));
    }
  }

  private createFromForm(): IGroupe {
    return {
      ...new Groupe(),
      id: this.editForm.get(['id'])!.value,
      valide: this.editForm.get(['valide'])!.value,
      projetId: this.editForm.get(['projetId'])!.value,
      userExtraId: this.editForm.get(['userExtraId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupe>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
