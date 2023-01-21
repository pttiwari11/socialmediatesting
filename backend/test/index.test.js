import chai from "chai";
import request from "supertest";
import app from '../index.js';
import assert from "assert";
import chaiHttp from "chai-http";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);
/*
describe("checking add", () => {
    it("should add the given value", async () => {
        assert.equal(add(1,2), 3);
    });
});
*/
describe("User Testing", () => {
    
    describe("api working check", () => {
        it("should return api working", () => {
            chai.request(app).get("http://localhost:5000/api");
        });
    });

    it("login check", () => {
        request(app).post('/api/authenticate')
                    .send({email: 'abc@example.com', password: '123'})
                    .then((res) => {
                        const body = res.body;
                        expect(body).to.contain.property('_id');
                        done();
                    });
    })
});

/*
    describe("login user check", () => {
        it("should return token if user exits", async () => {
            const response = await request(app).post("/authenticate").expect(200).expect("Content-Type", /json/);
            const token = response.body;
            expect(token).to.be.an("String");
        });
    });
    */

    /*
            const response = chai
              .request(app)
              .get("/api");
            console.log(response);
            */

            /*
            request(app).get("/api", function (err, response, body) {
              response.statusCode.should.equal(200);
              body.should.include("Api Working");
              
              done();
            });

            */