# curl -X GET http://localhost:3000/pickImg > wow.jpg

# curl -X POST -d 'filename=hello.jpg' http://localhost:3000/collectImg
curl -X POST -w "%{http_code}\n" -d 'filename=ww.jpg' http://localhost:3000/collectImg