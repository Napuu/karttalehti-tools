# karttalehti-tools

[JHS-154](http://www.jhs-suositukset.fi/c/document_library/get_file?folderId=43384&name=DLFE-1006.pdf)

build:
```
docker build -t karttalehti-tools .
docker run -p 3262:3262 -d karttalehti-tools
```

example usage:
```
# x and y in EPSG:3067
curl /?action=getbbox&lehti=S4311R                      -> [416000,7242000,428000,7254000]
curl /?action=gettile&x=422000&y=7250000&splitted=true  -> S4311R
curl /?action=gettile&x=422000&y=7250000                -> S4311
curl /?action=getall25ktiles                            -> K3234L K3232R K3244L...
```
