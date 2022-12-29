const request = require("supertest")("localhost:5000");
const expect = require("chai").expect;

describe("/POST spelling check with single correction", () => {
    it('Return response for single word correction', async () => {

        const res =
        {
            "words": 5,
            "issues": [
                {
                    "type": "spelling",
                    "match": {
                        "surface": "Lowrd",
                        "beginOffset": 4,
                        "endOffset": 8,
                        "replacement": [
                            "lowed",
                            "Lord",
                            "lord",
                            "lows",
                            "loxed"
                        ]
                    }
                }
            ]
        }

        const response = await request
            .post("/spell-check")
            .send({ paragraph: "The Lowrd of the Rings" })
        expect(response.status).to.eql(200);
        expect(response.body.words).to.eql(res.words);
        expect(response.body.issues[0].match.surface).to.eql(res.issues[0].match.surface);
        expect(response.body.issues[0].match.beginOffset).to.eql(res.issues[0].match.beginOffset);
        expect(response.body.issues[0].match.endOffset).to.eql(res.issues[0].match.endOffset);
        expect(response.body.issues[0].match.replacement[0]).to.eql(res.issues[0].match.replacement[0]);
        expect(response.body.issues[0].match.replacement[1]).to.eql(res.issues[0].match.replacement[1]);
        expect(response.body.issues[0].match.replacement[2]).to.eql(res.issues[0].match.replacement[2]);
        expect(response.body.issues[0].match.replacement[3]).to.eql(res.issues[0].match.replacement[3]);
        expect(response.body.issues[0].match.replacement[4]).to.eql(res.issues[0].match.replacement[4]);

    });
});

describe("/POST spelling check with multiple corrections", () => {
    it('Return response for multiple word corrections', async () => {

        const res = {
            "id": "221ad623-6e57-4c35-a0e3-790c248f5dee",
            "words": 11,
            "time": "2022-12-29T20:33:33.940Z",
            "issues": [
                {
                    "type": "spelling",
                    "match": {
                        "surface": "Donot",
                        "beginOffset": 3,
                        "endOffset": 7,
                        "replacement": [
                            "donor",
                            "donut",
                            "don't",
                            "donors",
                            "dons"
                        ]
                    }
                },
                {
                    "type": "spelling",
                    "match": {
                        "surface": "togglee",
                        "beginOffset": 43,
                        "endOffset": 49,
                        "replacement": [
                            "toggled",
                            "toggles",
                            "toggle",
                            "toggle's",
                            "togged"
                        ]
                    }
                }
            ]
        }



        const response = await request
            .post("/spell-check")
            .send({ paragraph: "1. Donot persist the state of the the sync togglee " })
        expect(response.status).to.eql(200);
        expect(response.body.words).to.eql(res.words);

        expect(response.body.issues[0].match.surface).to.eql(res.issues[0].match.surface);
        expect(response.body.issues[0].match.beginOffset).to.eql(res.issues[0].match.beginOffset);
        expect(response.body.issues[0].match.endOffset).to.eql(res.issues[0].match.endOffset);
        expect(response.body.issues[0].match.replacement[0]).to.eql(res.issues[0].match.replacement[0]);
        expect(response.body.issues[0].match.replacement[1]).to.eql(res.issues[0].match.replacement[1]);
        expect(response.body.issues[0].match.replacement[2]).to.eql(res.issues[0].match.replacement[2]);
        expect(response.body.issues[0].match.replacement[3]).to.eql(res.issues[0].match.replacement[3]);
        expect(response.body.issues[0].match.replacement[4]).to.eql(res.issues[0].match.replacement[4]);

        expect(response.body.issues[1].match.surface).to.eql(res.issues[1].match.surface);
        expect(response.body.issues[1].match.beginOffset).to.eql(res.issues[1].match.beginOffset);
        expect(response.body.issues[1].match.endOffset).to.eql(res.issues[1].match.endOffset);
        expect(response.body.issues[1].match.replacement[0]).to.eql(res.issues[1].match.replacement[0]);
        expect(response.body.issues[1].match.replacement[1]).to.eql(res.issues[1].match.replacement[1]);
        expect(response.body.issues[1].match.replacement[2]).to.eql(res.issues[1].match.replacement[2]);
        expect(response.body.issues[1].match.replacement[3]).to.eql(res.issues[1].match.replacement[3]);
        expect(response.body.issues[1].match.replacement[4]).to.eql(res.issues[1].match.replacement[4]);

    });
});

describe("/POST spelling check missing payload", () => {
    it('Return response 422 Missing payload', async () => {

        let res = {
            "words": 5,
            "issues": [
                {
                    "type": "spelling",
                    "match": {
                        "surface": "Lowrd",
                        "beginOffset": 4,
                        "endOffset": 8,
                        "replacement": [
                            "lowed",
                            "Lord",
                            "lord",
                            "lows",
                            "loxed"
                        ]
                    }
                }
            ]
        }

        const response = await request
            .post("/spell-check")
            .send()
        expect(response.status).to.eql(422);

    });
});

describe("/POST spelling check with correct paragraph", () => {
    it('Return response 200 with empty issues', async () => {

        let res = {
            "issues": []
        }

        const response = await request
            .post("/spell-check")
            .send({ paragraph: "Don't  persist the state of the the sync toggle" })
        expect(response.status).to.eql(200);
        expect(response.body.issues).to.eql(res.issues);


    });
});