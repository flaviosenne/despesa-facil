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
    async existUserDatabase(user) {

        const result = await connection('users')
            .where('user', email)
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
            let frequency = []
            const colors = []
            datas.map(data => {
                categories.push(data.category)
                values.push(data.value)
            })

            var aux = 0
            for (let i = 0; i < categories.length; i++) {
                cont = values[i+ aux]
                for (let j = i; j < categories.length; j++) {
                    while (categories[i] === categories[j + 1]) {
                        cont = (parseFloat(cont) + parseFloat(values[j + aux+1])).toFixed(2)
                        categories.splice(j, 1);
                        aux++    
                    }
                }
                frequency[i] = cont
                var red = 0 + Math.floor((255 - 0) * Math.random());
                var green = 0 + Math.floor((255 - 0) * Math.random());
                var blue = 0 + Math.floor((255 - 0) * Math.random());
                colors.push(`rgb(${red}, ${green}, ${blue})`)
            }
            resolve({ categories, frequency, colors })
        })

    },
    async getDateNow() {
        const day = '01'

        const month =
            (new Date().getMonth() + 1) < 10 ?
                '0' + (new Date().getMonth() + 1) :
                (new Date().getMonth() + 1)

        const monthEnd =
            (new Date().getMonth() + 2) < 10 ?
                '0' + (new Date().getMonth() + 2) :
                (new Date().getMonth() + 2)

        const year = new Date().getFullYear()

        const dateStart = year + '-' + month + '-' + day
        const dateEnd = year + '-' + monthEnd + '-' + day

        return { dateStart, dateEnd }
    }
}
