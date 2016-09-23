declare module zlib {
    export class Inflate {
        constructor(data:any);
        decompress(): any;
     }
     
    export class Deflate { 
        constructor(data:any);
        compress():any;
    }
    
}