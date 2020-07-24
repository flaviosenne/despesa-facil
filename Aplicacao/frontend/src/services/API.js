
    // lista do total de receitas
    export const listRecep =(state) =>{
        var despesa = 0
        
        state.list.forEach(valorDespesa => {
            despesa += valorDespesa.value
        })
        
        var receita = 0
        state.total.forEach(valorReceita => {
            receita += valorReceita.value
        })

        const resultado = receita - despesa
        
        return resultado

    }

    // formatar data
    export const formatDate = (date) => {

        var data = new Date(date)

        return data.getDate() + '/' + Number(data.getMonth() + 1) + '/' + data.getFullYear()
    }
    

    // filtrar periodo
    export const filtrar =(state, inicio, fim) =>{
        
        
        const periodoFiltrado = []
        state.list.forEach(dados => {
            periodoFiltrado.push(dados.date.slice(0,10))
        })
        // // iniciando o contador com menos um para ele iniciar o incremento do 0
        // // facilitando a busca do indice futuramente
        var cont = -1
        var indices = []
        for(let periodo of periodoFiltrado){
            cont ++
            if((periodo >= inicio)  && (periodo <= fim)){
                indices.push(cont)
            }
        }
        return renderDate(indices) 

    }

    
    // estou chamndo esta função em dois arquivos
    // dependendo do parametro que passo
    // retorno a mesma resposta 
    var auxiliar = ''
    export const renderDate = (indices) =>{
        if(indices != undefined){
            auxiliar = indices 
            indices = undefined
            return auxiliar
        }else{
            return auxiliar
        }
        
    }

