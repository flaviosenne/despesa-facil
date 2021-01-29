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
    async frequency(datas) {

        return new Promise((resolve, reject) => {
            const values = []
            const categories = []
            var cont = 0;
            const frequency = []
            const colors = []
            datas.map(data => {
                categories.push(data.category)
                values.push(data.value)
            })
            
            for (let i = 0; i < categories.length; i++) {
                cont = values[i]
                for (let j = i; j < categories.length; j++) {
                    if (categories[i] == categories[j]) {
                        while (categories[i] == categories[j + 1]) {
                            cont+= values[i]
                            categories.splice(j, 1);
                            // console.log('Numero ', categories[j], ' na posição ', i)
                        }
                    }
    
                }
                var red = 0 + Math.floor((255 - 0) * Math.random());
                var green = 0 + Math.floor((255 - 0) * Math.random());
                var blue = 0 + Math.floor((255 - 0) * Math.random());
                frequency[i] = cont
                colors.push(`rgb(${red}, ${green}, ${blue})`)
            }
            resolve({categories, frequency, colors})
        })
       
    }
}