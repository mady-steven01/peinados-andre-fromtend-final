export interface Response<T> {
    ok: boolean;
    data?: T;
    msg?: string;
    token?: string;
}
