
const { queryCategoryInFlowToChart } = require('../services/queries')
const { frequency, getDateNow } = require('../services/helpers')
module.exports = {
    async getDataToChart(req, res) {

        console.log((await getDateNow()).dateStart)
        const { authorization, token, datestart, dateend } = req.headers
        
        if (!authorization || !token) {
            return res.status(403).json({ msg: 'unathorization' })
        }
    
        if (datestart !== 'undefined' && dateend !== 'undefined') {
            const expense = await queryCategoryInFlowToChart(authorization, datestart, dateend)
            
            const data = await frequency(expense)
            
            return res.status(200).json(data)
            
        }
        const expense = await queryCategoryInFlowToChart(authorization,  (await getDateNow()).dateStart, (await getDateNow()).dateEnd)
        const data = await frequency(expense)
        return res.status(200).json(data)


    }
}