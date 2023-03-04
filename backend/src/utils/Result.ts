
export type OkResult<T> = {
    ok: true,
    value: T,
}

export type ErrorResult<E> = {
    ok: false,
    error: E,
}

export type Result<T, E> = OkResult<T> | ErrorResult<E>;

export function ok<T>(value: T): OkResult<T> {
    return { ok: true, value }
}

export function error<E>(errorValue: E): ErrorResult<E> {
    return { ok: false, error: errorValue }
}

export function asOk<T, E>(result: Result<T, E>): OkResult<T> {
    return result as OkResult<T>;
}

export function asError<T, E>(result: Result<T, E>): ErrorResult<E> {
    return result as ErrorResult<E>;
}
