#!/usr/bin/env bash

# curl -X GET http://localhost:3000/pickImg > wow.jpg

# curl -X POST -d 'filename=hello.jpg' http://localhost:3000/collectImg
# curl -X POST -w "%{http_code}\n" -d 'filename=ww.jpg' http://localhost:3000/collectImg

# curl -X POST http://localhost:3000/uploadImg -F 'imgFile=@./static/img/1.jpg'
curl -X POST http://localhost:3000/uploadImgInfo -F 'imgFile=@./static/img-backup/13.jpg' -F 'other=nothing'