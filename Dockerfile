FROM node:18-alpine AS builder
WORKDIR /app

# installer deps et builder l'app Angular
COPY package*.json ./
RUN npm ci --silent
COPY . .
# utilise le script build de package.json avec la bonne syntaxe ng build
RUN npm run build -- --output-path=dist

FROM httpd:2.4-alpine
# copier les fichiers construits dans htdocs
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
# proxy + rewrite config
COPY proxy.conf /usr/local/apache2/conf/extra/proxy.conf
RUN echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80
CMD ["httpd-foreground"]