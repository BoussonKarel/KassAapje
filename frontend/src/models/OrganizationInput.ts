export interface OrganizationInput {
    name: string,
    street: string,
    street_number: number,
    box?: string | null | undefined,
    zip: number,
    city: string,
    country: string,
    website: string,
    logo: string,
    color: string,
    email: string

}