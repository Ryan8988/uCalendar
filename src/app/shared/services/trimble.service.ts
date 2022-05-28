import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private singleSearchUri = 'https://singlesearch.alk.com/WW/api/search?authToken=0743E1D2A82AD34682EFE73404AE4C0F';
  constructor(private http: HttpClient) {

  }
  singleSearch(address): any {
    const uri = this.singleSearchUri;
    const params = {query: address};
    return this.http.get<any>(uri, {params, withCredentials: true});
  }

}
