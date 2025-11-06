import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Décorateur personnalisé pour extraire l'objet 'user'
 * qui a été attaché à la 'request' par le JwtAuthGuard.
 */
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        // Récupère l'objet 'request'
        const request = ctx.switchToHttp().getRequest();
        
        // Retourne la propriété 'user' de la request
        return request.user;
    },
);