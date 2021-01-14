import { environment } from '../../environments/environment';
const { baseUrl } = environment;

export class Pets {
    
    constructor(
        public name: string,
        public owner: string,
        public typePet: string,
        public description?: string,
        public years?: number,
        public image?: string,
        public id?: string,
    ){}

}