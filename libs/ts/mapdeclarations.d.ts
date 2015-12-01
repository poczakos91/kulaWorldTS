/// <reference path="../../src/TS/model/cube.ts"/>
/// <reference path="../../src/TS/model/cube.ts"/>
/**
 * This file specifies the types those needed to describe the json map structure in typescript
 */

interface SimplePosition {
    x: number;
    y: number;
    z: number;
}

interface WinTextOrientation {
    position: SimplePosition;
    rotation: SimplePosition;
    size: number;
}

interface Neighbour {
    top: Cube;
    bottom: Cube;
    left: Cube;
    right: Cube;
    front: Cube;
    rear: Cube;
}

interface BallDescription {
    startingCube: number;
    startingFace: string;
    startingDirection: string;
    color: string;
    texture: {colorMapURL: string};
}

interface CubeDescription {
    id: number;
    type: string;
    specials: any[];
    color: string;
    position: SimplePosition;
    neighbours: Neighbour;
}

interface TargetCube {
    id: number;
    face: string;
}

interface mapDescription {
    name: string;
    version: string;
    backgroundObjects: any[];
    cubeSize: number;
    target: TargetCube;
    messageOrientation: WinTextOrientation;
    ball: BallDescription;
    elements: CubeDescription[][][];
}