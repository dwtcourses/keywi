import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../general/environment';
import {KeyListEto} from './common/to/KeyListEto';

@Injectable()
export class KeymanagementRestService {

  constructor(private http: HttpClient) { }

  findAllKeylists(): Observable<any> {
    return this.http.get<KeyListEto>(environment.REST_BASE_PATH + '/keylists');
  }
}

