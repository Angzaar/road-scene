import { engine, Entity, executeTask, GltfContainer, MeshRenderer, Transform} from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math"
import './polyfill'

let tileModlelA = "assets/floorblock04.glb"
let tileModlelB = "assets/floorblock04.glb"
let underModel = "assets/fb7a14bf-6259-4d34-b0ea-18a3963c12eb.glb"

let parcels:any[] = [
[0,0,0,0,90,90,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
[0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
]

let roads:any[] = [
  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
  // [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
  // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  // [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  // [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
  // [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  // [1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  // [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  ]

let xParcel = -2
let yParcel = 0

export function main() {
  createRoads()
}

function createRoads(){
  parcels.forEach((col:number[])=>{
    col.forEach((parcel:number)=>{
      if(parcel > 0){
          let ent = engine.addEntity()
          Transform.create(ent, {
              position: Vector3.create(xParcel * 16 + 8, 0, yParcel * 16 + 8), 
              rotation:Quaternion.fromEulerDegrees(0,parcel === 1 ? 0 : 90,0),
              scale:Vector3.create(1,1,1)
            })
            createRoadTile(ent)
      }
      yParcel++
    })
    xParcel++
    yParcel = 0
  })
}

function createRoadTile(parent:Entity){
  let under = engine.addEntity()
  GltfContainer.create(under, {src:underModel})
  Transform.create(under, {parent:parent, scale:Vector3.create(4,1,4), position:Vector3.create(8,0,8)})
  createLine(parent, -6,-6, tileModlelA)
  createLine(parent,-2,-6, tileModlelB)
  createLine(parent, 2,-6, tileModlelB)
  createLine(parent, 6,-6, tileModlelA)
}

function createLine(parent:Entity, xOffset:number, yOffset:number, model:string, rotation?:boolean){
  for(let i = 0; i < 4; i++){
    let tile = engine.addEntity()
    GltfContainer.create(tile, {src:model})
    Transform.create(tile, {parent:parent, position: Vector3.create(xOffset,0,yOffset), scale:Vector3.create(1.99,1,1.99), rotation: Quaternion.fromEulerDegrees(0,rotation ? 90 : 0,0)})
    yOffset+=4
  }
}