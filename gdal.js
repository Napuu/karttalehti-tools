const { exec } = require("child_process");

const applyCoords = (file, coords) => {
    try {
        exec(`
            gdal_translate ${file} out${file} -a_ullr ${coords[0]} ${coords[3]} ${coords[2]} ${coords[1]} -a_srs EPSG:3067
        `, (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else {
                console.log(stdout);
                exec(`mv out${file} ${file}`, (err, stdout, stderr) => {
                    if (err) console.error(stderr);
                    else {
                        console.log(stdout);
                    }
                });
            }
        });
    } catch(e) {
        console.log(e);
    }
}

exports.applyCoords = applyCoords;
