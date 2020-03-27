# Main Image
FROM node:slim

ARG GID
ARG UID

RUN GROUP="$(cat /etc/group | grep $GID | cut -d':' -f1)" && if groupdel $GROUP; then echo delete it! $GROUP;fi

RUN groupmod -g $GID node && usermod -u $UID -g $GID node

RUN apt-get update \
    && apt-get install -y openssh-server git
    
ARG SECURITY_MODE=basic_auth
ARG USER=kevin
ARG PASSWORD=root
ARG PREFIX=/users

ENV MODE=embebed
ENV SECURITY_MODE $SECURITY_MODE
ENV USER=$USER
ENV PASSWORD=$PASSWORD
ENV PREFIX=$PREFIX

ENV TZ="America/Lima"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date

ONBUILD ADD app /home/node/app

WORKDIR /home/node/app

EXPOSE 80
COPY ./entrypoint.sh /tmp
RUN chmod +x /tmp/entrypoint.sh
ENTRYPOINT /tmp/entrypoint.sh
