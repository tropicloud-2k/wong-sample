FROM alpine:edge
MAINTAINER admin@tropicloud.net

RUN adduser -h /app -s /bin/sh -D chaordic chaordic && \
    echo "chaordic ALL = NOPASSWD : ALL" >> /etc/sudoers && \
    apk --update add nodejs nginx sudo s6 && \
    npm install -g bower

ADD . /app
WORKDIR /app
USER chaordic
RUN npm install && bower install && \
    sudo chown -R chaordic:chaordic .

EXPOSE 8080
CMD s6-svscan service
