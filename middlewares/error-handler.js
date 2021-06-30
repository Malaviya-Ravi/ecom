function handleErrors(error, request, response, next)
{
    try
    {
        if(response.statusCode === 200)
        {
         response.status(500);
        }
        response.json({error : error.message, Error_Handled_By : 'Error Handler'});
    }
    catch(error)
    {
        next();
    }
}

module.exports = handleErrors;