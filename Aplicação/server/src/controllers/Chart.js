
const { queryCategoryInFlowToChart } = require('../services/queries')
const { frequency} = require('../services/helpers')
module.exports = {
    async getDataToChart(req, res){

        const {authorization, token, datestart, dateend} = req.headers

        // console.log(authorization)
        // console.log(token)
        // console.log(datestart, dateend)
        if(!authorization || !token){
            return res.status(403).json({msg: 'unathorization'})
        }
        // intervalo de tempo
        if(datestart && dateend){
            const flow = await queryCategoryInFlowToChart(authorization, datestart, dateend)      
            
            const data = await frequency(flow)
            
            return res.status(200).json(data)

        }
        return res.status(404).json({msg:'not found'})


    }
}