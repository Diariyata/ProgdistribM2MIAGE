import request from "supertest";
import app from "../index";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


let userid: number;
let adsId: number;
let token: string;

beforeEach(async () => {
    await prisma.$connect();
});

afterEach(async () => {
    await prisma.$disconnect();
})

// La création et la récupération d’un utilisateur.

// describe("GET /utilisateurs", () => {
//     it("afficher tout les utilisateurs", async () => {
//       const res = await request(app).get("/utilisateurs");
//       expect(res.statusCode).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
//   });

describe("POST /auth/register", () => {
    it("creation d'un utilisateur", async () => {
        const uniqueEmail = `${Date.now()}@gmail.com`
        const res = await request(app)
            .post("/auth/register")
            .send({
                nom: "Marcus",
                email: uniqueEmail,
                password: "testert",
                telephone: "0123456789",
                id_role: 1
            })
        expect(res.statusCode).toBe(201);
        expect(res.body.signup.nom).toBe("Marcus");

        userid = res.body.signup.user_id;
        token = jwt.sign({ user_id: userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log('Userid :', userid);
        // console.log('Token généré :', token);
    })
})


describe("GET /utilisateur/:id", () => {
    it("recuperer un utilisateur", async () => {
        const res = await request(app)
            .get(`/utilisateur/${userid}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.nom).toBe("Marcus")
    })
})


// // La création et la récupération d’une annonce.
describe("POST /annonce", () => {
    it("creation d'une annonces", async () => {
        const res = await request(app)
            .post("/annonce")
            .set('Authorization', `Bearer ${token}`)
            .send({
                picture: "test.jpg",
                titre: "Annonces 3",
                description: "Description de l'annonces 3",
                adresse: "4 Allée de la reunion",
                prix: 4,
                date_dispos: "18/12/2024",
            })

        //console.log(res.body); 
        adsId = res.body.newAnnonce.annonce_id;
        console.log('adsId :', adsId);


        expect(res.statusCode).toBe(201);
        expect(res.body.newAnnonce.titre).toBe("Annonces 3");
    })
})


describe("GET /annonce/:id", () => {
    it("recuperer une annonce", async () => {
        const res = await request(app)
            .get(`/annonce/${adsId}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.titre).toBe("Annonces 3")
    })
})


// // Le comportement des routes protégées par JWT.
describe("POST /annonce", () => {
    it("accées refusé par un token", async () => {
        const res = await request(app)
            .post("/annonce")
            .send({
                picture: "test.jpg",
                titre: "Annonces sans token",
                description: "Description",
                adresse: "4 sans token",
                prix: 8,
                date_dispos: "18/12/2024"
            })
            .set('Authorization', 'Bearer invalid-token');
            expect(res.statusCode).toBe(401); 
            expect(res.body.message).toBe('Token invalide');
    })
})


describe("POST /annonce", () => {
    it("accées accepter avec le token", async () => {
        const res = await request(app)
            .post("/annonce")
            .set('Authorization', `Bearer ${token}`)
            .send({
                picture: "test.jpg",
                titre: "Annonces avec token",
                description: "Description token",
                adresse: "4 Allée du token",
                prix: 4,
                date_dispos: "18/12/2024",
            })
            //console.log(res.body);
            
        expect(res.statusCode).toBe(201);
        expect(res.body.newAnnonce.titre).toBe("Annonces avec token");
    })
})


// // L’expiration et la validité des tokens JWT.
describe("POST /annonce avec token expiré", () => {
    it("token est expiré", async () => {
        const expiredToken = jwt.sign({ user_id: userid }, process.env.JWT_SECRET, { expiresIn: '-1s' });
        
        const res = await request(app)
        .post("/annonce")
        .set('Authorization', `Bearer ${expiredToken}`)
        .send({
            picture: "test.jpg",
            titre: "Annonces avec token expiré",
            description: "Description token expiré",
            adresse: "4 Allée du token expiré",
            prix: 4,
            date_dispos: "18/12/2024",
        })
        expect(res.statusCode).toBe(401); 
        expect(res.body.message).toBe('Token invalide');
    })
})


// // La validation des entrées utilisateur.
describe("POST /auth/register", () => {
    it("voir si email est déjà utilisé", async () => {
        const res = await request(app)
        .post("/auth/register")
        .send({
            nom: "Marc",
            email: "no@gmail.com",
            password: "testtest",
            telephone: "0123456789",
            id_role: 1
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Cette email existe déja !")
    })


    it("voir si mdp trop court", async () => {
        const res = await request(app)
        .post("/auth/register")
        .send({
            nom: "Marc",
            email: `${Date.now()}@gmail.com`,
            password: "te",
            telephone: "0123456789",
            id_role: 1
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Le mot de passe doit contenir au moins 6 caractères.")
    })

    it("voir si les certains champs sont vide", async () => {
        const uniqueEmail = `${Date.now()}@gmail.com`
        const res = await request(app)
            .post("/auth/register")
            .send({
                nom: "",
                email: uniqueEmail,
                password: "test",
                telephone: "",
                id_role: 1
            })
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Tous les champs sont requis");
    })
})


// // Le chiffrement des mots de passe et la connexion sécurisée.
describe("POST /auth/login", () => {
    it("se connecter avec mot de passe", async () => {
        const hashedPassword = await bcrypt.hash('zer', 10);
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: "1734432411216@gmail.com",
            password: "testert"
        })
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Connexion réussie")
    })

    it("se connecter avec un mauvais mot de passe", async () => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: "no@gmail.com",
            password: "nelly"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe("Mot de passe incorrect")
    })
})