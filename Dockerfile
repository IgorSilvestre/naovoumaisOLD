FROM node
MAINTAINER igormorais.silvestre@icloud.com

EXPOSE 3000
EXPOSE 27017

RUN git clone https://github.com/IgorSilvestre/naovoumaisAPI.git

WORKDIR /naovoumaisAPI

RUN npm i
