import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Ability } from '@casl/ability';
import {defineAbilitiesFor, UserRole} from "../roles/roles";


@Injectable()
export class CaslGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

        if (!roles) {
            return true; // No roles specified, allow access by default
        }

        const request = context.switchToHttp().getRequest();
        const userRole: UserRole = request.user?.role || UserRole.GUEST;
        const ability: Ability = defineAbilitiesFor(userRole);

        return roles.some((role) => ability.can('manage', role));
    }
}