/**
 * Created by poczakos on 2015.12.08..
 */

/// <reference path="three.d.ts"/>

declare module THREE {
    export class OBJLoader {
        constructor(manager:any);

        load(url:string, onLoad: any, onProgress:any, onError: any);
        parse(data:any):any;
    }
}