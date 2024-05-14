const fetch = require('node-fetch');

// ACCEDER A LA API DE TREFLE, DADA UNA ESPECIE
exports.getPlantInfo = async (req, res) => {
    const query = req.params.query;
    console.log("controlador de trefle", query);
    try { 
        //const response = await fetch(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
        const response = await fetch(`https://trefle.io/api/v1/plants?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&filter[scientific_name]=${query}`);
        const json = await response.json();
        res.json(json.data); 
    } catch (error) {
        console.error('Error al obtener la información', error);
        return null;
    }
}
