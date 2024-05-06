//const fetch = require('node-fetch');

/* 
Error [ERR_REQUIRE_ESM]: require() of ES Module 
C:\Users\Dell\Documents\MERN\proyectos\ProyGrupal\server\node_modules\node-fetch\src\index.js 
from C:\Users\Dell\Documents\MERN\proyectos\ProyGrupal\server\controllers\Trefle.controller.js not supported.
Instead change the require of index.js in 
C:\Users\Dell\Documents\MERN\proyectos\ProyGrupal\server\controllers\Trefle.controller.js 
to a dynamic import() which is available in all CommonJS modules.
*/

// ACCEDER A LA API DE TREFLE, DADA UNA ESPECIE
exports.getPlantInfo = async (req, res) => {
    const query = req.params.query;
    console.log("controlador de trefle", query);
    console.log(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
    try {
        console.log(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
        const response = await fetch(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error('Error al obtener la información', error);
        return null;
    }
}
