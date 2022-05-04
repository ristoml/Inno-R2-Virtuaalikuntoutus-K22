# Rest API

## Result

#### This API consists of results.

##### example of result
```
"client": "Test",                      
"date": "2022-04-25T12:00:00.000Z",
"id": "0",
"data": [{
      "leg": "right",
      "counter": 1,
      "angle": 1,
      "data": [{
              "x": 1,
              "y": 1,
              "z": 1,
              "visibility": 1
              }]
          }]
```

##### explanation of attributes

` id: Identifier(automatic) `, ` client: Client name `, ` date: Save date `, ` data: list of next row`

` leg: left/right leg`, ` counter: Counter of current squat `, ` angle: Calculated kneeangle `, ` data: list of next row `

` x: coordinate `, ` y: coordinate `, ` z: coordinate ` and `visibility: likelihood of the landmark being visible`

# API-calls

## Get everything from database

### Request

**GET** ` api/results `  

**Example** ` http://localhost:3001/api/results `

### Response

`returns all results`

## Get result with id

**GET** ` api/searchResult/:id `  

**Example** ` http://localhost:3001/api/searchResult/123 `

### Response

`returns result with used id`

## Get latest record

**GET** ` api/getLatest `  

**Example** ` http://localhost:3001/api/getLatest `

### Response

`` returns latest recorded result ``

## Update client name with id

### Request

**PUT** ` api/update/:id `  

**Example** ` http://localhost:3001/api/update/1 ` & new name

### Response

`` On success return status: 200 ``

## Delete with id

### Request

**DELETE** ` api/removeResult/:id `  

### Response

**Example** ` http://localhost:3001/api/removeResult/1 `

`` On success return status: 204 ``

## Add new result

### Request

**POST** ` api/addResult `   

### Response

**Example** ` http://localhost:3001/api/addResult ` & result object

`` On success return status: 200 ``
