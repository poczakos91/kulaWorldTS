/**
 * Created by poczakos on 2015.12.08..
 */

/// <reference path="three.d.ts"/>

declare module THREE {
    export class MTLLoader {
        constructor(baseUTL: string, options: any, crossOrigin: any);

        load(url:string);
        parse(text: any);
    }
    export module MTLLoader {
        export class MaterialCreator {
            constructor(baseUrl: string, options: any);

            setMaterials(materialsInfo: any);
            convert(materialsInfo: any):any;
            preload();
            getIndex(materialName:any):any;
            getAsArray():any;
            create(materialName:any):any;
            loadTexture(url:string, mapping:any, onLoad:any, onError:any):any;
        }
    }
}