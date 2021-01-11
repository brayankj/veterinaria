import { environment } from '../../environments/environment';

const { baseUrl } = environment;

export class User {

    constructor(
        public names: string,
        public email: string,
        public password?: string,
        public lastnames?: string,
        public active?: boolean,
        public years?: number,
        public image?: string,
        public google?: boolean,
        public role?: string,
        public id?: string,
    ) { }

    get viewImageUrl() {
        if( this.image && this.image.includes('https') ){
            return this.image;
        }
        if( this.image ){
            return `${baseUrl}/upload/users/${this.image}`;
        }else{ return `${baseUrl}/upload/users/noImg`; }
        
    }
    
}