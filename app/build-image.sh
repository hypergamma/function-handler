#!/bin/sh

REGISTRY="52.187.69.164:5000"
IMAGE_NAME="event-handler"

# build image
docker build -t ${REGISTRY}/$IMAGE_NAME $1

# check build success
if [[ $? -ne 0 ]];
then
	exit -1  ## build image failed
fi

# image push
docker push ${REGISTRY}/$IMAGE_NAME

# check push success
if [[ $? -ne 0 ]];
then
	exit -2
fi


exit 0 
