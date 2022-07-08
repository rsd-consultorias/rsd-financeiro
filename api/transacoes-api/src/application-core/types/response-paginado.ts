export class ResponsePaginado<T> {
    public pagina!: number;
    public tamanho!: number;
    public total!: number;
    public data: Array<T> = [];
}