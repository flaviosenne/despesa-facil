import axios from 'axios'
// const baseUrl = 'http://104.248.130.44:3001/profile'
const baseUrl = 'http://localhost:3001'

export const  remove = async (e, id)=> {
    e.preventDefault()
    
    return await axios.delete(`${baseUrl}/flow/${id}`,
    {headers: {
        token:'bearer '+window.localStorage.getItem('token'),
        authorization: window.localStorage.getItem('id')}
    })
    // assim que deletar o item, o metodo UNSAFE_componentWillMount é chamado para atualizar a pagina
    
    // return status
    // assim que deletar o item, o metodo UNSAFE_componentWillMount é chamado para atualizar a pagina
}

export const ViewUpdateExpense = (id) => {

    return '/despesa-update/' + id
}

export const listValueData =(values) =>{
    var data = 0
    
    // values.forEach(valueData => {
    //     data += valueData.value
    // })
    return data

}

export const listDataPendent =(data) =>{
    var value = 0
    
    data.forEach(valueData => {
        if(valueData.status == 'pendente')
            value += valueData.value
    })
    return value
}
export const listDataFinalized =(data) =>{
    var value = 0
    
    data.forEach(valueData => {
        if(valueData.status == 'finalizado')
            value += valueData.value
    })
    return value

}

export const listTotal =(expense, recep) =>{
    
    var despesa = 0
    var receita = 0

    // expense.forEach(valorDespesa => {
    //     despesa += valorDespesa.value
    //     console.log(valorDespesa)
    // })

    // recep.forEach(valorReceita => {
    //     receita += valorReceita.value
    // })

    return receita - despesa

}

export const formatDateOfServer =(dateServer) =>{
    
    const date = dateServer.split('-')

    return date[2]+'/'+date[1]+'/'+date[0]

}
