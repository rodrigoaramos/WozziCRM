export class Oportunity {

    constructor(values: object = {}) {
         Object.assign(this, values);
    }

    id: number;
    idFigo: number;
    idUsuario: number;
    dataRegistro: Date;
    ehLead: number;
    situacao: number;
    idProduto: number;
    produto: string;
    idCliente: number;
    cliente: string;
    dataInteracao: Date;
    status: string;
    progresso: number;
    percentual: string;
    andamento: string;
    propostas: number;
 }

export class ApiResult {
     data: Oportunity[];
     paging: any;
}

export class Client {

     constructor(values: object = {}) {
          Object.assign(this, values);
     }

     id: number;
     codigo: string;
     nome: string;
     cpfCnpj: string;
     contato: string;
     cargoFuncao: string;
     email: string;
     telefone: string;
     tipo: number;
     comentario: string;
     dataCadastro: Date;
     situacao: number;
}

export class Iteraction {

     constructor(values: object = {}) {
          Object.assign(this, values);
     }

     idInteracao: number;
     idOportunidade: number;
     idStatus: number;
     status: string;
     dataInteracao: Date;
     comentario: string;
}

export class Historico {

     constructor(values: object = {}) {
          Object.assign(this, values);
     }

     id: number;
     idOportunidade: number;
     idStatus: number;
     dataRegistro: string;
     dataProxima: string;
     idHistorico: number;
     comentario: string;
}

export class Status {

     constructor(values: object = {}) {
          Object.assign(this, values);
     }

     id: number;
     descricao: string;
}

export class Proposta {

     constructor(values: object = {}) {
          Object.assign(this, values);
     }

     id: number;
     idOportunidade: number;
     dataRegistro: string;
     dataValidade: string;
     moeda: string;
     quantidade: number;
     unitario: number;
     valorTotal: number;
     comentario: string;
     dias: number;
}
