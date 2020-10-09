const connection = require('../database/connection')
module.exports = {
    orderBy(value){
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
    async existEmailDatabase(email){
        console.log(email)

        const result = await connection('users')
        .where('email', email)
        .select('email')
        
        return result
    },
    async existUserDatabase(id){

        const result = await connection('users')
        .where('id', id)
        .select('id').first()
        
        return result
    }
}