## Sistema de Fluxo de Caixa para WEB
=============================================

### Este documento tem por finalidade auxiliar no entendimento da API


#### Sumário:
USER:
- [Get user](https://github.com/flaviosenne/DespesaFacil#get-user)
- [Get user/:id](https://github.com/flaviosenne/DespesaFacil#get-userid)
- [PUT user/:id](https://github.com/flaviosenne/DespesaFacil#put-userid)
- [POST user](https://github.com/flaviosenne/DespesaFacil#post-user)


FLOW:
- [GET flow](https://github.com/flaviosenne/DespesaFacil#get-flow)
- [GET flow/:id](https://github.com/flaviosenne/DespesaFacil#get-flowid)
- [PUT flow/:id](https://github.com/flaviosenne/DespesaFacil#put-flowid)
- [POST flow](https://github.com/flaviosenne/DespesaFacil#post-flow)
- [DELETE flow](https://github.com/flaviosenne/DespesaFacil#delete-flowid)

EXPENSE or RECEP:
- [GET ](https://github.com/flaviosenne/DespesaFacil#get-flow-expense)


SEND EMAIL:
- [POST /send-email](https://github.com/flaviosenne/DespesaFacil#post-send-email)


UPDATE PASSWORD:
- [PUT /update-password](https://github.com/flaviosenne/DespesaFacil#put-update-password)


CATEGORY:
- [GET /category](https://github.com/flaviosenne/DespesaFacil#get-categoryid)
- [DELETE /category/:id](https://github.com/flaviosenne/DespesaFacil#delete-categoryid)


=============================================
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
    "email":"email do usuário"
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
  "email":"email do usuário"
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

=============================================

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
  authorization: 'id do usuário',
  token,
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

=============================================

- /flow-expense
- / flow-recep

##### o recurso "flow-expense" é responsável pela listagem das despesas dentro da base de dados. O recurso "flow-recep" é responsável pela listagem das receitas dentro da base de dados.

### GET /flow-expense
### GET /flow-recep

Entrada: é necessário, mandar a authorização e a order para que o sistema filtre as despesas.
o atributo order aceita os seguintes valores: 'finalized', 'pendent', 'date', 'category'.
por padrão ele seta o valor 'date'.
Segue o exemplo abaixo

```
const expense = '/flow-expense
const reecp = '/flow-recep

axios.get((o recurso que precisar: 'expense' ou 'recep'), {
  headers:
            {
                token,
                authorization: 'id do usuário',
                order:'pendent'
            }
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

=============================================

- /send-email

##### o recurso "send-email" é responsável pelo envio de email com o código de validação para usuários que ja tenham feito cadastro na base de dados.

### POST /send-email

Entrada: é necessário mandar no corpo da requisição o email já cadastrado anteriormente. Por esse motivo é necessário que o usuário tenha inserido um email válido. Abaixo tem um exemplo do código.

```
axios.post('/send-email', {
  email: 'email que será enviado o código'
  }).then(res => {
  console.log(res)
})
```

Saida: 200

```
{
  msg:'accepted'
}
```

Saida: 404

```
{
  msg:'not found'
}
```

Saida: 500

```
{
  msg:'error'
}
```
=============================================
- /update-password

##### o recurso "update-password" é responsável pela eatualização de senha do usuário. É necessário que o usuário ja tenha feito o cadastro na base de dados e ter solocitado o código com o envio de email conforme o recurso anterior ('send-email').

### PUT /update-password

Entrada: é necessário mandar no corpo da requisição o código enviado por email e a nova senha. Abaixo tem um exemplo do código.

```
axios.put('/update-password', {
  code: 'código que chegoy por email',
  password: 'nova senha'
  }).then(res => {
  console.log(res)
})
```

Saida: 403

```
{
  "msg":"code invalid"
}
```


Saida: 200

```
{
  "id":"id do usuário",
  "name":"nome do usuário",
  "email":"email do usuário",
  "password":"senha encryptada do usuário",
}
```
=============================================


- /category/:id

##### o recurso "/category" é responsável pela listagem e a exclusão da categoria.

### GET /category/:id

Entrada: é necessário mandar qual a o 'id_user'(id do usuário), pois cada usuáro tem seu conjunto de categorias especificas, além disso é necessário informar . Abaixo tem o exemplo de requisição.


```
axios.get(`/category/${id_user}`).then(res => {
  console.log(res)
})

```

Saida: 200

```
[
  {
    "id":"id da categoria",
    "id_user":"id do usuário",
    "category":"descrição da categoria",
  }
]

```

### DELETE /category/:id

Entrada: é necessário mandar qual a o 'id_user'(id do usuário), pois cada usuáro tem seu conjunto de categorias especificas, além disso é necessário informar . Abaixo tem o exemplo de requisição.


```
axios.get(`/category/${id_user}`).then(res => {
  console.log(res)
})

```

Saida: 204

```
  {
    "msg":"deleted",
  }

```

Saida: 404

```
  {
    "msg":"not found",
  }

```
