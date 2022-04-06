export interface EKalyStore{
    user : {
        _id : string,
        username : string,
        email : string,
        type: {
            identifier: string,
            name: string,
        }
    }|null,
    accessToken : string,
}