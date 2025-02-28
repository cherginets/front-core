export type RequiredOnly<T, Keys extends keyof T> = Required<Pick<T, Keys>> & Omit<T, Keys>;
