
export function generateToken(): string {
    const CHARS = 'plmonkij9buvhyc2gtxfr5zde3sw1aqZX4CASDQ0WEVBN7FGHRTYM6JKLU8IOP';
    const randchar = (chars: string = CHARS): string =>
        chars.charAt(Math.floor(Math.random() * chars.length));
    const randstr = (length: number, chars: string = CHARS): string =>
        length > 0 ? randchar(chars) + randstr(length - 1, chars) : '';
    return randstr(64);
}

