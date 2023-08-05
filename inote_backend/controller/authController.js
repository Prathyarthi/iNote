const something = (req,res) => {
    res.status(200).json({
        a: 'thios',
        number : 34
    })
}

module.exports = {
    something
}