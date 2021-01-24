<<<<<<< HEAD
## Sistema de Fluxo de Caixa para WEB
=======
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


=======================================================

- /flow
##### o recurso "flow" é responsável pelo cadastro, listagem, atualização e exclusão dos lançamentos(despesas e receitas) do sistema.

### GET /flow

Entrada: é necessário mandar o token, autorização(id de usuário), data inicial, data final e categoria.  Porém só é obrigatório o token.
```
axios.get('/flow', {
  headers:
  {token: 'bearer ' + window.localStorage.getItem('token'),
   authorization,
   dateStart,
   dateEnd, 
   category,
   }).then(res => {
  console.log(res)
})
```
Saída: 200
```
[
{
    "id":"id do lançamento",
    "date":"data da operação",
    "description":"descrição do lançamento",
    "category":"código da categoria",
    "status":"status do lançamento",
    "valor":"valor do lançamento",
}
]
```


### GET /flow/:id

Entrada: é necessário mandar o token.
```
axios.get('/flow', {
  headers:
  {token: 'bearer ' + window.localStorage.getItem('token'),
   }).then(res => {
  console.log(res)
})
```
Saída: 200
```
{
    "id":"id do lançamento",
    "date":"data da operação",
    "description":"descrição do lançamento",
    "category":"código da categoria",
    "status":"status do lançamento",
    "valor":"valor do lançamento",
}
```
Saída: 404
```
{
    "msg":"not found"
}
```


### PUT /flow/:id

Entrada: é necessário mandar a autorização, token id, valor, descrição, status e categoria como o código abaixo.
```
axios.put(`/flow/${id}`, {
  authorization: window.localStorage.getItem('id'),
  token: 'bearer '+window.localStorage.getItem('token'),
  id, date,
  value
  description, status, 
  category
  }).then(res => {
  console.log(res)
})
```
Saída: 200
```
{
    "msg":"updated success"
}
```
Saída: 404
```
{
    "msg":"not found"
}
```



### POST /flow

Entrada: é necessário mandar a autorização, token, valor, descrição, status e categoria como o código abaixo.
```
axios.post(`/flow`, {
  authorization: window.localStorage.getItem('id'),
  token: 'bearer '+window.localStorage.getItem('token'),
  date,
  type: 'expense'
  value,
  quantity,
  description, status, 
  category
  }).then(res => {
  console.log(res)
})
```
Saída: 201
```
{
    "msg":"created"
}
```


### DELETE /flow/:id

Entrada: é necessário mandar a autorização, token id como o código abaixo.
```
axios.delete(`/flow/${id}`, {
  authorization: window.localStorage.getItem('id'),
  token: 'bearer '+window.localStorage.getItem('token'),
  }).then(res => {
  console.log(res)
})
```
Saída: 204
```
{
    "msg":"flow deleted"
}
```
Saída: 404
```
{
    "msg":"not found"
}
```
>>>>>>> f7e8611712bbfe12587d045f8ab24d08eb3b2479

