let counter = 0;
const next = () => `00000000-0000-0000-0000-${String(++counter).padStart(12, '0')}`;

export const v1 = next;
export const v3 = next;
export const v4 = next;
export const v5 = next;
export const v6 = next;
export const v7 = next;
export const NIL = '00000000-0000-0000-0000-000000000000';
export const MAX = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
export const validate = () => true;
export const version = () => 4;
export const parse = (s: string) => s;
export const stringify = (s: unknown) => String(s);
