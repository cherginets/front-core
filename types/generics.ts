// Required<Pick<LkChannel, 'id'>> & Partial<Omit<LkChannel, 'id'>>
export type RequiredOnly<T, Keys extends keyof T> = Required<Pick<T, Keys>> & Partial<Omit<T, Keys>>;
