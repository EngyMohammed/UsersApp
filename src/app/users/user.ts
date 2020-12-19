export interface Iuser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
export interface IresponseModel {
    data: Iuser[];
    page: number;
    per_page: number;
    total_pages: number;
    total: number;
}
