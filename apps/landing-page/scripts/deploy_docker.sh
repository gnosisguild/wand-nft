#!/bin/bash

set -euo pipefail

export DOCKER_BUILDKIT=1


if [ "$1" = "develop" -o "$1" = "master" ]; then
    # If image does not exist, don't use cache
    docker pull $REGISTRY_URI/$DOCKERHUB_PROJECT:$1 && \
    docker build -t $DOCKERHUB_PROJECT -f Dockerfile . --cache-from $REGISTRY_URI/$DOCKERHUB_PROJECT:$1 --build-arg BUILDKIT_INLINE_CACHE=1 || \
    docker build -t $DOCKERHUB_PROJECT -f Dockerfile . --build-arg BUILDKIT_INLINE_CACHE=1
else
    # Building tag version from staging image (vX.X.X)
    docker pull $REGISTRY_URI/$DOCKERHUB_PROJECT:staging && \
    docker build -t $DOCKERHUB_PROJECT -f Dockerfile . --cache-from $REGISTRY_URI/$DOCKERHUB_PROJECT:staging --build-arg BUILDKIT_INLINE_CACHE=1 || \
    docker build -t $DOCKERHUB_PROJECT -f Dockerfile . --build-arg BUILDKIT_INLINE_CACHE=1
    docker tag $DOCKERHUB_PROJECT $REGISTRY_URI/$DOCKERHUB_PROJECT:latest
    docker push $REGISTRY_URI/$DOCKERHUB_PROJECT:latest
fi
docker tag $DOCKERHUB_PROJECT $REGISTRY_URI/$DOCKERHUB_PROJECT:$1
docker push $REGISTRY_URI/$DOCKERHUB_PROJECT:$1