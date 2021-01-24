## __Sistema de Fluxo de Caixa para WEB__

### Este documento tem por finalidade auxiliar no entendimento da API

- /user
##### o recurso "user" é responsável pela criação, ediição e atualização do usuário dentro do banco de dados.

### GET /user

Entrada: não é necessário, apenas uma requisição. Exmplo de requisição com axios.
```
axios.get(`/user`).then(res => {
  console.log(res)
})
```
Saída: 200
```
{
    "id":"id do usuário",
   "name":"nome do usuário",
    "email":"email do usuário",
    "password":"senha em hash"
}
```

### GET /user/:id
Entrada: nos parametro inserir o id do usuário. Exemplo de requisição com axios.
```
axios.get(`/user/${id}`).then(res => {
  console.log(res)
})
```
Saída: 200
```
{
  "status":200,
  "id":"id do usuário"
}
```
Saída: 404
```
{
  "msg":200,
}
```

### POST /user
Entrada de dados: requisição axios como exemplo.
```
const user = {...req.body}

axios.post('/user', user).then(res => {
  console.log(res)
})
```
Saida: 201
```
{
  "name":"nome do usuário",
  "email":"email do usuário",
  "password":"senha em hash"
}
```


### PUT user/:id
Entrada: no parametro inserir o id do usuário. Exemplo de requisição com axios.
```
const user = {...req.body}
axios.put(`/user/${id}`, user).then(res => {
  console.log(res)
})
```
Saida: 200
```
{
  "msg":"updated success"
}
```
Saida: 404
```
{
  "msg":"not found"
}
```
