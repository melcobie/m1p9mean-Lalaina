export interface EKalyStore{
    user : {
        username : string,
        email : string,
        type: {
            identifier: string,
            name: string,
        }
    }|null,
    accessToken : string,
}