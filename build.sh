#para poder ejecutar este codigo, en la consola debemos pasarnos git bash
#que se encuentra POWERSHELL y se pasa a linux
#ejecutando "chmod a+x build.sh" 
#para que quede como un ejecutable 

#!/usr/bin/env bash
# exit on error

set -o errexit

#instala todos los pip necesarios para el entorno virtual
# pip install -r requierements.txt

#genera la carpeta de archivos estaticos 
python manage.py collectstatic --no-input

#se ejecuta migrate
python manage.py migrate