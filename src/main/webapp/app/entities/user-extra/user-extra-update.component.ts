import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IGroupe } from 'app/shared/model/groupe.model';
import { GroupeService } from 'app/entities/groupe/groupe.service';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation/evaluation.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IGroupe | IEvaluation | IUser;

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving = false;
  groupes: IGroupe[] = [];
  evaluations: IEvaluation[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    actif: [],
    typeUtilisateur: [],
    groupeId: [],
    evaluationId: [],
    userId: []
  });

  constructor(
    protected userExtraService: UserExtraService,
    protected groupeService: GroupeService,
    protected evaluationService: EvaluationService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);

      this.groupeService
        .query({ filter: 'userextra-is-null' })
        .pipe(
          map((res: HttpResponse<IGroupe[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGroupe[]) => {
          if (!userExtra.groupeId) {
            this.groupes = resBody;
          } else {
            this.groupeService
              .find(userExtra.groupeId)
              .pipe(
                map((subRes: HttpResponse<IGroupe>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGroupe[]) => (this.groupes = concatRes));
          }
        });

      this.evaluationService
        .query({ filter: 'userextra-is-null' })
        .pipe(
          map((res: HttpResponse<IEvaluation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEvaluation[]) => {
          if (!userExtra.evaluationId) {
            this.evaluations = resBody;
          } else {
            this.evaluationService
              .find(userExtra.evaluationId)
              .pipe(
                map((subRes: HttpResponse<IEvaluation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEvaluation[]) => (this.evaluations = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(userExtra: IUserExtra): void {
    this.editForm.patchValue({
      id: userExtra.id,
      actif: userExtra.actif,
      typeUtilisateur: userExtra.typeUtilisateur,
      groupeId: userExtra.groupeId,
      evaluationId: userExtra.evaluationId,
      userId: userExtra.userId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id'])!.value,
      actif: this.editForm.get(['actif'])!.value,
      typeUtilisateur: this.editForm.get(['typeUtilisateur'])!.value,
      groupeId: this.editForm.get(['groupeId'])!.value,
      evaluationId: this.editForm.get(['evaluationId'])!.value,
      userId: this.editForm.get(['userId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>): void {
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
