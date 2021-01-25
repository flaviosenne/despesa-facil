const connection = require('../database/connection')

module.exports = {

    orderBy(value) {
        var aux
        for (let i = 0; i < value.length; i++) {
            aux = (value[i])
            j = i - 1;
            while ((j >= 0) && (aux.date.split('/')[1] < value[j].date.split('/')[1])) {
                value[j + 1] = (value[j]);
                j--;
            }
            value[j + 1] = aux;
        }
        return value
    },
    async existEmailDatabase(email) {

        const result = await connection('users')
            .where('email', email)
            .select('id', 'email', 'name')
            .first()

        return result
    },

    async existUserDatabase(id) {

        return await connection('users')
            .where('id', id)
            .select('id')
            .first()

    },

    async codeIsValid(code) {

        const data = await connection('codeRecoveryPassword')
            .select()
            .where({ code: code })
            .andWhere({ used: false })
            .first()

        return data

    },
    async frequency(datas){
        
        var values = []
        var categories = []
        
        datas.map(data => {
            categories.push(data.category)
            values.push(data.values)
        })
        console.log('incio', categories)

        var quantidade = []

        var cont = 0
        // Eletronico, Eletronico, Roupa, Roupa, Eletronico, Padaria
        // 200, 100, 30, 45, 50, 12
        for (let i = 0; i < categories.length; i++) {
            cont = 1
            for (let j = i+1; j < (categories.length); j++) {
                if (categories[i] == categories[j] || categories[i] == categories[j-1]) {
                    // while (categories[i] == categories[j+1]) {
                        cont++
                        categories.splice(j, 1);
                        console.log('Removi ', categories[i], ' na posição ', j)
                        
                    // }

                }
    
            }
            quantidade.push(cont)

        }
        console.log(categories)
        console.log(quantidade)
    }


   

}