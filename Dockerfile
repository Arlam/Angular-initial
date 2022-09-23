FROM nginx:1.21.3
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/app-template /usr/share/nginx/html

EXPOSE 80

#ENTRYPOINT ["nginx"]
