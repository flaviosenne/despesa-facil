import axios from 'axios'
const baseUrl = 'http://104.248.130.44:3001/profile'
// const baseUrl = 'http://localhost:3001/profile'

export const  remove = async (e, id)=> {
    e.preventDefault()
    
    return await axios.delete(`${baseUrl}/${id}`)
    // assim que deletar o item, o metodo UNSAFE_componentWillMount é chamado para atualizar a pagina
    
    // return status
    // assim que deletar o item, o metodo UNSAFE_componentWillMount é chamado para atualizar a pagina
}
export const  formatDateToReact = (date) => {
        var date1 = (date.split('/'))

        var year = date1[2]
        var month = date1[1]
        var day = date1[0]
        
        return  year + '-'+ month + '-' + day 
    }

export const formatDate = (date) => {

    // data do filtro
    const date1 = date.split('-')
    // data sem filtro
    const date2 = date.split('-')
    
    // date format yyyy-mm-dd
    const day1 = date1[2]
    const month1 = date1[1] 
    const year1 = date1[0]
    
    
    // console.log(date2)
    // date format dd-mm-yyyy
    const day2 = date2[0]  
    const month2 = date2[1]
    const year2 = date2[2]
   
    return day2.length == 2 ?(day2 + '-'+month2+'-'+year2):
    // quando estou atualizando a despesa
    // o formato vem diferente
    (day1 + '-'+month1+'-'+year1)
}

export const ViewUpdateExpense = (id) => {

    return '/despesa-update/' + id
}

export const getDateNow = () =>{
    
    const dateNow = new Date()
    const day = dateNow.getDate() < 10
        ? '0' + dateNow.getDate() :
        dateNow.getDate()

    const month = (dateNow.getMonth()+1) < 10
        ? '0' + (dateNow.getMonth()+1) :
        dateNow.getMonth()+1
    
    const month2 = (dateNow.getMonth()+2) < 10
        ? '0' + (dateNow.getMonth()+2) :
        dateNow.getMonth()+2

    const year = dateNow.getFullYear()
    
    const dateStart = day + '-'+month+ '-'+year
    
    const dateEnd = day + '-'+month2+ '-'+ year
     
    return {dateStart, dateEnd}
            
}

export const filtrar =(state, inicio, fim) =>{

    const periodoFiltrado = []
    state.forEach(dados => {
        periodoFiltrado.push(dados.date)
    })
    
    // // iniciando o contador com menos um para ele iniciar o incremento do 0
    // // facilitando a busca do indice futuramente
    var cont = -1
    var indices = []
    for(let periodo of periodoFiltrado){
        cont ++
        // console.log('9' > '10')
        var dateBase = periodo.split('/')
        var dateStart = formatDate(inicio).split('-')
        var dateEnd = formatDate(fim).split('-')
        
        // console.log('inicio',dateStart, '----------', 'base',dateBase)
        // console.log('fim',dateEnd)
        
    
        if((dateBase[1] > dateStart[1]) && (dateBase[1]) <= dateEnd[1]){
            // console.log('proximo mes')
            // no proximo mes
            if(
                (((dateBase[0] >= dateStart[0]) ||
                (dateBase[1] >= dateStart[1]))
                &&
                (dateBase[2] >= dateStart[2]))
                &&
                (dateBase[0] <= dateEnd[0]) &&
                (dateBase[1] <= dateEnd[1]) &&
                (dateBase[2] <= dateEnd[2])
                ){
                    // console.log(cont)                   
                    indices.push(cont)
                }
            }
            else if((dateBase[1] >= dateStart[1]) && (dateBase[1] <= dateEnd[1])){
                // a partir do mesmo mês
                // console.log('esse mes')
            if(
                (((dateBase[0] >= dateStart[0]) &&
                (dateBase[1] >= dateStart[1]))
                &&
                (dateBase[2] >= dateStart[2]))
                &&
                (dateBase[1] <= dateEnd[1]) &&
                (dateBase[2] <= dateEnd[2])
            ){

                indices.push(cont)
            }
        }
        
    }
    return indices

}
export const listExpense =(expense) =>{
    var despesa = 0
    
    expense.forEach(valorDespesa => {
        despesa += valorDespesa.value
    })
    return despesa

}
export const listRecep =(recep) =>{
    var receita = 0
    
    recep.forEach(valorReceita => {
        receita += valorReceita.value
    })
    return receita 
    
    

}
export const listTotal =(expense, recep) =>{
    
    var despesa = 0
    var receita = 0

    expense.forEach(valorDespesa => {
        despesa += valorDespesa.value
    })

    recep.forEach(valorReceita => {
        receita += valorReceita.value
    })

    return receita - despesa

}