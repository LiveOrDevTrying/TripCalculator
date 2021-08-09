import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  webapiUri = 'https://localhost:5001';

  constructor() { }
}
