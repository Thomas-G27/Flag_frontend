# http-server/Dockerfile
FROM httpd:2.4-alpine

# Copier le code source du front dans le dossier /usr/local/apache2/htdocs/
COPY src/ /usr/local/apache2/htdocs/

# Copier la conf de reverse proxy dans le dossier conf/extra
COPY proxy.conf /usr/local/apache2/conf/extra/proxy.conf

# S'assurer que httpd.conf inclut notre conf. Si l'image l'inclut déjà, cette ligne est sans effet.
RUN echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80