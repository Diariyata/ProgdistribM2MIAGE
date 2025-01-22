FROM node:18.18
RUN mkdir app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# script d'initialisation
COPY init-env.sh ./init-env.sh
RUN chmod +x ./init-env.sh
RUN ./init-env.sh

RUN npx prisma init || echo "Prisma already initialized"
RUN npx prisma generate || echo "Prisma client already generated"

RUN npm install -g ts-node

EXPOSE 3000

CMD ["npm", "run", "dev"]