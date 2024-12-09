import { Request, Response, Router } from "express";
import axios from "axios";

export class PokemonRouter {
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const  result: any  = await axios.get("https://pokeapi.co/api/v2/pokemon")
                res.status(200).send(result.data.results)
            } catch (err) {
                console.log(err);
                
            }
        })
    }
    
    getRouter(): Router {
        return this.router
    }
}