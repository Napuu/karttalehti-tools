# karttalehti-tools

[JHS-154](http://www.jhs-suositukset.fi/c/document_library/get_file?folderId=43384&name=DLFE-1006.pdf)

build:
```
docker build -t karttalehti-tools .
docker run -p 3262:3262 -d karttalehti-tools
```

example usage:
```
# x and y in EPSG:3067 (or EPSG:3857 if parameter ...&projection=EPSG:3857 is given)
curl /?action=getbbox&lehti=S4311R                                    -> [416000,7242000,428000,7254000]
curl /?action=gettile&x=422000&y=7250000&resolution=25k               -> S4311
curl /?action=gettile&x=422000&y=7250000&resolution=25k&splitted=true -> S4311R
curl /?action=getbbox&lehti=S4133R&projection=EPSG:4326&buffer=-5     -> [25.19905579871436,65.29027267121867,25.449684444379162,65.40066667467192]
```
