
export const castAsOk = <T extends { ok: true } | { ok: false }>(response: T) => response as unknown as { ok: true } & T;
export const castAsError = <T extends { ok: true } | { ok: false }>(response: T) => response as unknown as { ok: false } & T;

