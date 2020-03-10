import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CidadesFiltros{
  nome: string;
  pagina = 0;
  itensPorPaginas = 10;
}

export class CidadesService {

  constructor(private http: HttpClient) { }

  cidadesUrl = 'http://localhost:8080/cidades';

  pesquisar(filtro: CidadesFiltros): Promise<any>{
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPaginas.toString()
      }
    });
    
    if(filtro.nome){
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.cidadesUrl}`, {params})
    .toPromise()
      .then(response => {
        const cidades = response.content;
        const resultado = {
          cidades,
          total: response.totalElements
        }

        return resultado;

      }); 

  }

}
