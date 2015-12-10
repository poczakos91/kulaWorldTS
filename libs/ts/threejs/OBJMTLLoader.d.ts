/**
 * Created by poczakos on 2015.12.08..
 */

/// <reference path="three.d.ts"/>
/// <reference path="MTLLoader.d.ts"/>
/// <reference path="OBJLoader.d.ts"/>

declare module THREE {
    export class OBJMTLLoader extends THREE.EventDispatcher {
        constructor();
        load(url:string, mtlfileurl: string, onLoad: Function, onProgress: Function, onError: Function);
        parse(data:any, mtllibCallback: Function): THREE.Object3D;
    }
}