const responseCodes = {
    success: {
        successWithoutContent: 204,
        successCreate: 201,
        successWithPageChange: 200
    },
    error: {
        client: {
            noResource: 404
        },
        server: {
            internalError: 500
        }
    } 
};

module.exports = {
    responseCodes: responseCodes
};