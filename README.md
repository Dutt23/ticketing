k create secret generic {{secret_namespace}} --from-literal={{key=value}}
kubectl get secrets/{{secret_namespace}} --template={{.data.key}} | base64 -D

docker -t {{image_name}} .
docker push {{ image_name }}