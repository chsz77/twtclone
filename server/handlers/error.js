function errorHandler (error, request, response, next){
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Terjadi Kesalahan."
        }
    });
}

module.exports = errorHandler;
