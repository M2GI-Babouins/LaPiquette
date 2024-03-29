import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IClient, Client } from '../client.model';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [null, []],
    firstName: [],
    lastName: [],
    email: [],
    adress: [],
    loggedIn: [],
    password: [],
  });

  constructor(protected clientService: ClientService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    // if (client.id !== undefined) {
    //  this.subscribeToSaveResponse(this.clientService.update(client));
    // } else {
    this.subscribeToSaveResponse(this.clientService.create(client));
    // }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      adress: client.adress,
      loggedIn: client.loggedIn,
      password: client.password,
    });
  }

  protected createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      loggedIn: this.editForm.get(['loggedIn'])!.value,
      password: this.editForm.get(['password'])!.value,
    };
  }
}
