import { Response, Request } from "express";
import { MoviesLoggedService } from "../service/MoviesLoggedService";

export class LoggedMoviesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const moviesLoggedService = new MoviesLoggedService();

    const movies = await moviesLoggedService.execute(id);

    return res.json(movies);
  }
}
