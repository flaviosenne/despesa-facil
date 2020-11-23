import axios from 'axios'
import baseUrl from './URL'

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

export const listExpenseData =(cash) =>{
    var expense = 0
    
    cash.forEach(data => {
        if(data.type == 'expense') expense += data.value
    })
    return expense

}

export const listRecepData =(cash) =>{
    var recep = 0
    
    if(cash != undefined){

        cash.forEach(data => {
            if(data.type == 'recep') recep += data.value
        })
    }
    return recep

}

export const listDataPendent =(data) =>{
    var value = 0
            if(data != undefined){

        data.forEach(valueData => {
            if(valueData.status == 'pendente')
            value += valueData.value
        })
    }
    return value
}

export const listDataFinalized =(data) =>{
    var value = 0
    if(data != undefined){
        data.forEach(valueData => {
            if(valueData.status == 'finalizado')
            value += valueData.value
        })
    }
    return value

}

export const formatDateOfServer =(dateServer) =>{
    
    const date = dateServer.split('-')

    return date[2]+'/'+date[1]+'/'+date[0]

}
