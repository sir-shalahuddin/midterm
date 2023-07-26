# Database Structure
In this project, I am using MongoDB (NoSQL). So, this structure is just a suggestion that is suitable for this code.

### videos
|Field       |Type    |Option         |
|------------|--------|---------------|
|_id         |ObjectId|               |
|urlThumbnail|String  |               |

### users
|Field            |Type    |Option         |
|-----------------|--------|---------------|
|_id              |ObjectId|-              |
|email            |String  |unique,required|
|password         |String  |required       |
|username         |String  |required       |
|urlProfilePicture|String  |-              |

### products
|Field       |Type    |Option  |Ref   |
|------------|--------|--------|------|
|_id         |ObjectId|    -   |-     |
|url         |String  |required| -    |
|title       |String  |required|  -   |
|price       |Number  |required|   -  |
|videoId     |ObjectId|required|videos|

### comments
|Field       |Type    |Option  |Ref   |
|------------|--------|--------|------|
|_id         |ObjectId|    -   |-     |
|username    |String  |required| -    |
|comment     |String  |required|  -   |
|createAt    |Number  |required|   -  |
|videoId     |ObjectId|required|videos|

# API Structure

# Endpoint 
#Users
* User object
```
{
  id: integer
  username: string
  email: string
  password: string
}
```
**GET /users**
----
  Returns all users in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  users: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```

**GET /users/:id**
----
  Returns the specified user.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "User doesn't exist" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "You are unauthorized to make this request." }`

**GET /users/:id/orders**
----
  Returns all Orders associated with the specified user.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  orders: [
           {<order_object>},
           {<order_object>},
           {<order_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "User doesn't exist" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "You are unauthorized to make this request." }`

**POST /users**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    username: string,
    email: string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <user_object> }` 

**PATCH /users/:id**
----
  Updates fields on the specified user and returns the updated object.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
```
  {
  	username: string,
    email: string
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "User doesn't exist" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "You are unauthorized to make this request." }`

**DELETE /users/:id**
----
  Deletes the specified user.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
  * **Code:** 204 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "User doesn't exist" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "You are unauthorized to make this request." }`