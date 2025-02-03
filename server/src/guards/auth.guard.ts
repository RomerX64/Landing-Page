import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly jwtService:JwtService
    ){}
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const  request = context.switchToHttp().getRequest() 

        const token = request.headers['authorization']?.split(' ')[1]??'';
        try {

        if(!token)throw new UnauthorizedException('Bearer token not found')
        const secret = process.env.JWT_SECRET

        const payLoad =  this.jwtService.verify(token, {secret})
        payLoad.iat = new Date(payLoad.iat * 1000) 
        payLoad.exp = new Date(payLoad.exp * 1000) 
        request.user = payLoad
        console.log(request.user)
        return true
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new UnauthorizedException('Invalid token')
        }
    }
}