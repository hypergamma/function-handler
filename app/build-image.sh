#!/bin/sh

function usage() {
	echo "./build_image.sh dockerfile_root env env_ver"
}

if [[ $# -ne 3 ]];
then
	usage;
	exit -1; 
fi

dockerfile_root=$1
env=$2
env_ver=$3

IMAGE_NAME="event-handler-"$env":"$env_ver



if [[ $PRODUCTION_GAMMA = "production" ]];
then
    REGISTRY="52.187.69.164:5000"
else
    REGISTRY="0.0.0.0:5000"
fi

## change base
sed "s/{{env}}/${env}/" $dockerfile_root/Dockerfile > $dockerfile_root/Dockerfile.1
sed "s/{{env_ver}}/${env_ver}/" $dockerfile_root/Dockerfile.1 > $dockerfile_root/Dockerfile.final
rm $dockerfile_root/Dockerfile.1

# build image
docker build -t ${REGISTRY}/$IMAGE_NAME $dockerfile_root -f Dockerfile.final

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

rm $dockerfile_root/Dockerfile.final

exit 0 
