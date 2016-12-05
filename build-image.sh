#!/bin/sh

function exit_with_code() {
	# remove working directory 
	rm -r $2 

	exit $1 
}

function usage() { 
	echo "./build_image.sh user-function dockerfileRoot"
}

REGISTRY="0.0.0.0:5000"
CODE_SERVER="http://0.0.0.0:8080"

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
work_dir=$2$1.$current_time

# create working directory 
mkdir $work_dir 
 
if [[ $# -ne 2 ]]; 
then
	usage; 
	exit_with_code -1 $work_dir ## invalid arguments  
fi

# get code 
wget -O $work_dir/index.js $CODE_SERVER/$1/index.js 

# build image
docker build --build-arg code=$1.$current_time -t ${REGISTRY}/$1 $2 

# check build success 
if [[ $? -ne 0 ]];
then 
	exit_with_code -2 $work_dir  ## build image failed 
fi

# image push 
docker push ${REGISTRY}/$1 

# check push success 
if [[ $? -ne 0 ]]; 
then
	exit_with_code -3 $work_dir  ## image push failed 
fi


exit_with_code 0 $work_dir 

