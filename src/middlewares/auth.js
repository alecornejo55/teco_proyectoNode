const checkAdmin = (req, res, next) => {
    const path = req.originalUrl;
    const metodo = req.method;
    if (ADMIN !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }
    next();
}

module.exports = {
    checkAdmin
}