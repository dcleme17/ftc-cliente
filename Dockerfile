FROM node:20
WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json .
COPY src ./src
RUN npm install -g pnpm
RUN pnpm install
ENV PORT=31300
ENV DATABASE_URL=mongodb://root:mongo2023@localhost:27017
ENV MERCADOPAGO_URL=https://api.mercadopago.com/123
ENV MERCADOPAGO_USERID=8496
ENV MERCADOPAGO_TOKEN=TEST-2
ENV MERCADOPAGO_POS=SU
ENV MERCADOPAGO_WEBHOOK_URL=http:/br
ENV SERVICE_ACCOUNT={}

EXPOSE 31300
CMD [ "pnpm", "start"]