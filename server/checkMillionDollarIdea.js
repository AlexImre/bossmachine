const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        return res.status(400).send();
    }

    if (numWeeks === '' || weeklyRevenue === '') {
        return res.status(400).send();
    }
    
    const yield = Number(numWeeks) * Number(weeklyRevenue);

    if (yield < 1000000) {
        return res.status(400).send();
    } 
    
    next();
};

module.exports = checkMillionDollarIdea;
