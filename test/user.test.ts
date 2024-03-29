import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

describe ("Testing User API", function () :void {
    afterEach (async () => {
        await UserTest.delete();
    });

    it ("Should be failed registation", async () => {
        const response = await supertest(web)
        .post("/api/users")
        .send({
            name: "",
            username: "",
            password: ""
        });

        console.log(response.body.errors)
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it ("Should be success registation", async () => {
        const response =  await supertest(web)
        .post("/api/users")
        .send({
            name: "rei",
            username: "rei",
            password: "rei"
        });

        logger.debug(response.body);
        console.log(response.body, response.status)
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("rei");
        expect(response.body.data.username).toBe("rei");
    })
})

