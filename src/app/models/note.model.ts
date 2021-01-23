export class Note {
    
    constructor(
        public id: string,
        public veterinary: string,
        public pet: string,
        public owner: string,
        public notes: string,
        public treatment: string,
        public nextappointment: string,
        public price: number,
        public PaidOut: boolean,
        public day?: string,
    ){}

}